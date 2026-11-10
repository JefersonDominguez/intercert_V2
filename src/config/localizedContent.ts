/**
 * Localized Content Configuration
 * 
 * Content that varies by country: logos, images, testimonials, success stories
 */

import { COUNTRIES } from './countries';
import type { Testimonial, SuccessStory } from '@/types/config';

// ═══════════════════════════════════════════════════════════
// LOGOS POR PAÍS
// ═══════════════════════════════════════════════════════════

export const LOGOS: Record<string, { main: string; white: string; dark: string; favicon: string }> = {
    global: {
        main: '/assets/images/logo-latam.png',
        white: '/assets/images/logo-white copy.png',
        dark: '/assets/images/logo-dark.png',
        favicon: '/favicon-latam.ico',
    },
    pe: {
        main: '/assets/images/Intercert peru.png',
        white: '/assets/images/Intercert peru.png',
        dark: '/assets/images/Intercert peru.png',
        favicon: '/favicon-latam.ico',
    },
    co: {
        main: '/assets/images/logo-colombia.png',
        white: '/assets/images/logo-colombia.png',
        dark: '/assets/images/logo-colombia.png',
        favicon: '/favicon-latam.ico',
    },
    ec: {
        main: '/assets/images/logos/ecuador/logo-main.png',
        white: '/assets/images/logos/ecuador/logo-white.png',
        dark: '/assets/images/logos/ecuador/logo-dark.png',
        favicon: '/favicon-latam.ico',
    },
    es: {
        main: '/assets/images/logos/espana/logo-main.png',
        white: '/assets/images/logos/espana/logo-white.png',
        dark: '/assets/images/logos/espana/logo-dark.png',
        favicon: '/favicon-latam.ico',
    },
    mx: {
        main: '/assets/images/intercert mex.png',
        white: '/assets/images/intercert mex.png',
        dark: '/assets/images/intercert mex.png',
        favicon: '/favicon-latam.ico',
    },
    pa: {
        main: '/assets/images/logos/panama/logo-main.png',
        white: '/assets/images/logos/panama/logo-white.png',
        dark: '/assets/images/logos/panama/logo-dark.png',
        favicon: '/favicon-latam.ico',
    },
    cr: {
        main: '/assets/images/logos/costarica/logo-main.png',
        white: '/assets/images/logos/costarica/logo-white.png',
        dark: '/assets/images/logos/costarica/logo-dark.png',
        favicon: '/favicon-latam.ico',
    },
};

// ═══════════════════════════════════════════════════════════
// TESTIMONIOS POR PAÍS
// ═══════════════════════════════════════════════════════════

export const TESTIMONIALS: Record<string, Testimonial[]> = {
    global: [
        {
            id: 1,
            name: 'Carlos Rodríguez',
            company: 'TechCorp LATAM',
            position: 'CEO',
            country: 'Multinacional',
            image: '/assets/images/testimonials/global/person-1.jpg',
            content: 'INTERCERT LATAM nos ayudó a certificar todas nuestras operaciones en la región.',
            rating: 5,
            iso: 'ISO 9001',
        },
    ],
    pe: [
        {
            id: 1,
            name: 'María González',
            company: 'Alimentos Peruanos SAC',
            position: 'Gerente General',
            country: 'Perú',
            image: '/assets/images/testimonials/peru/person-1.jpg',
            content: 'Excelente servicio de certificación ISO 22000. Proceso rápido y profesional.',
            rating: 5,
            iso: 'ISO 22000',
        },
        {
            id: 2,
            name: 'Juan Pérez',
            company: 'Constructora Lima Norte',
            position: 'Director de Calidad',
            country: 'Perú',
            image: '/assets/images/testimonials/peru/person-2.jpg',
            content: 'Gracias a INTERCERT logramos la certificación ISO 9001 en tiempo récord.',
            rating: 5,
            iso: 'ISO 9001',
        },
    ],
    co: [
        {
            id: 1,
            name: 'Ana Martínez',
            company: 'Café Premium Colombia',
            position: 'Directora de Operaciones',
            country: 'Colombia',
            image: '/assets/images/testimonials/colombia/person-1.jpg',
            content: 'Certificación ISO 22000 exitosa. Equipo muy profesional.',
            rating: 5,
            iso: 'ISO 22000',
        },
    ],
    ec: [
        {
            id: 1,
            name: 'Roberto Silva',
            company: 'Exportadora Ecuador',
            position: 'Gerente',
            country: 'Ecuador',
            image: '/assets/images/testimonials/ecuador/person-1.jpg',
            content: 'Excelente asesoría para nuestra certificación ISO 14001.',
            rating: 5,
            iso: 'ISO 14001',
        },
    ],
    es: [
        {
            id: 1,
            name: 'Carmen López',
            company: 'Tecnología Barcelona SL',
            position: 'CEO',
            country: 'España',
            image: '/assets/images/testimonials/espana/person-1.jpg',
            content: 'Proceso de certificación ISO 27001 impecable.',
            rating: 5,
            iso: 'ISO 27001',
        },
    ],
    mx: [
        {
            id: 1,
            name: 'Pedro Hernández',
            company: 'Industrias México SA',
            position: 'Director General',
            country: 'México',
            image: '/assets/images/testimonials/mexico/person-1.jpg',
            content: 'Muy satisfechos con la certificación ISO 9001.',
            rating: 5,
            iso: 'ISO 9001',
        },
    ],
    pa: [
        {
            id: 1,
            name: 'Laura Gómez',
            company: 'Logística Panamá',
            position: 'Gerente de Calidad',
            country: 'Panamá',
            image: '/assets/images/testimonials/panama/person-1.jpg',
            content: 'Certificación ISO 28000 lograda con éxito.',
            rating: 5,
            iso: 'ISO 28000',
        },
    ],
    cr: [
        {
            id: 1,
            name: 'Verónica Solís',
            company: 'Servicios Integrales CR',
            position: 'Directora de Calidad',
            country: 'Costa Rica',
            image: '/assets/images/testimonials/costarica/person-1.jpg',
            content: 'ISO 9001 nos permitió homologar procesos en toda la región. Intercert coordinó las auditorías internas con gran detalle.',
            rating: 5,
            iso: 'ISO 9001',
        },
        {
            id: 2,
            name: 'Diego Araya',
            company: 'CloudCentro América',
            position: 'Gerente de Seguridad',
            country: 'Costa Rica',
            image: '/assets/images/testimonials/costarica/person-2.jpg',
            content: 'Implementar ISO 27001 elevó la confianza de nuestros clientes de outsourcing TI. El acompañamiento fue cercano y práctico.',
            rating: 5,
            iso: 'ISO 27001',
        },
    ],
};

