export interface FaqItem {
  question: string;
  /** Answer as HTML (trusted, authored here) */
  answer: string;
}

export interface FaqGroup {
  title: string;
  icon: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "Bêta et TestFlight",
    icon: "lucide:flask-conical",
    items: [
      {
        question: "Comment obtenir l’accès à la bêta ?",
        answer:
          'Remplissez le <a href="/beta">formulaire de demande d’accès</a> avec l’adresse email de votre identifiant Apple. Chaque demande est validée à la main, puis vous recevez l’invitation TestFlight par email.',
      },
      {
        question: "Quelle est la version minimale de macOS ?",
        answer:
          "La version actuelle nécessite <strong>macOS 14.6 ou une version ultérieure</strong>.",
      },
      {
        question: "Comment installer la version de test avec TestFlight ?",
        answer:
          "Installez TestFlight depuis le Mac App Store, ouvrez le lien d’invitation reçu par email, puis acceptez de rejoindre le test. La disponibilité dépend du nombre de places ouvertes et de la période de validité du build. TestFlight vous prévient quand une nouvelle version est disponible.",
      },
      {
        question:
          "Pourquoi une version TestFlight peut-elle ne plus se lancer ou ne plus être disponible ?",
        answer:
          "Les builds TestFlight sont temporaires. Une version expirée doit être remplacée par un build plus récent, fourni par l’équipe de test. Une invitation peut aussi être fermée à la fin d’une campagne de test.",
      },
      {
        question: "Les données de test sont-elles séparées des données de production ?",
        answer:
          "Oui. Les builds lancés depuis Xcode utilisent l’environnement CloudKit Development, alors qu’une distribution TestFlight ou notarisée utilise normalement Production. Ces deux bases sont indépendantes.",
      },
    ],
  },
  {
    title: "Connexion à LinkedIn",
    icon: "lucide:link",
    items: [
      {
        question: "L’application utilise-t-elle les API officielles ?",
        answer:
          "Oui. L’authentification repose sur les points d’accès OAuth officiels de LinkedIn et les publications sont envoyées directement à l’API LinkedIn. L’application utilise aussi les frameworks Apple officiels (SwiftUI, SwiftData, CloudKit, Keychain, URLSession, ServiceManagement). Aucun automatisme de navigateur ni extraction de page LinkedIn n’est utilisé.",
      },
      {
        question: "Faut-il créer une application LinkedIn Developers ?",
        answer:
          "Oui. Il faut une application sur LinkedIn Developers, dont vous récupérez le Client ID et le Client Secret. Déclarez ensuite l’URI de redirection affichée dans <strong>Réglages &gt; LinkedIn</strong>. LinkedIn doit avoir accordé à cette application les produits et autorisations nécessaires.",
      },
      {
        question: "Où sont stockés le Client ID, le Client Secret et les jetons ?",
        answer:
          "Ces informations sensibles sont conservées dans le Trousseau macOS. Elles ne figurent ni dans les captures d’écran ni dans les données de démonstration.",
      },
    ],
  },
  {
    title: "Rédaction et publication",
    icon: "lucide:pen-line",
    items: [
      {
        question: "Quelle est la longueur maximale d’une publication ?",
        answer:
          "L’éditeur limite le texte à <strong>3 000 caractères</strong> et affiche un compteur pendant la rédaction.",
      },
      {
        question: "Peut-on publier une image ou un document ?",
        answer:
          "Oui. Une publication peut contenir du texte seul, une image, ou un document PDF. Un seul média est associé à chaque publication.",
      },
      {
        question: "Le titre interne et les tags apparaissent-ils sur LinkedIn ?",
        answer:
          "Non. Le titre et les tags servent uniquement au classement dans LinkedinPostManager. Seuls le texte et le média sélectionné sont envoyés à LinkedIn.",
      },
      {
        question: "Que se passe-t-il si la publication échoue ?",
        answer:
          "La publication passe à l’état <strong>Échec</strong> et le message renvoyé par LinkedIn s’affiche dans l’application. Vous pouvez ensuite la corriger, la reprogrammer ou la publier manuellement.",
      },
    ],
  },
  {
    title: "Automatisation et synchronisation",
    icon: "lucide:cloud",
    items: [
      {
        question: "Le Mac doit-il rester allumé pour publier automatiquement ?",
        answer:
          "Oui. Le mode serveur fonctionne dans l’application macOS : le Mac doit rester allumé et connecté au réseau, avec l’application ouverte, une session LinkedIn valide et un stockage synchronisé actif.",
      },
      {
        question: "La synchronisation iCloud est-elle obligatoire ?",
        answer:
          "Elle est recommandée pour retrouver vos publications sur plusieurs Mac, et nécessaire au bon fonctionnement du mode serveur. Si CloudKit ne peut pas être chargé, l’application utilise un stockage local de secours isolé et l’indique dans les réglages Cloud.",
      },
    ],
  },
];
