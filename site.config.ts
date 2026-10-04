export interface NavItem {
  /** Navigation item display label */
  name: string;
  /** Navigation target path or URL */
  href: string;
  /** Icon identifier */
  icon?: string;
}

export interface AuthorLink {
  /** Link display label */
  name: string;
  /** Link target URL */
  href: string;
  /** Icon identifier */
  icon?: string;
}

export interface SiteConfig {
  /** Site language (e.g. 'en', 'zh-CN') */
  lang: string;
  /** Site title */
  title: string;
  /** Site description */
  description: string;
  /** Author name */
  author: string;
  /** Author URL */
  authorUrl: string;
  /** Author biography */
  authorBio: string;
  /** Author location */
  authorLocation: string;
  /** Author avatar image URL */
  avatar: string;
  /** Optional array of author links */
  authorLinks?: AuthorLink[];
  /** Base URL of the site */
  url: string;
  /** Contact email shown on the site */
  email: string;
  /** Publisher of the product */
  publisher: { name: string; url: string };
  /** Number of posts to show on each blog archive page */
  postsPerPage: number;
  /** Header navigation items */
  nav: NavItem[];
  /** Giscus comment system configuration */
  giscus: {
    /** Enable or disable Giscus comments */
    enabled: boolean;
    /** Target GitHub repository in 'owner/repo' format */
    repo: string;
    /** Repository GraphQL Node ID */
    repoId: string;
    /** Discussion category name */
    category: string;
    /** Discussion category GraphQL Node ID */
    categoryId: string;
    /** Theme for light mode */
    theme: string;
    /** Theme for dark mode */
    darkTheme: string;
    /** UI language */
    lang: string;
  };
}

export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

export default defineConfig({
  lang: "fr",
  title: "LinkedinPostManager",
  description:
    "L’application macOS pour préparer, programmer et publier vos contenus LinkedIn. Bêta ouverte sur TestFlight.",
  author: "Hubo Soft",
  authorUrl: "https://www.hubosoft.fr",
  authorBio:
    "Hubo Soft accompagne les indépendants et les PME sur l’IA, l’organisation et la visibilité.",
  authorLocation: "La Chapelle-sur-Erdre, France",
  avatar: "/favicon.svg",
  authorLinks: [
    {
      name: "hubosoft.fr",
      href: "https://www.hubosoft.fr",
      icon: "lucide:globe",
    },
  ],
  email: "bonjour@hubosoft.fr",
  publisher: { name: "Hubo Soft", url: "https://www.hubosoft.fr" },
  url: "https://linkedinpostmanager.hubosoft.fr",
  postsPerPage: 6,
  nav: [
    { name: "Accueil", href: "/", icon: "lucide:home" },
    { name: "Fonctionnalités", href: "/fonctionnalites", icon: "lucide:layout-grid" },
    { name: "FAQ", href: "/faq", icon: "lucide:circle-help" },
    { name: "Versions", href: "/journal", icon: "lucide:calendar-days" },
    { name: "Bêta", href: "/beta", icon: "lucide:rocket" },
  ],
  giscus: {
    enabled: false,
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
    theme: "light",
    darkTheme: "dark",
    lang: "fr",
  },
});
