// Configuración de testimonios por país
// Cada país tiene 6 testimonios. Si un país no está configurado, se usa el set global.

export interface TestimonialData {
    name: string;
    quote: string;
    avatar: string;
}

export const TESTIMONIALS_BY_COUNTRY: Record<string, TestimonialData[]> = {
    global: [
        {
            name: 'REFRYMAR PERÚ SAC',
            quote:
                'Nos ayudaron a certificarnos justo antes de una licitación clave. No conocíamos bien el proceso, pero nos explicaron todo paso a paso. Totalmente recomendados.',
            avatar: '/assets/images/testimonial/refrymar logo.png',
        },
        {
            name: 'ADN Almacenes del Norte – Parque Logístico',
            quote:
                'Certificarnos con INTERCERT en ISO 14001 e ISO 45001 fortaleció nuestro compromiso con la seguridad de nuestro equipo y con una gestión ambiental responsable. Un proceso claro y profesional de principio a fin.',
            avatar: '/assets/images/logos/ADN.jpeg',
        },
        {
            name: 'PanaAutos',
            quote:
                'El proceso de certificación con INTERCERT fue claro y ordenado. Nos ayudó a optimizar nuestros procesos y reforzar nuestro compromiso con la calidad y la seguridad en cada servicio que brindamos.',
            avatar: '/assets/images/logos/pana autos logo.png',
        },
        {
            name: 'Overhead Door Corporation Sucursal del Perú',
            quote:
                'Optamos por INTERCERT porque nos ofrecieron un excelente equilibrio entre costo y calidad. Estamos muy satisfechos con el resultado.',
            avatar: '/assets/images/logos/Overhead Door.jpeg',
        },
        {
            name: 'INVA Ingenieros',
            quote:
                'Certificarnos con INTERCERT en las normas ISO 9001, 14001, 37001 y 45001 fue un paso clave para fortalecer nuestra gestión integral. Su equipo nos acompañó con profesionalismo y claridad en todo el proceso.',
            avatar: '/assets/images/logos/INVA.jpeg',
        },
        {
            name: 'PROSEVIG',
            quote:
                'Trabajar con INTERCERT fue una excelente experiencia. El proceso nos ayudó a fortalecer nuestros sistemas de gestión, mejorar el control interno y reforzar la confianza de nuestros clientes y colaboradores.',
            avatar: '/assets/images/logos/PROSEVIG.jpeg',
        },
    ],
    pe: [
        {
            name: 'REFRYMAR PERÚ SAC',
            quote:
                'Nos ayudaron a certificarnos justo antes de una licitación clave. No conocíamos bien el proceso, pero nos explicaron todo paso a paso. Totalmente recomendados.',
            avatar: '/assets/images/testimonial/refrymar logo.png',
        },
        {
            name: 'ADN Almacenes del Norte – Parque Logístico',
            quote:
                'Certificarnos con INTERCERT en ISO 14001 e ISO 45001 fortaleció nuestro compromiso con la seguridad de nuestro equipo y con una gestión ambiental responsable. Un proceso claro y profesional de principio a fin.',
            avatar: '/assets/images/logos/ADN.jpeg',
        },
        {
            name: 'PanaAutos',
            quote:
                'El proceso de certificación con INTERCERT fue claro y ordenado. Nos ayudó a optimizar nuestros procesos y reforzar nuestro compromiso con la calidad y la seguridad en cada servicio que brindamos.',
            avatar: '/assets/images/logos/pana autos logo.png',
        },
        {
            name: 'Overhead Door Corporation Sucursal del Perú',
            quote:
                'Optamos por INTERCERT porque nos ofrecieron un excelente equilibrio entre costo y calidad. Estamos muy satisfechos con el resultado.',
            avatar: '/assets/images/logos/Overhead Door.jpeg',
        },
        {
            name: 'INVA Ingenieros',
            quote:
                'Certificarnos con INTERCERT en las normas ISO 9001, 14001, 37001 y 45001 fue un paso clave para fortalecer nuestra gestión integral. Su equipo nos acompañó con profesionalismo y claridad en todo el proceso.',
            avatar: '/assets/images/logos/INVA.jpeg',
        },
        {
            name: 'PROSEVIG',
            quote:
                'Trabajar con INTERCERT fue una excelente experiencia. El proceso nos ayudó a fortalecer nuestros sistemas de gestión, mejorar el control interno y reforzar la confianza de nuestros clientes y colaboradores.',
            avatar: '/assets/images/logos/PROSEVIG.jpeg',
        },
    ],
    co: [
        {
            name: 'REFRYMAR PERÚ SAC',
            quote:
                'Nos ayudaron a certificarnos justo antes de una licitación clave. No conocíamos bien el proceso, pero nos explicaron todo paso a paso. Totalmente recomendados.',
            avatar: '/assets/images/testimonial/refrymar logo.png',
        },
        {
            name: 'ADN Almacenes del Norte – Parque Logístico',
            quote:
                'Certificarnos con INTERCERT en ISO 14001 e ISO 45001 fortaleció nuestro compromiso con la seguridad de nuestro equipo y con una gestión ambiental responsable. Un proceso claro y profesional de principio a fin.',
            avatar: '/assets/images/logos/ADN.jpeg',
        },
        {
            name: 'PanaAutos',
            quote:
                'El proceso de certificación con INTERCERT fue claro y ordenado. Nos ayudó a optimizar nuestros procesos y reforzar nuestro compromiso con la calidad y la seguridad en cada servicio que brindamos.',
            avatar: '/assets/images/logos/pana autos logo.png',
        },
        {
            name: 'Overhead Door Corporation Sucursal del Perú',
            quote:
                'Optamos por INTERCERT porque nos ofrecieron un excelente equilibrio entre costo y calidad. Estamos muy satisfechos con el resultado.',
            avatar: '/assets/images/logos/Overhead Door.jpeg',
        },
        {
            name: 'INVA Ingenieros',
            quote:
                'Certificarnos con INTERCERT en las normas ISO 9001, 14001, 37001 y 45001 fue un paso clave para fortalecer nuestra gestión integral. Su equipo nos acompañó con profesionalismo y claridad en todo el proceso.',
            avatar: '/assets/images/logos/INVA.jpeg',
        },
        {
            name: 'PROSEVIG',
            quote:
                'Trabajar con INTERCERT fue una excelente experiencia. El proceso nos ayudó a fortalecer nuestros sistemas de gestión, mejorar el control interno y reforzar la confianza de nuestros clientes y colaboradores.',
            avatar: '/assets/images/logos/PROSEVIG.jpeg',
        },
    ],
    ec: [
        {
            name: 'REFRYMAR PERÚ SAC',
            quote:
                'Nos ayudaron a certificarnos justo antes de una licitación clave. No conocíamos bien el proceso, pero nos explicaron todo paso a paso. Totalmente recomendados.',
            avatar: '/assets/images/testimonial/refrymar logo.png',
        },
        {
            name: 'ADN Almacenes del Norte – Parque Logístico',
            quote:
                'Certificarnos con INTERCERT en ISO 14001 e ISO 45001 fortaleció nuestro compromiso con la seguridad de nuestro equipo y con una gestión ambiental responsable. Un proceso claro y profesional de principio a fin.',
            avatar: '/assets/images/logos/ADN.jpeg',
        },
        {
            name: 'PanaAutos',
            quote:
                'El proceso de certificación con INTERCERT fue claro y ordenado. Nos ayudó a optimizar nuestros procesos y reforzar nuestro compromiso con la calidad y la seguridad en cada servicio que brindamos.',
            avatar: '/assets/images/logos/pana autos logo.png',
        },
        {
            name: 'Overhead Door Corporation Sucursal del Perú',
            quote:
                'Optamos por INTERCERT porque nos ofrecieron un excelente equilibrio entre costo y calidad. Estamos muy satisfechos con el resultado.',
            avatar: '/assets/images/logos/Overhead Door.jpeg',
        },
        {
            name: 'INVA Ingenieros',
            quote:
                'Certificarnos con INTERCERT en las normas ISO 9001, 14001, 37001 y 45001 fue un paso clave para fortalecer nuestra gestión integral. Su equipo nos acompañó con profesionalismo y claridad en todo el proceso.',
            avatar: '/assets/images/logos/INVA.jpeg',
        },
        {
            name: 'PROSEVIG',
            quote:
                'Trabajar con INTERCERT fue una excelente experiencia. El proceso nos ayudó a fortalecer nuestros sistemas de gestión, mejorar el control interno y reforzar la confianza de nuestros clientes y colaboradores.',
            avatar: '/assets/images/logos/PROSEVIG.jpeg',
        },
    ],
    es: [
        {
            name: 'REFRYMAR PERÚ SAC',
            quote:
                'Nos ayudaron a certificarnos justo antes de una licitación clave. No conocíamos bien el proceso, pero nos explicaron todo paso a paso. Totalmente recomendados.',
            avatar: '/assets/images/testimonial/refrymar logo.png',
        },
        {
            name: 'ADN Almacenes del Norte – Parque Logístico',
            quote:
                'Certificarnos con INTERCERT en ISO 14001 e ISO 45001 fortaleció nuestro compromiso con la seguridad de nuestro equipo y con una gestión ambiental responsable. Un proceso claro y profesional de principio a fin.',
            avatar: '/assets/images/logos/ADN.jpeg',
        },
        {
            name: 'PanaAutos',
            quote:
                'El proceso de certificación con INTERCERT fue claro y ordenado. Nos ayudó a optimizar nuestros procesos y reforzar nuestro compromiso con la calidad y la seguridad en cada servicio que brindamos.',
            avatar: '/assets/images/logos/pana autos logo.png',
        },
        {
            name: 'Overhead Door Corporation Sucursal del Perú',
            quote:
                'Optamos por INTERCERT porque nos ofrecieron un excelente equilibrio entre costo y calidad. Estamos muy satisfechos con el resultado.',
            avatar: '/assets/images/logos/Overhead Door.jpeg',
        },
        {
            name: 'INVA Ingenieros',
            quote:
                'Certificarnos con INTERCERT en las normas ISO 9001, 14001, 37001 y 45001 fue un paso clave para fortalecer nuestra gestión integral. Su equipo nos acompañó con profesionalismo y claridad en todo el proceso.',
            avatar: '/assets/images/logos/INVA.jpeg',
        },
        {
            name: 'PROSEVIG',
            quote:
                'Trabajar con INTERCERT fue una excelente experiencia. El proceso nos ayudó a fortalecer nuestros sistemas de gestión, mejorar el control interno y reforzar la confianza de nuestros clientes y colaboradores.',
            avatar: '/assets/images/logos/PROSEVIG.jpeg',
        },
    ],
    mx: [
        {
            name: 'REFRYMAR PERÚ SAC',
            quote:
                'Nos ayudaron a certificarnos justo antes de una licitación clave. No conocíamos bien el proceso, pero nos explicaron todo paso a paso. Totalmente recomendados.',
            avatar: '/assets/images/testimonial/refrymar logo.png',
        },
        {
            name: 'ADN Almacenes del Norte – Parque Logístico',
            quote:
                'Certificarnos con INTERCERT en ISO 14001 e ISO 45001 fortaleció nuestro compromiso con la seguridad de nuestro equipo y con una gestión ambiental responsable. Un proceso claro y profesional de principio a fin.',
            avatar: '/assets/images/logos/ADN.jpeg',
        },
        {
            name: 'PanaAutos',
            quote:
                'El proceso de certificación con INTERCERT fue claro y ordenado. Nos ayudó a optimizar nuestros procesos y reforzar nuestro compromiso con la calidad y la seguridad en cada servicio que brindamos.',
            avatar: '/assets/images/logos/pana autos logo.png',
        },
        {
            name: 'Overhead Door Corporation Sucursal del Perú',
            quote:
                'Optamos por INTERCERT porque nos ofrecieron un excelente equilibrio entre costo y calidad. Estamos muy satisfechos con el resultado.',
            avatar: '/assets/images/logos/Overhead Door.jpeg',
        },
        {
            name: 'INVA Ingenieros',
            quote:
                'Certificarnos con INTERCERT en las normas ISO 9001, 14001, 37001 y 45001 fue un paso clave para fortalecer nuestra gestión integral. Su equipo nos acompañó con profesionalismo y claridad en todo el proceso.',
            avatar: '/assets/images/logos/INVA.jpeg',
        },
        {
            name: 'PROSEVIG',
            quote:
                'Trabajar con INTERCERT fue una excelente experiencia. El proceso nos ayudó a fortalecer nuestros sistemas de gestión, mejorar el control interno y reforzar la confianza de nuestros clientes y colaboradores.',
            avatar: '/assets/images/logos/PROSEVIG.jpeg',
        },
    ],
    pa: [
        {
            name: 'REFRYMAR PERÚ SAC',
            quote:
                'Nos ayudaron a certificarnos justo antes de una licitación clave. No conocíamos bien el proceso, pero nos explicaron todo paso a paso. Totalmente recomendados.',
            avatar: '/assets/images/testimonial/refrymar logo.png',
        },
        {
            name: 'ADN Almacenes del Norte – Parque Logístico',
            quote:
                'Certificarnos con INTERCERT en ISO 14001 e ISO 45001 fortaleció nuestro compromiso con la seguridad de nuestro equipo y con una gestión ambiental responsable. Un proceso claro y profesional de principio a fin.',
            avatar: '/assets/images/logos/ADN.jpeg',
        },
        {
            name: 'PanaAutos',
            quote:
                'El proceso de certificación con INTERCERT fue claro y ordenado. Nos ayudó a optimizar nuestros procesos y reforzar nuestro compromiso con la calidad y la seguridad en cada servicio que brindamos.',
            avatar: '/assets/images/logos/pana autos logo.png',
        },
        {
            name: 'Overhead Door Corporation Sucursal del Perú',
            quote:
                'Optamos por INTERCERT porque nos ofrecieron un excelente equilibrio entre costo y calidad. Estamos muy satisfechos con el resultado.',
            avatar: '/assets/images/logos/Overhead Door.jpeg',
        },
        {
            name: 'INVA Ingenieros',
            quote:
                'Certificarnos con INTERCERT en las normas ISO 9001, 14001, 37001 y 45001 fue un paso clave para fortalecer nuestra gestión integral. Su equipo nos acompañó con profesionalismo y claridad en todo el proceso.',
            avatar: '/assets/images/logos/INVA.jpeg',
        },
        {
            name: 'PROSEVIG',
            quote:
                'Trabajar con INTERCERT fue una excelente experiencia. El proceso nos ayudó a fortalecer nuestros sistemas de gestión, mejorar el control interno y reforzar la confianza de nuestros clientes y colaboradores.',
            avatar: '/assets/images/logos/PROSEVIG.jpeg',
        },
    ],
    cr: [
        {
            name: 'REFRYMAR PERÚ SAC',
            quote:
                'Nos ayudaron a certificarnos justo antes de una licitación clave. No conocíamos bien el proceso, pero nos explicaron todo paso a paso. Totalmente recomendados.',
            avatar: '/assets/images/testimonial/refrymar logo.png',
        },
        {
            name: 'ADN Almacenes del Norte – Parque Logístico',
            quote:
                'Certificarnos con INTERCERT en ISO 14001 e ISO 45001 fortaleció nuestro compromiso con la seguridad de nuestro equipo y con una gestión ambiental responsable. Un proceso claro y profesional de principio a fin.',
            avatar: '/assets/images/logos/ADN.jpeg',
        },
        {
            name: 'PanaAutos',
            quote:
                'El proceso de certificación con INTERCERT fue claro y ordenado. Nos ayudó a optimizar nuestros procesos y reforzar nuestro compromiso con la calidad y la seguridad en cada servicio que brindamos.',
            avatar: '/assets/images/logos/pana autos logo.png',
        },
        {
            name: 'Overhead Door Corporation Sucursal del Perú',
            quote:
                'Optamos por INTERCERT porque nos ofrecieron un excelente equilibrio entre costo y calidad. Estamos muy satisfechos con el resultado.',
            avatar: '/assets/images/logos/Overhead Door.jpeg',
        },
        {
            name: 'INVA Ingenieros',
            quote:
                'Certificarnos con INTERCERT en las normas ISO 9001, 14001, 37001 y 45001 fue un paso clave para fortalecer nuestra gestión integral. Su equipo nos acompañó con profesionalismo y claridad en todo el proceso.',
            avatar: '/assets/images/logos/INVA.jpeg',
        },
        {
            name: 'PROSEVIG',
            quote:
                'Trabajar con INTERCERT fue una excelente experiencia. El proceso nos ayudó a fortalecer nuestros sistemas de gestión, mejorar el control interno y reforzar la confianza de nuestros clientes y colaboradores.',
            avatar: '/assets/images/logos/PROSEVIG.jpeg',
        },
    ],
};

export const getTestimonialsForCountry = (countryCode?: string): TestimonialData[] => {
    if (!countryCode) {
        return TESTIMONIALS_BY_COUNTRY['global'] || [];
    }
    return TESTIMONIALS_BY_COUNTRY[countryCode] || TESTIMONIALS_BY_COUNTRY['global'] || [];
};
