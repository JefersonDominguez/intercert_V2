// Configuración para páginas landing específicas por país y certificación

export interface LandingPageConfig {
    slug: string;
    title: string;
    description: string;
    keywords: string;
    h1: string;
    content?: string;
    schema?: Record<string, any>;
    currency?: string;
}

export interface LandingPagesConfig {
    certificationsByCountry: Record<string, LandingPageConfig[]>;
    consultancyByCountry: Record<string, LandingPageConfig>;
    pricingByCountry: Record<string, LandingPageConfig>;
}

export interface LandingPageRoute {
    path: string;
    countryCode: string;
    type: 'certification' | 'consultancy' | 'pricing';
    config: LandingPageConfig;
}

// Landing pages específicas para mejorar SEO local
export const LANDING_PAGES_CONFIG: LandingPagesConfig = {
    // Páginas por certificación + país
    certificationsByCountry: {
        'pe': [
            {
                slug: 'certificacion-iso-9001-peru',
                title: 'Certificación ISO 9001 en Perú | INTERCERT LATAM - Calidad',
                description: 'Certificación ISO 9001 en Perú con INTERCERT. Organismo acreditado, auditorías en Lima y todo el país. Mejora la calidad de tu empresa.',
                keywords: 'certificacion iso 9001 peru, iso 9001 lima, calidad peru, intercert peru, auditoria iso lima',
                h1: 'Certificación ISO 9001 en Perú - Sistema de Gestión de Calidad',
                content: 'Obtén tu certificación ISO 9001 en Perú con INTERCERT LATAM, organismo acreditado internacionalmente...',
                schema: {
                    '@type': 'Service',
                    name: 'Certificación ISO 9001 Perú',
                    provider: 'INTERCERT LATAM',
                    areaServed: 'Perú'
                }
            },
            {
                slug: 'certificacion-iso-14001-peru',
                title: 'Certificación ISO 14001 en Perú | Gestión Ambiental | INTERCERT',
                description: 'Certificación ISO 14001 en Perú. Sistema de gestión ambiental con INTERCERT. Cumple normativas ambientales peruanas.',
                keywords: 'certificacion iso 14001 peru, gestion ambiental peru, iso ambiental lima, intercert peru',
                h1: 'Certificación ISO 14001 en Perú - Gestión Ambiental',
                content: 'Implementa un sistema de gestión ambiental ISO 14001 en Perú...',
            }
        ],
        'co': [
            {
                slug: 'certificacion-iso-9001-colombia',
                title: 'Certificación ISO 9001 en Colombia | INTERCERT - Calidad',
                description: 'Certificación ISO 9001 en Colombia con INTERCERT. Presencia en Medellín y Bogotá. Organismo acreditado para sistemas de calidad.',
                keywords: 'certificacion iso 9001 colombia, iso 9001 medellin, iso 9001 bogota, intercert colombia',
                h1: 'Certificación ISO 9001 en Colombia - Sistema de Calidad',
                content: 'INTERCERT LATAM ofrece certificación ISO 9001 en Colombia...',
            }
        ],
        'mx': [
            {
                slug: 'certificacion-iso-9001-mexico',
                title: 'Certificación ISO 9001 en México | INTERCERT LATAM - CDMX',
                description: 'Certificación ISO 9001 en México con INTERCERT. Servicios en CDMX y todo el país. Organismo acreditado internacionalmente.',
                keywords: 'certificacion iso 9001 mexico, iso 9001 cdmx, intercert mexico, auditoria iso mexico',
                h1: 'Certificación ISO 9001 en México - Gestión de Calidad',
                content: 'Obtén tu certificación ISO 9001 en México con INTERCERT LATAM...',
            }
        ]
    },

    // Páginas de consultoría por país
    consultancyByCountry: {
        'pe': {
            slug: 'consultoria-iso-peru',
            title: 'Consultoría ISO en Perú | Implementación y Auditoría | INTERCERT',
            description: 'Consultoría especializada en sistemas ISO en Perú. Implementación, auditoría y formación. Equipo experto en Lima y provincias.',
            keywords: 'consultoria iso peru, implementacion iso lima, auditoria iso peru, consultores iso',
            h1: 'Consultoría ISO en Perú - Expertos en Implementación',
            content: 'Servicios integrales de consultoría ISO en Perú...'
        },
        'co': {
            slug: 'consultoria-iso-colombia',
            title: 'Consultoría ISO en Colombia | Medellín y Bogotá | INTERCERT',
            description: 'Consultoría ISO en Colombia. Implementación y auditoría en Medellín, Bogotá y todo el país. Consultores especializados.',
            keywords: 'consultoria iso colombia, consultores iso medellin, auditoria iso bogota, intercert colombia',
            h1: 'Consultoría ISO en Colombia - Implementación Especializada'
        }
    },

    // Páginas de precios por país
    pricingByCountry: {
        'pe': {
            slug: 'precios-certificacion-iso-peru',
            title: 'Precios Certificación ISO en Perú | Cotización | INTERCERT',
            description: 'Precios competitivos para certificación ISO en Perú. Cotización gratuita, planes flexibles. Consulta costos en soles peruanos.',
            keywords: 'precios certificacion iso peru, costo iso 9001 peru, cotizacion iso lima, tarifas intercert',
            h1: 'Precios de Certificación ISO en Perú',
            currency: 'PEN',
            content: 'Conoce nuestros precios transparentes para certificación ISO en Perú...'
        },
        'co': {
            slug: 'precios-certificacion-iso-colombia',
            title: 'Precios Certificación ISO en Colombia | Tarifas | INTERCERT',
            description: 'Precios de certificación ISO en Colombia. Tarifas en pesos colombianos, planes adaptados a tu empresa.',
            keywords: 'precios certificacion iso colombia, costo iso colombia, cotizacion iso medellin',
            h1: 'Precios de Certificación ISO en Colombia',
            currency: 'COP'
        }
    }
};

// Función para generar rutas dinámicas de landing pages
export const generateLandingPageRoutes = (): LandingPageRoute[] => {
    const routes: LandingPageRoute[] = [];

    Object.entries(LANDING_PAGES_CONFIG.certificationsByCountry).forEach(([countryCode, pages]) => {
        pages.forEach(page => {
            routes.push({
                path: `/${countryCode}/${page.slug}`,
                countryCode,
                type: 'certification',
                config: page
            });
        });
    });

    Object.entries(LANDING_PAGES_CONFIG.consultancyByCountry).forEach(([countryCode, page]) => {
        routes.push({
            path: `/${countryCode}/${page.slug}`,
            countryCode,
            type: 'consultancy',
            config: page
        });
    });

    Object.entries(LANDING_PAGES_CONFIG.pricingByCountry).forEach(([countryCode, page]) => {
        routes.push({
            path: `/${countryCode}/${page.slug}`,
            countryCode,
            type: 'pricing',
            config: page
        });
    });

    return routes;
};

export default LANDING_PAGES_CONFIG;
