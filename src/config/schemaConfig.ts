// Configuraciones avanzadas de Schema.org para SEO
import { COUNTRIES } from './countries';

export interface ArticleSchemaData {
    title: string;
    description: string;
    publishDate: string;
    modifyDate?: string;
    image: string;
    url: string;
    keywords?: string[];
}

export interface BreadcrumbItem {
    name: string;
    url: string;
}

// Schema base para la organización
export const getOrganizationSchema = (countryCode: string = 'global'): Record<string, any> => {
    const country = Object.values(COUNTRIES).find((c) => c.code === countryCode) || COUNTRIES.global!;

    const baseSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'INTERCERT LATAM',
        alternateName: 'INTERCERT',
        url: country.fullUrl,
        logo: {
            '@type': 'ImageObject',
            url: 'https://intercertlatam.com/assets/images/Intercert con R Blanco.png',
            width: 200,
            height: 100
        },
        description: 'Organismo de certificación ISO acreditado internacionalmente. Especialistas en sistemas de gestión de calidad, ambiente, seguridad y salud ocupacional.',
        foundingDate: '2007',
        numberOfEmployees: '50-100',
        knowsAbout: [
            'Certificaciones ISO',
            'ISO 9001',
            'ISO 14001',
            'ISO 45001',
            'ISO 27001',
            'Auditorías',
            'Consultoría empresarial',
            'Sistemas de gestión'
        ],
        sameAs: [
            'https://www.facebook.com/IntercertLatam/',
            'https://www.linkedin.com/company/intercertlatam',
            'https://www.twitter.com/intercertlatam',
            'https://www.youtube.com/channel/UCIntercertLatam'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: country.phone,
            email: country.email,
            contactType: 'customer service',
            areaServed: countryCode === 'global' ? ['PE', 'CO', 'MX', 'EC', 'ES', 'PA', 'CR'] : [country.code.toUpperCase()],
            availableLanguage: 'Spanish'
        }
    };

    // Si es un país específico, agregar LocalBusiness
    if (countryCode !== 'global') {
        return {
            ...baseSchema,
            '@type': ['Organization', 'LocalBusiness'],
            address: {
                '@type': 'PostalAddress',
                streetAddress: country.address,
                addressCountry: country.code.toUpperCase(),
                addressRegion: country.name
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 0, // TODO: Add latitude to country config if needed
                longitude: 0 // TODO: Add longitude to country config if needed
            },
            areaServed: {
                '@type': 'Country',
                name: country.name
            },
            priceRange: '$$'
        };
    }

    return baseSchema;
};

// Schema para servicios de certificación
export const getCertificationServiceSchema = (isoType: string, countryCode: string = 'global'): Record<string, any> => {
    const country = Object.values(COUNTRIES).find((c) => c.code === countryCode) || COUNTRIES.global!;

    const serviceDetails: Record<string, { name: string; description: string; serviceType: string }> = {
        'ISO 9001': {
            name: 'Certificación ISO 9001 - Sistema de Gestión de Calidad',
            description: 'Certificación de sistemas de gestión de calidad ISO 9001. Auditoría y emisión de certificado acreditado.',
            serviceType: 'Quality Management System Certification'
        },
        'ISO 14001': {
            name: 'Certificación ISO 14001 - Sistema de Gestión Ambiental',
            description: 'Certificación de sistemas de gestión ambiental ISO 14001. Cumplimiento de normativas ambientales.',
            serviceType: 'Environmental Management System Certification'
        },
        'ISO 45001': {
            name: 'Certificación ISO 45001 - Sistema de Seguridad y Salud Ocupacional',
            description: 'Certificación de sistemas de gestión de seguridad y salud en el trabajo ISO 45001.',
            serviceType: 'Occupational Health and Safety Management System Certification'
        }
    };

    const service = serviceDetails[isoType] || serviceDetails['ISO 9001']!;

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name + (countryCode !== 'global' ? ` en ${country.name}` : ''),
        description: service.description,
        serviceType: service.serviceType,
        provider: {
            '@type': 'Organization',
            name: 'INTERCERT LATAM',
            url: country.fullUrl
        },
        areaServed: {
            '@type': 'Country',
            name: countryCode === 'global' ? 'Latinoamérica' : country.name
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Servicios de Certificación ISO',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Auditoría de Certificación'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Consultoría de Implementación'
                    }
                }
            ]
        },
        potentialAction: {
            '@type': 'ConsumeAction',
            target: `${country.fullUrl}/contact`,
            name: 'Solicitar Cotización'
        }
    };
};

// Schema para FAQ
export const getFAQSchema = (countryCode: string = 'global'): Record<string, any> => {



    const globalFAQs = [
        {
            question: '¿Cuánto demora certificar ISO 9001?',
            answer: 'El proceso de certificación ISO 9001 demora entre 2 a 4 meses, dependiendo del tamaño de la empresa y la madurez del sistema de gestión existente.'
        },
        {
            question: '¿INTERCERT es un organismo acreditado?',
            answer: 'Sí, INTERCERT LATAM es un organismo de certificación acreditado internacionalmente. Todos nuestros certificados tienen validez global.'
        },
        {
            question: '¿Qué certificaciones ISO ofrecen?',
            answer: 'Ofrecemos certificación en ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 22000, ISO 50001 y otras normas internacionales.'
        }
    ];

    const countrySpecificFAQs: Record<string, { question: string; answer: string }[]> = {
        pe: [
            {
                question: '¿Tienen oficinas en Perú?',
                answer: 'Sí, tenemos oficinas en Lima, Perú. Atendemos todo el territorio peruano con auditores locales certificados.'
            },
            {
                question: '¿Los certificados son válidos para exportación desde Perú?',
                answer: 'Sí, nuestros certificados ISO son reconocidos internacionalmente y válidos para exportaciones desde Perú.'
            }
        ],
        co: [
            {
                question: '¿Tienen presencia en Colombia?',
                answer: 'Sí, tenemos oficinas en Medellín y atendemos todo Colombia con auditores colombianos certificados.'
            }
        ],
        mx: [
            {
                question: '¿Atienden empresas en México?',
                answer: 'Sí, atendemos todo México desde nuestra oficina en Ciudad de México con auditores mexicanos certificados.'
            }
        ]
    };

    const faqs = countryCode === 'global'
        ? globalFAQs
        : [...globalFAQs, ...(countrySpecificFAQs[countryCode] || [])];

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
};

// Schema para breadcrumbs
export const getBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]): Record<string, any> => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url
        }))
    };
};

// Schema para artículos del blog
export const getArticleSchema = (article: ArticleSchemaData, countryCode: string = 'global'): Record<string, any> => {
    const country = Object.values(COUNTRIES).find((c) => c.code === countryCode) || COUNTRIES.global!;

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        author: {
            '@type': 'Organization',
            name: 'INTERCERT LATAM',
            url: country.fullUrl
        },
        publisher: {
            '@type': 'Organization',
            name: 'INTERCERT LATAM',
            logo: {
                '@type': 'ImageObject',
                url: 'https://intercertlatam.com/assets/images/Intercert con R Blanco.png'
            }
        },
        datePublished: article.publishDate,
        dateModified: article.modifyDate || article.publishDate,
        image: article.image,
        url: article.url,
        mainEntityOfPage: article.url,
        articleSection: 'Certificaciones ISO',
        keywords: article.keywords || [],
        inLanguage: 'es'
    };
};

export default {
    getOrganizationSchema,
    getCertificationServiceSchema,
    getFAQSchema,
    getBreadcrumbSchema,
    getArticleSchema
};
