export const technoTypes = [
    'language',
    'framework',
    'library',
    'database',
    'development-tool',
    'devops',
    'apis-integration'
] as const;

const technoTypesLabels: Record<TechnoType, Record<string, string>> = {
    language: {
        en: 'Language',
        de: 'Langage'
    },
    framework: {
        en: 'Framework',
        de: 'Framework'
    },
    library: {
        en: 'Library',
        de: 'Bibliothèque'
    },
    database: {
        en: 'Database',
        de: 'Base de données'
    },
    'development-tool': {
        en: 'Development Tool',
        de: 'Outil de développement'
    },
    devops: {
        en: 'DevOps',
        de: 'DevOps'
    },
    'apis-integration': {
        en: 'APIs & Integration',
        de: 'APIs et intégration'
    }
};

export function getTechnoTypeLabel(type: TechnoType) {
    const { locale } = useI18n();
    return technoTypesLabels[type][locale.value];
}

type TechnoType = (typeof technoTypes)[number];

type Techno = {
    title: string;
    icon?: string;
    image?: string;
    type: TechnoType;
    url: string;
};

export const projectTypes = [
    'favorite',
    'game',
    'web',
    'dev-tool',
    'scripting'
] as const;

const projectTypesLabels: Record<ProjectType, Record<string, string>> = {
    favorite: {
        en: 'Favorite',
        de: 'Favoris'
    },
    game: {
        en: 'Game',
        de: 'Jeux-vidéo'
    },
    web: {
        en: 'Web',
        de: 'Web'
    },
    'dev-tool': {
        en: 'Dev Tool',
        de: 'Outil de développement'
    },
    scripting: {
        en: 'Scripting',
        de: 'Script'
    }
};

export function getProjectTypeLabel(type: ProjectType) {
    const { locale } = useI18n();
    return projectTypesLabels[type][locale.value];
}

type ProjectType = (typeof projectTypes)[number];

type Locale = 'en' | 'de';

type Project = {
    name: string;
    description: Record<Locale, string>;
    date: string;
    type: ProjectType[];
    technos: string[];
    link: string;
    repo_link: string;
};

type Hobby = {
    title: Record<Locale, string>;
    icon: string;
    emoji: string;
};

export type { Hobby, Locale, Project, ProjectType, Techno, TechnoType };
