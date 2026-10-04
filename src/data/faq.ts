export interface FaqItem {
  question: string;
  /** Answer as HTML (trusted, authored here) */
  answer: string;
}

export interface FaqGroup {
  /** Anchor id, e.g. "mcp" → /faq#faq-mcp */
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "beta",
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
    id: "mcp",
    title: "Assistant IA et MCP",
    icon: "lucide:bot",
    items: [
      {
        question: "Qu’est-ce que l’intégration MCP ?",
        answer:
          "MCP (Model Context Protocol) est le protocole qui permet à un assistant IA compatible, comme Claude Desktop ou Claude Code, de découvrir et d’appeler les outils fournis par LinkedinPostManager : statistiques, liste et détail des posts, création, modification et archivage. L’assistant reçoit des fonctions structurées plutôt qu’un accès libre au Mac ou à l’interface. Tous les détails sont sur la page <a href=\"/mcp\">Claude et MCP</a>.",
      },
      {
        question: "Est-ce que MCP peut publier immédiatement sur LinkedIn ?",
        answer:
          "Non. Le serveur MCP crée et organise les contenus, mais il ne publie pas directement. Une publication programmée est envoyée par le scheduler de l’application, avec votre session LinkedIn et les règles configurées dans <strong>Réglages &gt; Serveur</strong>.",
      },
      {
        question: "Quels clients peuvent utiliser le serveur MCP ?",
        answer:
          "Tout client qui prend en charge les serveurs MCP locaux en transport stdio peut théoriquement l’utiliser. Le serveur a principalement été conçu pour Claude Desktop et Claude Code.",
      },
      {
        question: "Les modifications réalisées par MCP sont-elles synchronisées ?",
        answer:
          "Oui, lorsque le stockage iCloud Documents est actif. Le serveur MCP lit et écrit les mêmes documents que l’application : les changements apparaissent dans LinkedinPostManager et sur vos autres Mac après la synchronisation iCloud.",
      },
      {
        question: "Un assistant peut-il supprimer mes posts LinkedIn ?",
        answer:
          "Non. La suppression via MCP exige une confirmation explicite (<code>confirm=true</code>) et archive simplement le contenu dans l’application, qui reste récupérable. Elle ne supprime jamais un post déjà publié sur LinkedIn, et un contenu publié ne peut pas être modifié via MCP.",
      },
    ],
  },
  {
    id: "linkedin",
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
    id: "redaction",
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
    id: "automatisation",
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
