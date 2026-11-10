import { COUNTRIES } from './countries';

const BASE = {
    title: 'INTERCERT LATAM',
    description:
        'Certificaciones ISO acreditadas en Latinoamérica. Expertos en ISO 9001, ISO 14001, ISO 45001 y más.',
    ogImage: '/assets/images/og-default.jpg',
    baseUrl: 'https://intercertlatam.com',
};

interface CountryKeywords {
    primary: string[];
    secondary: string[];
    location: string[];
}

// Keywords específicas por país para SEO
const COUNTRY_KEYWORDS: Record<string, CountryKeywords> = {
    pe: {
        primary: ['certificacion iso peru', 'intercert peru', 'iso 9001 peru', 'auditoria iso lima'],
        secondary: ['certificado iso peru', 'consultoria iso lima', 'sistema gestion calidad peru'],
        location: ['lima', 'peru', 'peruano', 'peruanas']
    },
    co: {
        primary: ['certificacion iso colombia', 'intercert colombia', 'iso 9001 colombia', 'auditoria iso medellin'],
        secondary: ['certificado iso colombia', 'consultoria iso bogota', 'sistema gestion calidad colombia'],
        location: ['medellin', 'bogota', 'colombia', 'colombiano', 'colombianas']
    },
    mx: {
        primary: ['certificacion iso mexico', 'intercert mexico', 'iso 9001 mexico', 'auditoria iso cdmx'],
        secondary: ['certificado iso mexico', 'consultoria iso ciudad mexico', 'sistema gestion calidad mexico'],
        location: ['mexico', 'cdmx', 'mexicano', 'mexicanas', 'ciudad de mexico']
    },
    ec: {
        primary: ['certificacion iso ecuador', 'intercert ecuador', 'iso 9001 ecuador', 'auditoria iso quito'],
        secondary: ['certificado iso ecuador', 'consultoria iso ecuador', 'sistema gestion calidad ecuador'],
        location: ['quito', 'ecuador', 'ecuatoriano', 'ecuatorianas']
    },
    es: {
        primary: ['certificacion iso españa', 'intercert españa', 'iso 9001 españa', 'auditoria iso madrid'],
        secondary: ['certificado iso españa', 'consultoria iso madrid', 'sistema gestion calidad españa'],
        location: ['madrid', 'españa', 'español', 'españolas']
    },
    pa: {
        primary: ['certificacion iso panama', 'intercert panama', 'iso 9001 panama', 'auditoria iso panama'],
        secondary: ['certificado iso panama', 'consultoria iso panama', 'sistema gestion calidad panama'],
        location: ['panama', 'panameño', 'panameñas']
    },
    cr: {
        primary: ['certificacion iso costa rica', 'intercert costa rica', 'iso 9001 costa rica'],
        secondary: ['certificado iso costa rica', 'consultoria iso san jose', 'sistema gestion calidad costa rica'],
        location: ['costa rica', 'san jose', 'costarricense']
    }
};

const countrySuffix = (countryCode: string): string => {
    if (!countryCode || countryCode === 'global') return '';
    const country = Object.values(COUNTRIES).find((c) => c.code === countryCode);
    return country ? ` en ${country.name}` : '';
};

const getCountryKeywords = (countryCode: string): CountryKeywords => {
    return COUNTRY_KEYWORDS[countryCode] || { primary: [], secondary: [], location: [] };
};

export interface SeoMeta {
    title: string;
    description: string;
    keywords: string;
}

