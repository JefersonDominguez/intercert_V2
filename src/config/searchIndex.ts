/**
 * Search Index Configuration
 * 
 * Index for global search functionality
 */

export interface SearchIndexItem {
    title: string;
    description: string;
    path: string;
    keywords: string[];
    countries: string[];
}

const ALL_COUNTRIES = ['global', 'pe', 'co', 'ec', 'mx', 'pa', 'cr', 'es'];

export const GLOBAL_SEARCH_INDEX: SearchIndexItem[] = [
    {
        title: 'Inicio',
        description: 'Página principal con resumen de servicios y sectores destacados.',
        path: '/home',
        keywords: ['inicio', 'home', 'principal', 'landing', 'portada'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Sobre Intercert',
        description: 'Conoce nuestra misión, visión y por qué las organizaciones confían en nosotros.',
        path: '/about',
        keywords: ['sobre intercert', 'nosotros', 'empresa', 'metodología', 'misión', 'visión'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Certificaciones ISO',
        description: 'Explora todas las certificaciones ISO disponibles y sus beneficios.',
        path: '/certificacion-iso',
        keywords: ['certificaciones', 'iso', 'iso 9001', 'iso 14001', 'iso 45001', 'certificación', 'normas iso'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Certificación de Personas',
        description: 'Programas de formación y certificación para profesionales.',
        path: '/certificacion-personas',
        keywords: ['personas', 'formación', 'capacitación', 'certificación de personas', 'iso'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Sectores',
        description: 'Descubre nuestras soluciones para cada industria y sector.',
        path: '/services',
        keywords: ['sectores', 'servicios', 'industria', 'consultoría', 'asesoría', 'educativo', 'salud', 'tecnologías'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Verificar certificado',
        description: 'Busca el estado y vigencia de un certificado emitido por Intercert.',
        path: '/verify-certificate',
        keywords: ['verificar', 'certificado', 'buscar iso', 'validar', 'consulta'],
        countries: ALL_COUNTRIES,
    },
    // Vistas por sector (públicas)
    {
        title: 'Sector Educativo',
        description: 'Soluciones de certificación ISO para colegios, universidades e instituciones educativas.',
        path: '/sector/educativo',
        keywords: ['sector', 'educativo', 'colegios', 'universidades', 'iso 21001', 'iso 9001'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Sector Salud',
        description: 'Certificaciones ISO para hospitales, clínicas y laboratorios.',
        path: '/sector/salud',
        keywords: ['sector', 'salud', 'hospitales', 'clínicas', 'iso 9001', 'iso 15189'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Sector Alimentos y Bebidas',
        description: 'Certificaciones para empresas de alimentos, restaurantes y distribución.',
        path: '/sector/alimentos-bebidas',
        keywords: ['sector', 'alimentos', 'bebidas', 'haccp', 'iso 22000', 'bpm'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Sector Tecnologías de la Información',
        description: 'Soluciones ISO para software, servicios de TI y ciberseguridad.',
        path: '/sector/tecnologias-informacion',
        keywords: ['sector', 'tecnologías', 'ti', 'software', 'iso 27001', 'iso 20000'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Certificación ISO 9001',
        description: 'Sistema de gestión de calidad para organizaciones.',
        path: '/certificacion-iso/iso-9001',
        keywords: ['iso 9001', 'calidad', 'sgc', 'systems'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Certificación ISO 14001',
        description: 'Gestión ambiental para empresas sostenibles.',
        path: '/certificacion-iso/iso-14001',
        keywords: ['iso 14001', 'ambiental', 'sga', 'medio ambiente'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Certificación ISO 27001',
        description: 'Seguridad de la información y ciberseguridad.',
        path: '/certificacion-iso/iso-27001',
        keywords: ['iso 27001', 'seguridad de la información', 'sgsi', 'ciberseguridad'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Certificación ISO 45001',
        description: 'Seguridad y salud ocupacional en el trabajo.',
        path: '/certificacion-iso/iso-45001',
        keywords: ['iso 45001', 'seguridad', 'salud ocupacional', 'sst'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Blog',
        description: 'Artículos y novedades sobre certificación y gestión empresarial.',
        path: '/blog',
        keywords: ['blog', 'artículos', 'noticias', 'novedades', 'iso 9001', 'iso 37001', 'auditorías', 'tendencias'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Contacto',
        description: 'Solicita información o agenda una reunión con nuestro equipo.',
        path: '/contact',
        keywords: ['contacto', 'agendar', 'información', 'reunión', 'asesoría'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Términos de Uso',
        description: 'Revisa las condiciones para utilizar las plataformas y servicios digitales de Intercert.',
        path: '/terminos-uso',
        keywords: ['términos', 'condiciones de uso', 'uso del sitio', 'legal'],
        countries: ALL_COUNTRIES,
    },
    {
        title: 'Política de Privacidad',
        description: 'Conoce cómo recopilamos, usamos y protegemos tus datos personales.',
        path: '/politica-privacidad',
        keywords: ['política de privacidad', 'datos personales', 'protección de datos'],
        countries: ALL_COUNTRIES,
    },
];
