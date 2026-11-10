export interface Certification {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
}

export const allCertifications: Certification[] = [
    // Verdes - Acreditadas por SCC y/o UAF
    { id: 1, name: 'ISO 9001', slug: 'iso-9001', description: 'Sistema de Gestión de Calidad', image: 'ISO 9001.webp' },
    { id: 2, name: 'ISO 14001', slug: 'iso-14001', description: 'Sistema de Gestión Ambiental', image: 'ISO-140001.webp' },
    { id: 3, name: 'ISO 45001', slug: 'iso-45001', description: 'Sistema de Gestión de Seguridad y Salud en el Trabajo', image: 'ISO 45001.webp' },
    { id: 4, name: 'ISO 37001', slug: 'iso-37001', description: 'Sistema de Gestión Antisoborno', image: 'ISO 37001.webp' },
    { id: 5, name: 'ISO 27001', slug: 'iso-27001', description: 'Sistema de Gestión de Seguridad de la Información', image: 'ISO 27001.webp' },
    { id: 6, name: 'ISO 27701', slug: 'iso-27701', description: 'Sistema de Gestión de Privacidad', image: 'ISO 27701.webp' },
    { id: 7, name: 'ISO 22301', slug: 'iso-22301', description: 'Sistema de Gestión de Continuidad del Negocio', image: 'ISO 22301.webp' },
    { id: 8, name: 'ISO 22000', slug: 'iso-22000', description: 'Sistema de Gestión de Seguridad Alimentaria', image: 'ISO 22000.webp' },
    { id: 9, name: 'ISO 21001', slug: 'iso-21001', description: 'Sistema de Gestión Educativa', image: 'ISO 21001.webp' },
    { id: 10, name: 'ISO 20000-1', slug: 'iso-20000-1', description: 'Sistema de Gestión de Servicios TI', image: 'ISO 20000-1.webp' },
    { id: 11, name: 'ISO 42001', slug: 'iso-42001', description: 'Sistema de Gestión de Inteligencia Artificial', image: 'ISO 42001.webp' },
    { id: 12, name: 'ISO 55001', slug: 'iso-55001', description: 'Sistema de Gestión de Activos', image: 'ISO-55001.webp' },

    // Moradas - Solo INTERCERT CASA MATRIZ
    { id: 13, name: 'ISO 31001', slug: 'iso-31001', description: 'Sistema de Gestión de Riesgos', image: 'ISO 31001.webp' },
    { id: 14, name: 'ISO 50001', slug: 'iso-50001', description: 'Sistema de Gestión Energética', image: 'ISO 50001.webp' },
    { id: 15, name: 'ISO 39001', slug: 'iso-39001', description: 'Sistema de Gestión de Seguridad Vial', image: 'ISO 39001.webp' },
    { id: 16, name: 'ISO 13485', slug: 'iso-13485', description: 'Sistema de Gestión de Dispositivos Médicos', image: 'ISO 13485.webp' },
    { id: 17, name: 'HACCP', slug: 'haccp', description: 'Análisis de Peligros y Puntos Críticos de Control', image: 'HACCP.webp' },
    { id: 18, name: 'DS 49001', slug: 'ds-49001', description: 'Sistema de Gestión de Responsabilidad Social Empresarial', image: 'DS 49001.webp' },
    { id: 19, name: 'ISO 18788', slug: 'iso-18788', description: 'Sistema de Gestión de Operaciones de Seguridad Privada', image: 'ISO 18788.webp' }
];
