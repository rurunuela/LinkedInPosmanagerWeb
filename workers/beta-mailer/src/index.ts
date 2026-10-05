import { EmailMessage } from 'cloudflare:email';

interface Env {
  BETA_EMAIL: {
    send(message: EmailMessage): Promise<void>;
  };
  BETA_RECIPIENT: string;
  BETA_SENDER: string;
  TURNSTILE_SECRET_KEY: string;
  ALLOWED_ORIGINS?: string;
}

interface BetaRequestPayload {
  name: string;
  email: string;
  message: string;
  consent: string;
  honeypot: string;
  turnstileToken: string;
}

const DEFAULT_ALLOWED_ORIGINS = [
  'https://linkedinpostmanager.hubosoft.fr',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
];

function json(data: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

function buildCorsHeaders(origin: string | null, env: Env): HeadersInit {
  const allowedOrigins = env.ALLOWED_ORIGINS
    ? env.ALLOWED_ORIGINS.split(',').map((item) => item.trim()).filter(Boolean)
    : DEFAULT_ALLOWED_ORIGINS;

  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function getField(formData: FormData, key: string): string {
  return formData.get(key)?.toString().trim() || '';
}

// Prevents header injection through values placed in email headers.
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ');
}

function validatePayload(payload: BetaRequestPayload): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  if (payload.name.length < 2 || payload.name.length > 100) {
    errors.name = ['Le nom doit contenir entre 2 et 100 caractères'];
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 200) {
    errors.email = ['Veuillez saisir une adresse email valide'];
  }

  if (payload.message.length > 3500) {
    errors.message = ['Le message est trop long (3 000 caractères maximum)'];
  }

  if (payload.consent !== 'yes') {
    errors.consent = ['Merci d’accepter le traitement de vos données pour recevoir l’invitation'];
  }

  if (payload.honeypot.length > 0) {
    errors.honeypot = ['Spam détecté'];
  }

  if (!payload.turnstileToken) {
    errors.turnstile = ['Veuillez valider la protection anti-spam'];
  }

  return errors;
}

async function verifyTurnstile(token: string, request: Request, env: Env): Promise<boolean> {
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });

  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) {
    body.set('remoteip', ip);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json<{ success?: boolean }>();
  return data.success === true;
}

function buildRawEmail(payload: BetaRequestPayload, env: Env): string {
  const subject = `Demande beta TestFlight - ${sanitizeHeaderValue(payload.name)}`;
  const body = [
    'Nouvelle demande d’accès à la bêta LinkedinPostManager',
    '',
    `Nom : ${payload.name}`,
    `Email Apple ID : ${payload.email}`,
    `Consentement RGPD : oui (${new Date().toISOString()})`,
    '',
    'Message :',
    payload.message || '(aucun message)',
    '',
    '---',
    'Ajouter le testeur dans App Store Connect > TestFlight, ou répondre avec le lien public.',
  ].join('\r\n');

  return [
    `From: LinkedinPostManager <${env.BETA_SENDER}>`,
    `To: ${env.BETA_RECIPIENT}`,
    `Reply-To: ${sanitizeHeaderValue(payload.email)}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    body,
  ].join('\r\n');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const corsHeaders = buildCorsHeaders(origin, env);

    try {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: corsHeaders,
        });
      }

      if (request.method !== 'POST') {
        return json({ success: false, errors: { form: ['Méthode non autorisée'] } }, 405, corsHeaders);
      }

      if (!env.BETA_RECIPIENT || !env.BETA_SENDER || !env.TURNSTILE_SECRET_KEY) {
        return json(
          {
            success: false,
            errors: { form: ['Configuration serveur incomplète'] },
          },
          500,
          corsHeaders
        );
      }

      const contentType = request.headers.get('Content-Type') || '';
      if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
        return json({ success: false, errors: { form: ['Format de requête non supporté'] } }, 400, corsHeaders);
      }

      const formData = await request.formData();
      const payload: BetaRequestPayload = {
        name: getField(formData, 'name'),
        email: getField(formData, 'email'),
        message: getField(formData, 'message'),
        consent: getField(formData, 'consent'),
        honeypot: getField(formData, 'honeypot'),
        turnstileToken: getField(formData, 'cf-turnstile-response'),
      };

      const fieldErrors = validatePayload(payload);
      if (Object.keys(fieldErrors).length > 0) {
        if (payload.honeypot) {
          return json({ success: true }, 200, corsHeaders);
        }
        return json({ success: false, errors: fieldErrors }, 400, corsHeaders);
      }

      const turnstileOk = await verifyTurnstile(payload.turnstileToken, request, env);
      if (!turnstileOk) {
        return json(
          { success: false, errors: { turnstile: ['La vérification anti-spam a échoué'] } },
          400,
          corsHeaders
        );
      }

      const message = new EmailMessage(env.BETA_SENDER, env.BETA_RECIPIENT, buildRawEmail(payload, env));

      await env.BETA_EMAIL.send(message);

      return json({ success: true }, 200, corsHeaders);
    } catch (error) {
      console.error('Beta mailer error', error);

      return json(
        {
          success: false,
          errors: { form: ['Erreur serveur, merci de réessayer plus tard'] },
        },
        500,
        corsHeaders
      );
    }
  },
};
