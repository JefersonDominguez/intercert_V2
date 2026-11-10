/**
 * Country Configuration
 * 
 * Configuration for supported countries
 */

import type { CountryConfig } from '@/types/config';

export const COUNTRIES: Record<string, CountryConfig> = {
    global: {
        code: 'global',
        name: 'Latam',
        flag: '🌎',
        route: '/',
        domain: 'intercertlatam.com',
        fullUrl: 'https://intercertlatam.com',
        languages: ['es'],
        currency: 'USD',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        address: 'Centro Empresarial PLEXUS Piso 11, San Miguel, Lima',
        timezone: 'America/Lima',
        logo: '/assets/images/Intercert con R Blanco.png',
        mapUrl: 'https://www.google.com/maps?q=Centro+Empresarial+PLEXUS+Piso+11,+San+Miguel,+Lima',
        mapEmbedUrl: 'https://www.google.com/maps?q=Centro+Empresarial+PLEXUS+Piso+11,+San+Miguel,+Lima&output=embed',
    },
    peru: {
        code: 'pe',
        name: 'Perú',
        flag: '🇵🇪',
        route: '/pe',
        domain: 'intercertlatam.com/pe',
        fullUrl: 'https://intercertlatam.com/pe',
        languages: ['es'],
        currency: 'PEN',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        address: 'C. Martin de Murúa 150, Edificio Empresarial PLEXUS, San Miguel 15086',
        contactOffices: [
            {
                title: 'Oficina Lima',
                phone: '(01) 6802393',
                mobilePhone: '+51 986 123 418',
                email: 'info@intercertlatam.com',
                address: 'C. Martin de Murúa 150, Edificio Empresarial PLEXUS, San Miguel 15086',
            },
            {
                title: 'Oficina Cajamarca',
                mobilePhone: '+51 982 432 009',
                email: 'info@intercertlatam.com',
                address: 'José Sabogal 1296, a dos cuadras de la Plaza de Armas, Cajamarca.',
            },
        ],
        timezone: 'America/Lima',
        logo: '/assets/images/Intercert peru.png',
        mapUrl: 'https://www.google.com/maps?q=C.+Martin+de+Mur%C3%BAa+150,+Edificio+Empresarial+PLEXUS,+San+Miguel+15086',
        mapEmbedUrl: 'https://www.google.com/maps?q=C.+Martin+de+Mur%C3%BAa+150,+Edificio+Empresarial+PLEXUS,+San+Miguel+15086&output=embed',
    },
    colombia: {
        code: 'co',
        name: 'Colombia',
        flag: '🇨🇴',
        route: '/co',
        domain: 'intercertlatam.com/co',
        fullUrl: 'https://intercertlatam.com/co',
        languages: ['es'],
        currency: 'COP',
        phone: '+57 320 3521254',
        email: 'info@intercertlatam.com',
        address: 'Av. El Poblado #16a Sur38 Piso 13 y Oficina 1301, El Poblado, Medellín, El Poblado, Medellín, Antioquia, Colombia',
        timezone: 'America/Bogota',
        logo: '/assets/images/intercert COL.png',
        mapUrl: 'https://www.google.com/maps?q=Av.+El+Poblado+%2316a+Sur38+Piso+13+y+Oficina+1301,+El+Poblado,+Medell%C3%ADn,+Antioquia,+Colombia',
        mapEmbedUrl: 'https://www.google.com/maps?q=Av.+El+Poblado+%2316a+Sur38+Piso+13+y+Oficina+1301,+El+Poblado,+Medell%C3%ADn,+Antioquia,+Colombia&output=embed',
    },
    ecuador: {
        code: 'ec',
        name: 'Ecuador',
        flag: '🇪🇨',
        route: '/ec',
        domain: 'intercertlatam.com/ec',
        fullUrl: 'https://intercertlatam.com/ec',
        languages: ['es'],
        currency: 'USD',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        timezone: 'America/Guayaquil',
        logo: '/assets/images/intercert  ECUADOR.png',
        mapUrl: 'https://www.google.com/maps?q=Av.+Rep%C3%BAblica+E7-226,+Quito,+Ecuador',
        mapEmbedUrl: 'https://www.google.com/maps?q=Av.+Rep%C3%BAblica+E7-226,+Quito,+Ecuador&output=embed',
    },
    espana: {
        code: 'es',
        name: 'España',
        flag: '🇪🇸',
        route: '/es',
        domain: 'intercertlatam.com/es',
        fullUrl: 'https://intercertlatam.com/es',
        languages: ['es'],
        currency: 'EUR',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        timezone: 'Europe/Madrid',
        logo: '/assets/images/intercert ESP.png',
        mapUrl: 'https://www.google.com/maps?q=Calle+Gran+V%C3%ADa+32,+Madrid,+Espa%C3%B1a',
        mapEmbedUrl: 'https://www.google.com/maps?q=Calle+Gran+V%C3%ADa+32,+Madrid,+Espa%C3%B1a&output=embed',
    },
    mexico: {
        code: 'mx',
        name: 'México',
        flag: '🇲🇽',
        route: '/mx',
        domain: 'intercertlatam.com/mx',
        fullUrl: 'https://intercertlatam.com/mx',
        languages: ['es'],
        currency: 'MXN',
        phone: '+52 1 55 3504 3437',
        email: 'info@intercertlatam.com',
        address: 'Camino Santa Teresa No. 187, Col. Parques del Pedregal, Tlalpan. CP 14010, Ciudad de México.',
        timezone: 'America/Mexico_City',
        logo: '/assets/images/intercert mex.png',
        mapUrl: 'https://www.google.com/maps?q=Camino+Santa+Teresa+187,+Parques+del+Pedregal,+Tlalpan,+Ciudad+de+M%C3%A9xico',
        mapEmbedUrl: 'https://www.google.com/maps?q=Camino+Santa+Teresa+187,+Parques+del+Pedregal,+Tlalpan,+Ciudad+de+M%C3%A9xico&output=embed',
    },
    panama: {
        code: 'pa',
        name: 'Panamá',
        flag: '🇵🇦',
        route: '/pa',
        domain: 'intercertlatam.com/pa',
        fullUrl: 'https://intercertlatam.com/pa',
        languages: ['es'],
        currency: 'PAB',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        address: 'Calle 50, Ciudad de Panamá, Panamá',
        timezone: 'America/Panama',
        logo: '/assets/images/intercert PANAMA.png',
        mapUrl: 'https://www.google.com/maps?q=Calle+50,+Ciudad+de+Panam%C3%A1,+Panam%C3%A1',
        mapEmbedUrl: 'https://www.google.com/maps?q=Calle+50,+Ciudad+de+Panam%C3%A1,+Panam%C3%A1&output=embed',
    },
    costaRica: {
        code: 'cr',
        name: 'Costa Rica',
        flag: '🇨🇷',
        route: '/cr',
        domain: 'intercertlatam.com/cr',
        fullUrl: 'https://intercertlatam.com/cr',
        languages: ['es'],
        currency: 'CRC',
        phone: '(01) 6802393',
        email: 'info@intercertlatam.com',
        timezone: 'America/Costa_Rica',
        logo: '/assets/images/intercert COSTAR.png',
        mapUrl: 'https://www.google.com/maps?q=Avenida+Escaz%C3%BA,+San+Jos%C3%A9,+Costa+Rica',
        mapEmbedUrl: 'https://www.google.com/maps?q=Avenida+Escaz%C3%BA,+San+Jos%C3%A9,+Costa+Rica&output=embed',
    },
};