const buildTitles = (countryCode: string) => {
    const keywords = getCountryKeywords(countryCode);
    const country = Object.values(COUNTRIES).find((c) => c.code === countryCode);
    const countryName = country ? country.name : '';

    return {
        home: {
            title: countryCode === 'global'
                ? 'INTERCERT LATAM | Certificaciones ISO Acreditadas en Latinoamérica'
                : `Certificación ISO ${countryName} | INTERCERT LATAM - Organismo Acreditado`,
            description: countryCode === 'global'
                ? 'Certificaciones ISO acreditadas en toda Latinoamérica. ISO 9001, 14001, 45001, 27001. Consultoría, auditoría y formación empresarial.'
                : `Certificación ISO en ${countryName} con INTERCERT LATAM. Organismo acreditado para ISO 9001, 14001, 45001. Auditorías y consultoría especializada en ${countryName}.`,
            keywords: countryCode === 'global'
                ? 'certificacion iso, intercert latam, iso 9001, iso 14001, iso 45001, organismo acreditado'
                : keywords.primary.concat(keywords.secondary).join(', ')
        },
        services: {
            title: countryCode === 'global'
                ? 'Servicios de Certificación ISO | INTERCERT LATAM'
                : `Servicios ISO ${countryName} | Certificación y Auditoría | INTERCERT`,
            description: countryCode === 'global'
                ? 'Servicios integrales de certificación ISO: consultoría, auditoría, formación. Líderes en sistemas de gestión de calidad, ambiente y seguridad.'
                : `Servicios de certificación ISO en ${countryName}. Consultoría, auditoría y formación especializada. Organismo acreditado con presencia local.`,
            keywords: countryCode === 'global'
                ? 'servicios iso, consultoria iso, auditoria iso, formacion iso'
                : `servicios iso ${countryName.toLowerCase()}, ${keywords.primary[2]}, consultoria ${keywords.location[0]}`
        },
        contact: {
            title: countryCode === 'global'
                ? 'Contacto | INTERCERT LATAM - Certificaciones ISO'
                : `Contacto ISO ${countryName} | INTERCERT LATAM`,
            description: countryCode === 'global'
                ? 'Contacta con INTERCERT LATAM para una propuesta personalizada de certificación ISO. Asesoría especializada para tu empresa.'
                : `Contacta con INTERCERT en ${countryName}. Cotización gratuita para certificación ISO. Oficinas en ${keywords.location[0]} y asesoría personalizada.`,
            keywords: countryCode === 'global'
                ? 'contacto intercert, cotizacion iso, asesoria iso'
                : `contacto intercert ${countryName.toLowerCase()}, cotizacion iso ${keywords.location[0]}`
        },
        aboutPartners: {
            title: `Programa de Partners${countrySuffix(countryCode)} | INTERCERT LATAM`,
            description: countryCode === 'global'
                ? 'Únete al programa de partners de INTERCERT LATAM. Genera ingresos con certificaciones ISO acreditadas como consultor autorizado.'
                : `Programa de partners INTERCERT en ${countryName}. Oportunidad de negocio para consultores y empresas. Certificaciones ISO acreditadas.`,
            keywords: countryCode === 'global'
                ? 'partners intercert, consultores iso, negocio certificacion'
                : `partners intercert ${countryName.toLowerCase()}, consultores iso ${keywords.location[0]}`
        },
        certificationList: {
            title: countryCode === 'global'
                ? 'Certificaciones ISO Disponibles | INTERCERT LATAM'
                : `Certificaciones ISO ${countryName} | Lista Completa | INTERCERT`,
            description: countryCode === 'global'
                ? 'Lista completa de certificaciones ISO disponibles: 9001, 14001, 45001, 27001, 22000, 50001. Organismo acreditado internacionalmente.'
                : `Certificaciones ISO disponibles en ${countryName}: ISO 9001, 14001, 45001, 27001. Organismo acreditado con presencia local.`,
            keywords: countryCode === 'global'
                ? 'certificaciones iso, iso 9001, iso 14001, iso 45001, iso 27001, iso 22000'
                : `${keywords.primary[0]}, ${keywords.primary[2]}, iso 14001 ${countryName.toLowerCase()}, iso 45001 ${countryName.toLowerCase()}`
        },
        certificationDetail: (isoName: string, isoNumber: string) => ({
            title: countryCode === 'global'
                ? `${isoName} | Certificación ${isoNumber} | INTERCERT LATAM`
                : `${isoName} ${countryName} | Certificación ${isoNumber} | INTERCERT`,
            description: countryCode === 'global'
                ? `Certificación ${isoName} (${isoNumber}) con INTERCERT LATAM. Auditoría, consultoría e implementación con organismo acreditado internacionalmente.`
                : `Certificación ${isoName} en ${countryName}. ${isoNumber} con INTERCERT - organismo acreditado. Auditoría y consultoría especializada en ${keywords.location[0]}.`,
            keywords: countryCode === 'global'
                ? `${isoNumber.toLowerCase()}, certificacion ${isoNumber.toLowerCase()}, ${isoName.toLowerCase()}`
                : `${isoNumber.toLowerCase()} ${countryName.toLowerCase()}, certificacion ${isoNumber.toLowerCase()} ${keywords.location[0]}, ${keywords.primary[2] || keywords.primary[0]}`
        }),
        blog: {
            title: countryCode === 'global'
                ? 'Blog ISO y Certificaciones | INTERCERT LATAM'
                : `Blog ISO ${countryName} | Noticias y Consejos | INTERCERT`,
            description: countryCode === 'global'
                ? 'Blog especializado en certificaciones ISO, sistemas de gestión y buenas prácticas empresariales. Contenido actualizado por expertos.'
                : `Blog especializado en certificaciones ISO para empresas en ${countryName}. Noticias, consejos y casos de éxito locales.`,
            keywords: countryCode === 'global'
                ? 'blog iso, noticias certificacion, sistemas gestion'
                : `blog iso ${countryName.toLowerCase()}, noticias certificacion ${keywords.location[0]}`
        }
    };
};

export const getSeoConfig = (countryCode: string = 'global') => {
    const titles = buildTitles(countryCode);
    return {
        base: BASE,
        ...titles,
        schema: {
            organization: countryCode && countryCode !== 'global'
                ? {
                    '@context': 'https://schema.org',
                    '@type': 'LocalBusiness',
                    name: 'INTERCERT LATAM',
                    areaServed: countrySuffix(countryCode).replace(' en ', ''),
                    url: COUNTRIES[countryCode]?.fullUrl || COUNTRIES.global!.fullUrl,
                    telephone: COUNTRIES[countryCode]?.phone || COUNTRIES.global!.phone,
                    email: COUNTRIES[countryCode]?.email || COUNTRIES.global!.email,
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: COUNTRIES[countryCode]?.address || COUNTRIES.global!.address,
                        addressCountry: COUNTRIES[countryCode]?.code?.toUpperCase() || 'LATAM',
                    },
                }
                : {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'INTERCERT LATAM',
                    url: COUNTRIES.global!.fullUrl,
                    logo: '/assets/images/Intercert con R Blanco.png',
                    sameAs: [
                        'https://www.facebook.com/IntercertLatam/',
                        'https://www.linkedin.com/company/intercertlatam',
                        'https://www.twitter.com/intercertlatam',
                    ],
                },
        },
        faqSchema: {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: '¿Cuánto demora certificar ISO 9001?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Depende del tamaño de la empresa y madurez del sistema. En promedio de 2 a 4 meses, incluyendo auditoría externa.',
                    },
                },
                {
                    '@type': 'Question',
                    name: '¿Trabajan con acreditaciones internacionales?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Sí, somos un organismo acreditado y todos nuestros certificados cumplen con los lineamientos internacionales.',
                    },
                },
            ],
        },
    };
};
