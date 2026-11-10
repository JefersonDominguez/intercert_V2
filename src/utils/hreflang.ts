import { COUNTRIES } from '../config/countries';

export interface HreflangLink {
    hrefLang: string;
    href: string;
}

export const buildHreflangLinks = (path: string = '/home'): HreflangLink[] => {
    return Object.values(COUNTRIES).map((country) => ({
        hrefLang: country.code === 'global' ? 'es' : `es-${country.code.toUpperCase()}`,
        href:
            country.code === 'global'
                ? `https://intercertlatam.com${path}`
                : `https://intercertlatam.com/${country.code}${path === '/home' ? '/home' : path}`,
    }));
};