// Extended list of all countries for selectors
export const ALL_COUNTRIES = [
    { code: 'pe', name: 'Perú', flag: '🇵🇪' },
    { code: 'co', name: 'Colombia', flag: '🇨🇴' },
    { code: 'mx', name: 'México', flag: '🇲🇽' },
    { code: 'ec', name: 'Ecuador', flag: '🇪🇨' },
    { code: 'pa', name: 'Panamá', flag: '🇵🇦' },
    { code: 'cr', name: 'Costa Rica', flag: '🇨🇷' },
    { code: 'es', name: 'España', flag: '🇪🇸' },
    { code: 'ar', name: 'Argentina', flag: '🇦🇷' },
    { code: 'cl', name: 'Chile', flag: '🇨🇱' },
    { code: 'bo', name: 'Bolivia', flag: '🇧🇴' },
    { code: 'br', name: 'Brasil', flag: '🇧🇷' },
    { code: 'py', name: 'Paraguay', flag: '🇵🇾' },
    { code: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    { code: 've', name: 'Venezuela', flag: '🇻🇪' },
    { code: 'us', name: 'Estados Unidos', flag: '🇺🇸' },
    { code: 'ca', name: 'Canadá', flag: '🇨🇦' },
    { code: 'gt', name: 'Guatemala', flag: '🇬🇹' },
    { code: 'hn', name: 'Honduras', flag: '🇭🇳' },
    { code: 'sv', name: 'El Salvador', flag: '🇸🇻' },
    { code: 'ni', name: 'Nicaragua', flag: '🇳🇮' },
    { code: 'do', name: 'República Dominicana', flag: '🇩🇴' },
    { code: 'pr', name: 'Puerto Rico', flag: '🇵🇷' },
];

// Ordered list of countries for region selection
export const COUNTRIES_LIST: CountryConfig[] = [
    COUNTRIES.global,
    COUNTRIES.peru,
    COUNTRIES.colombia,
    COUNTRIES.ecuador,
    COUNTRIES.mexico,
    COUNTRIES.panama,
    COUNTRIES.costaRica,
    COUNTRIES.espana,
].filter(Boolean) as CountryConfig[];

// Get country by code
export const getCountryByCode = (code: string): CountryConfig => {
    return Object.values(COUNTRIES).find(country => country.code === code) || COUNTRIES.global!;
};

// Get country by route
export const getCountryByRoute = (route: string): CountryConfig => {
    // Normalize route (remove trailing slash)
    const normalizedRoute = route === '/' ? '/' : route.replace(/\/$/, '');
    return Object.values(COUNTRIES).find(country => country.route === normalizedRoute) || COUNTRIES.global!;
};

const VALID_COUNTRY_ROUTE_CODES = Object.values(COUNTRIES)
    .map((c) => c.code)
    .filter((code): code is string => !!code && code !== 'global');

/** Extrae el código de país del pathname (ej. /co/contact → co). */
export const getCountryCodeFromPathname = (pathname: string): string | null => {
    const segment = pathname.split('/').filter(Boolean)[0];
    if (!segment || !VALID_COUNTRY_ROUTE_CODES.includes(segment)) {
        return null;
    }
    return segment;
};

// Get current country from URL
export const getCurrentCountry = (pathname?: string): CountryConfig => {
    const path =
        pathname ??
        (typeof window !== 'undefined' ? window.location.pathname : '/');

    const code = getCountryCodeFromPathname(path);
    if (code) {
        return getCountryByCode(code);
    }
    return COUNTRIES.global!;
};

// Build URL with country prefix
export const buildCountryUrl = (
    path: string,
    countryCode: string | null = null,
    pathname?: string,
): string => {
    const resolvedCode =
        countryCode ?? getCountryCodeFromPathname(pathname ?? '') ?? getCurrentCountry(pathname).code;
    const country = getCountryByCode(resolvedCode);

    // If global, don't add prefix
    if (country.code === 'global') {
        return path;
    }

    // If path already has country prefix, don't duplicate
    const countryPrefix = `/${country.code}`;
    if (path === countryPrefix || path.startsWith(`${countryPrefix}/`)) {
        return path;
    }

    // Add country prefix
    return `/${country.code}${path.startsWith('/') ? path : '/' + path}`;
};

export default COUNTRIES;