// ═══════════════════════════════════════════════════════════
// IMÁGENES HERO/BANNER POR PAÍS
// ═══════════════════════════════════════════════════════════

export const HERO_IMAGES: Record<string, { main: string; about: string; services: string }> = {
    global: {
        main: '/assets/images/hero/latam-hero.jpg',
        about: '/assets/images/hero/latam-about.jpg',
        services: '/assets/images/hero/latam-services.jpg',
    },
    pe: {
        main: '/assets/images/hero/peru/main.jpg',
        about: '/assets/images/hero/peru/about.jpg',
        services: '/assets/images/hero/peru/services.jpg',
    },
    co: {
        main: '/assets/images/hero/colombia/main.jpg',
        about: '/assets/images/hero/colombia/about.jpg',
        services: '/assets/images/hero/colombia/services.jpg',
    },
    ec: {
        main: '/assets/images/hero/ecuador/main.jpg',
        about: '/assets/images/hero/ecuador/about.jpg',
        services: '/assets/images/hero/ecuador/services.jpg',
    },
    es: {
        main: '/assets/images/hero/espana/main.jpg',
        about: '/assets/images/hero/espana/about.jpg',
        services: '/assets/images/hero/espana/services.jpg',
    },
    mx: {
        main: '/assets/images/hero/mexico/main.jpg',
        about: '/assets/images/hero/mexico/about.jpg',
        services: '/assets/images/hero/mexico/services.jpg',
    },
    pa: {
        main: '/assets/images/hero/panama/main.jpg',
        about: '/assets/images/hero/panama/about.jpg',
        services: '/assets/images/hero/panama/services.jpg',
    },
    cr: {
        main: '/assets/images/hero/costarica/main.jpg',
        about: '/assets/images/hero/costarica/about.jpg',
        services: '/assets/images/hero/costarica/services.jpg',
    },
};

// ═══════════════════════════════════════════════════════════
// CASOS DE ÉXITO POR PAÍS
// ═══════════════════════════════════════════════════════════

export const SUCCESS_STORIES: Record<string, SuccessStory[]> = {
    global: [],
    pe: [
        {
            id: 1,
            title: 'Alimentos Peruanos SAC - ISO 22000',
            description: 'Certificación en seguridad alimentaria para empresa exportadora',
            image: '/assets/images/cases/peru/case-1.jpg',
            company: 'Alimentos Peruanos SAC',
            // @ts-ignore
            year: 2024,
        },
    ],
    co: [
        {
            id: 1,
            title: 'Café Premium Colombia - ISO 22000',
            description: 'Certificación que permitió expansión a mercados europeos',
            image: '/assets/images/cases/colombia/case-1.jpg',
            company: 'Café Premium Colombia',
            year: 2024,
        },
    ],
    // ... otros países
};

// ═══════════════════════════════════════════════════════════
// FUNCIONES HELPER
// ═══════════════════════════════════════════════════════════

export const getLogos = (countryCode = 'global') => {
    return LOGOS[countryCode] || LOGOS.global;
};

export const getTestimonials = (countryCode = 'global') => {
    return TESTIMONIALS[countryCode] || TESTIMONIALS.global;
};

export const getHeroImages = (countryCode = 'global') => {
    return HERO_IMAGES[countryCode] || HERO_IMAGES.global;
};

export const getSuccessStories = (countryCode = 'global') => {
    return SUCCESS_STORIES[countryCode] || SUCCESS_STORIES.global;
};

export const getLocalizedContent = (countryCode = 'global'): any => {
    const country = COUNTRIES[countryCode] || COUNTRIES.global;
    return {
        country,
        logos: getLogos(countryCode),
        testimonials: getTestimonials(countryCode),
        heroImages: getHeroImages(countryCode),
        successStories: getSuccessStories(countryCode),
        contact: {
            phone: country?.phone || '',
            email: country?.email || '',
            address: country?.address || '',
            mapUrl: country?.mapUrl || '',
        }
    };
};

export default {
    LOGOS,
    TESTIMONIALS,
    HERO_IMAGES,
    SUCCESS_STORIES,
    getLogos,
    getTestimonials,
    getHeroImages,
    getSuccessStories,
    getLocalizedContent,
};
