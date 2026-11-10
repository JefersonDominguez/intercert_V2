import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Certification {
    code: string;
    description: string;
}

interface SectorData {
    name: string;
    icon: string;
    description: string;
    longDescription: string;
    benefits: string[];
    requirements: string[];
    certifications: Certification[];
    image: string;
}

interface SectorImages {
    main: string;
    secondary: string[];
}

type SectorKey = 'educativo' | 'pesca' | 'construccion' | 'salud' | 'alimentos-bebidas' | 'agroexportacion' | 'soluciones-sostenibles' | 'tecnologias-informacion';

// Función para rastrear visitas a sectores
const trackSectorVisit = (sectorId: string) => {
    const visits = JSON.parse(localStorage.getItem('sectorVisits') || '{}');
    visits[sectorId] = (visits[sectorId] || 0) + 1;
    localStorage.setItem('sectorVisits', JSON.stringify(visits));
};

const SectorDetail: React.FC = () => {
    const { sector } = useParams<{ sector: string }>();
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    // Rastrear visita al sector cuando se carga el componente
    useEffect(() => {
        if (sector) {
            trackSectorVisit(sector);
        }
    }, [sector]);

    // Datos de los sectores
    const sectorsData: Record<SectorKey, SectorData> = {
        'educativo': {
            name: 'Sector Educativo',
            icon: 'ri-graduation-cap-line',
            description: 'Certificaciones ISO especializadas para instituciones educativas, universidades y centros de formación profesional.',
            longDescription: 'El sector educativo requiere certificaciones específicas que garanticen la calidad en la prestación de servicios educativos, la gestión administrativa y la mejora continua de los procesos académicos.',
            benefits: [
                'Mejora de la calidad educativa',
                'Gestión eficiente de procesos académicos',
                'Cumplimiento de estándares internacionales',
                'Mejor reputación institucional',
                'Acceso a programas de financiamiento'
            ],
            requirements: [
                'Política de calidad educativa',
                'Manual de procedimientos académicos',
                'Sistema de evaluación continua',
                'Gestión de recursos humanos',
                'Control de documentos académicos'
            ],
            certifications: [
                { code: 'ISO 21001', description: 'Sistema de gestión para organizaciones educativas que alinea procesos académicos con objetivos de aprendizaje.' },
                { code: 'ISO 9001', description: 'Gestión de calidad en procesos académicos y administrativos para garantizar la satisfacción de estudiantes y padres.' },
                { code: 'ISO 45001', description: 'Seguridad y salud ocupacional para personal docente y administrativo en entornos educativos.' },
                { code: 'ISO 14001', description: 'Gestión ambiental para campus sostenibles y programas de responsabilidad social.' },
                { code: 'ISO 27001', description: 'Protección de información académica y datos personales de estudiantes.' }
            ],
            image: '/assets/images/Sectores/Image_o5tee7o5tee7o5te.png'
        },
        'pesca': {
            name: 'Sector Pesca',
            icon: 'ri-anchor-line',
            description: 'Certificaciones para empresas pesqueras, acuicultura y procesamiento de productos del mar.',
            longDescription: 'El sector pesquero necesita certificaciones que garanticen la sostenibilidad, la calidad del producto y el cumplimiento de normativas ambientales y de seguridad alimentaria.',
            benefits: [
                'Certificación de productos del mar',
                'Cumplimiento de normativas ambientales',
                'Mejora de procesos de producción',
                'Acceso a mercados internacionales',
                'Sostenibilidad pesquera'
            ],
            requirements: [
                'Sistema de trazabilidad',
                'Gestión ambiental marina',
                'Control de calidad del producto',
                'Seguridad alimentaria',
                'Gestión de residuos'
            ],
            certifications: [
                { code: 'ISO 22000', description: 'Seguridad alimentaria aplicada a productos hidrobiológicos y cadenas de frío.' },
                { code: 'ISO 9001', description: 'Gestión de calidad en captura, procesamiento y distribución de productos pesqueros.' },
                { code: 'ISO 14001', description: 'Gestión ambiental marina y control de impacto en ecosistemas acuáticos.' },
                { code: 'ISO 45001', description: 'Seguridad ocupacional para tripulaciones y personal de planta.' },
                { code: 'ISO 27001', description: 'Protección de datos logísticos y trazabilidad digital de productos del mar.' }
            ],
            image: '/assets/images/services/single-service.png'
        },
        'construccion': {
            name: 'Sector Construcción',
            icon: 'ri-building-line',
            description: 'Certificaciones ISO para empresas constructoras, ingeniería civil y gestión de proyectos inmobiliarios.',
            longDescription: 'La industria de la construcción requiere certificaciones que garanticen la calidad de los proyectos, la seguridad laboral y el cumplimiento de normativas ambientales.',
            benefits: [
                'Calidad en proyectos de construcción',
                'Seguridad laboral garantizada',
                'Cumplimiento de normativas ambientales',
                'Mejor gestión de proyectos',
                'Competitividad en licitaciones'
            ],
            requirements: [
                'Sistema de gestión de proyectos',
                'Protocolos de seguridad laboral',
                'Gestión ambiental en obra',
                'Control de calidad de materiales',
                'Gestión de proveedores'
            ],
            certifications: [
                { code: 'ISO 9001', description: 'Gestión de calidad para planificación, ejecución y entrega de proyectos constructivos.' },
                { code: 'ISO 45001', description: 'Prevención de riesgos y seguridad en obra para trabajadores y contratistas.' },
                { code: 'ISO 14001', description: 'Gestión ambiental enfocada en residuos de construcción y control de emisiones.' },
                { code: 'ISO 50001', description: 'Eficiencia energética en edificaciones y operaciones de obra.' },
                { code: 'ISO 37001', description: 'Sistemas antisoborno para procesos de contratación y licitaciones.' }
            ],
            image: '/assets/images/services/single-service.png'
        },
        'salud': {
            name: 'Sector Salud',
            icon: 'ri-hospital-line',
            description: 'Certificaciones especializadas para hospitales, clínicas, laboratorios y empresas farmacéuticas.',
            longDescription: 'El sector salud requiere certificaciones específicas que garanticen la calidad de la atención médica, la seguridad del paciente y el cumplimiento de normativas sanitarias.',
            benefits: [
                'Calidad en atención médica',
                'Seguridad del paciente',
                'Cumplimiento normativo sanitario',
                'Mejora de procesos clínicos',
                'Confianza de pacientes y familiares'
            ],
            requirements: [
                'Protocolos de atención médica',
                'Sistema de gestión de riesgos',
                'Control de infecciones',
                'Gestión de medicamentos',
                'Documentación clínica'
            ],
            certifications: [
                { code: 'ISO 15189', description: 'Calidad y competencia para laboratorios clínicos y biomédicos.' },
                { code: 'ISO 13485', description: 'Gestión de dispositivos médicos y equipamiento hospitalario.' },
                { code: 'ISO 9001', description: 'Protocolos de calidad en atención al paciente y gestión clínica.' },
                { code: 'ISO 45001', description: 'Seguridad laboral para personal médico y asistencial.' },
                { code: 'ISO 27001', description: 'Seguridad de información clínica y protección de historias médicas.' }
            ],
            image: '/assets/images/services/single-service.png'
        },
        'alimentos-bebidas': {
            name: 'Sector Alimentos y Bebidas',
            icon: 'ri-restaurant-line',
            description: 'Certificaciones ISO para empresas alimentarias, restaurantes, procesamiento y distribución de alimentos.',
            longDescription: 'La industria alimentaria necesita certificaciones que garanticen la seguridad alimentaria, la calidad del producto y el cumplimiento de normativas sanitarias.',
            benefits: [
                'Seguridad alimentaria garantizada',
                'Calidad del producto',
                'Cumplimiento normativo sanitario',
                'Acceso a mercados internacionales',
                'Confianza del consumidor'
            ],
            requirements: [
                'Sistema HACCP',
                'Trazabilidad alimentaria',
                'Control de alérgenos',
                'Gestión de proveedores',
                'Higiene y sanidad'
            ],
            certifications: [
                { code: 'ISO 22000', description: 'Inocuidad alimentaria y control HACCP en toda la cadena de valor.' },
                { code: 'ISO 9001', description: 'Calidad en producción, almacenamiento y distribución de alimentos.' },
                { code: 'ISO 14001', description: 'Gestión ambiental para plantas de procesamiento y empaquetado.' },
                { code: 'ISO 45001', description: 'Seguridad ocupacional en cocinas industriales y plantas.' },
                { code: 'ISO 27001', description: 'Protección de datos de proveedores y trazabilidad digital.' }
            ],
            image: '/assets/images/services/single-service.png'
        },
        'agroexportacion': {
            name: 'Sector Agroexportación',
            icon: 'ri-plant-line',
            description: 'Certificaciones para empresas agrícolas, exportadoras y procesamiento de productos agropecuarios.',
            longDescription: 'El sector agroexportador requiere certificaciones que garanticen la calidad del producto, el cumplimiento de normativas internacionales y la sostenibilidad ambiental.',
            benefits: [
                'Acceso a mercados internacionales',
                'Calidad del producto agrícola',
                'Cumplimiento de normativas fitosanitarias',
                'Sostenibilidad ambiental',
                'Competitividad en exportaciones'
            ],
            requirements: [
                'Sistema de trazabilidad agrícola',
                'Gestión ambiental rural',
                'Control de plagas y enfermedades',
                'Buenas prácticas agrícolas',
                'Gestión de residuos agrícolas'
            ],
            certifications: [
                { code: 'ISO 9001', description: 'Calidad en procesos agrícolas y cumplimiento de especificaciones de exportación.' },
                { code: 'ISO 22000', description: 'Seguridad alimentaria en productos frescos y procesados para exportación.' },
                { code: 'ISO 14001', description: 'Sostenibilidad y manejo ambiental en cultivos y empaques.' },
                { code: 'ISO 45001', description: 'Seguridad y salud del personal agrícola y de packing.' },
                { code: 'ISO 26000', description: 'Responsabilidad social en comunidades agrícolas y cadenas de suministro.' }
            ],
            image: '/assets/images/services/single-service.png'
        },
        'soluciones-sostenibles': {
            name: 'Soluciones Sostenibles',
            icon: 'ri-leaf-line',
            description: 'Certificaciones ambientales y de sostenibilidad para empresas comprometidas con el medio ambiente.',
            longDescription: 'Las soluciones sostenibles requieren certificaciones que demuestren el compromiso ambiental y la implementación de prácticas sostenibles en todos los procesos empresariales.',
            benefits: [
                'Compromiso ambiental demostrado',
                'Reducción del impacto ambiental',
                'Eficiencia energética',
                'Cumplimiento normativo ambiental',
                'Reputación corporativa sostenible'
            ],
            requirements: [
                'Sistema de gestión ambiental',
                'Evaluación de impacto ambiental',
                'Gestión de residuos',
                'Eficiencia energética',
                'Reportes de sostenibilidad'
            ],
            certifications: [
                { code: 'ISO 14001', description: 'Gestión ambiental integral para proyectos y operaciones sostenibles.' },
                { code: 'ISO 50001', description: 'Eficiencia energética y reducción de emisiones de carbono.' },
                { code: 'ISO 26000', description: 'Responsabilidad social corporativa con enfoque sostenible.' },
                { code: 'ISO 9001', description: 'Gestión de calidad orientada a innovación y mejora continua.' },
                { code: 'ISO 45001', description: 'Seguridad y salud ocupacional en industrias verdes.' }
            ],
            image: '/assets/images/services/single-service.png'
        },
        'tecnologias-informacion': {
            name: 'Tecnologías de la Información',
            icon: 'ri-computer-line',
            description: 'Certificaciones ISO para empresas de tecnología, software, telecomunicaciones y servicios digitales.',
            longDescription: 'El sector de tecnologías de la información requiere certificaciones que garanticen la seguridad de la información, la calidad del software y el cumplimiento de normativas de ciberseguridad.',
            benefits: [
                'Seguridad de la información',
                'Calidad del software',
                'Cumplimiento de normativas de ciberseguridad',
                'Confianza de clientes',
                'Competitividad tecnológica'
            ],
            requirements: [
                'Sistema de gestión de seguridad de la información',
                'Desarrollo seguro de software',
                'Gestión de riesgos de TI',
                'Continuidad del negocio',
                'Gestión de incidentes de seguridad'
            ],
            certifications: [
                { code: 'ISO 27001', description: 'Gestión de seguridad de la información y ciberseguridad corporativa.' },
                { code: 'ISO 20000', description: 'Gestión de servicios de TI alineados a mejores prácticas ITIL.' },
                { code: 'ISO 22301', description: 'Continuidad de negocio y recuperación ante desastres para servicios digitales.' },
                { code: 'ISO 9001', description: 'Calidad en desarrollo de software y soporte tecnológico.' },
                { code: 'ISO 37001', description: 'Cumplimiento y ética en operaciones y contratos tecnológicos.' }
            ],
            image: '/assets/images/services/single-service.png'
        }
    };

    // Función para obtener imágenes temáticas por sector desde internet
    const getSectorImages = (sectorKey: string): SectorImages => {
        const sectorImages: Record<string, SectorImages> = {
            'educativo': {
                main: '/assets/images/Sectores/Image_o5tee7o5tee7o5te.png', // Educación/escuela
                secondary: ['/assets/images/Sectores/e/_b7rc80b7rc80b7rc.png', '/assets/images/Sectores/e/_xbclssxbclssxbcl.png']
            },
            'pesca': {
                main: '/assets/images/Sectores/pesca.png', // Pesca/océano
                secondary: ['/assets/images/Sectores/p/_2ewpsl2ewpsl2ewp.png', '/assets/images/Sectores/p/_t83nfkt83nfkt83n.png']
            },
            'construccion': {
                main: '/assets/images/Sectores/construccion.png', // Construcción/edificios
                secondary: ['/assets/images/Sectores/c/avw9dwavw9dwavw9.png', '/assets/images/Sectores/c/_xwnepwxwnepwxwne.png']
            },
            'salud': {
                main: '/assets/images/Sectores/sector salud.jpg', // Salud/hospital
                secondary: ['/assets/images/Sectores/s/_oeb28boeb28boeb2.png', '/assets/images/Sectores/s/Image_ali8lxali8lxali8.png']
            },
            'alimentos-bebidas': {
                main: '/assets/images/Sectores/alimentos y bebidas.jpg', // Alimentos/restaurante
                secondary: ['/assets/images/Sectores/ab/_xwursuxwursuxwur.png', '/assets/images/Sectores/ab/Image_fdl13gfdl13gfdl1.png']
            },
            'agroexportacion': {
                main: '/assets/images/Sectores/agroexportacion.jpg', // Agricultura/campo
                secondary: ['/assets/images/Sectores/a/_eapaoyeapaoyeapa.png', '/assets/images/Sectores/a/_krs35hkrs35hkrs3.png']
            },
            'soluciones-sostenibles': {
                main: '/assets/images/Sectores/_fruvsrfruvsrfruv.png', // Sostenibilidad/naturaleza
                secondary: ['/assets/images/Sectores/ss/_Image_1zm4sx1zm4sx1zm4.png', '/assets/images/Sectores/ss/_Image_1zm4sx1zm4sx1zm4.png']
            },
            'tecnologias-informacion': {
                main: '/assets/images/Sectores/tecnologia de la info.jpeg', // Tecnología/computadoras
                secondary: ['/assets/images/Sectores/ti/mqh30kmqh30kmqh3.png', '/assets/images/Sectores/ti/x3h7dlx3h7dlx3h7.png']
            }
        };
        return (sectorImages[sectorKey] || sectorImages['educativo']) as SectorImages;
    };

    // Función para obtener la ruta correcta de la imagen ISO
    const getISOImagePath = (certification: string) => {
        // Mapear certificaciones a nombres de archivo correctos
        const imageMap: Record<string, string> = {
            'ISO 9001': 'ISO 9001.png',
            'ISO 14001': 'ISO 14001.png',
            'ISO 22000': 'ISO 22000.png',
            'ISO 45001': 'ISO45001.png',
            'ISO 27001': 'ISO 27001.png',
            'ISO 50001': 'ISO50001.png',
            'ISO 22301': 'ISO22301.png',
            'ISO 37001': 'ISO37001.png',
            'ISO 13485': 'ISO 13485.png',
            'ISO 15189': 'ISO 15189.png',
            'ISO 17025': 'ISO 17025.png',
            'ISO 20000': 'ISO 20000.png',
            'ISO 21001': 'ISO 21001.png',
            'ISO 26000': 'ISO26000.png',
            'ISO 28000': 'ISO 28000.png',
            'ISO 31000': 'ISO 31000.png',
            'ISO 56002': 'ISO 56002.png',
            'ISO 90003': 'ISO 90003.png',
            'ISO 10002': 'ISO 10002.png',
            'ISO 17020': 'ISO 17020.png',
            'ISO 17021': 'ISO 17021.png',
            'ISO 22005': 'ISO 22005.png',
            'ISO 27701': 'ISO 27701.png',
            'ISO 39001': 'ISO39001.png',
            'ISO IEC 2382': 'ISO IEC 2382.png',
            'ISO IEC 29119': 'ISO IEC 29119.png',
            'HACCP': 'HACCP.png',
            'BPA': 'BPA.png',
            'BPL ISO': 'BPL ISO.png',
            'BPM': 'BPM.png',
            'MSC': 'ISO 9001.png', // Fallback para MSC
            'GLOBALGAP': 'ISO 9001.png', // Fallback para GLOBALGAP
            'BRC': 'ISO 9001.png' // Fallback para BRC
        };

        const fileName = imageMap[certification] || 'ISO 9001.png';
        return `/assets/images/ISOS/${fileName}`;
    };

    const sectorKey = (sector || 'educativo') as SectorKey;
    const sectorImages = getSectorImages(sectorKey);
    const sectorData = sectorsData[sectorKey] || sectorsData['educativo'];

    useEffect(() => {
        // Manejar data-background para React cada vez que el sector cambie
        const elements = document.querySelectorAll<HTMLElement>('[data-background]');
        elements.forEach((element) => {
            const backgroundImage = element.getAttribute('data-background');
            if (backgroundImage) {
                element.style.backgroundImage = `url("${backgroundImage}")`;
                element.style.backgroundSize = 'cover';
                element.style.backgroundPosition = 'center';
            }
        });
    }, [sector, sectorImages]);
    const uniqueCertifications = useMemo(() => {
        const map = new Map();
        (sectorData.certifications || []).forEach((cert) => {
            if (!map.has(cert.code)) {
                map.set(cert.code, cert);
            }
        });
        return Array.from(map.values()) as Certification[];
    }, [sectorData]);

    const breadcrumbImage = sectorImages?.main || '/assets/images/slider/slider-1-1.jpg';
    const breadcrumbCssValue = breadcrumbImage ? `url("${breadcrumbImage}")` : 'none';

    return (
        <>
            {/* breadcrumb-area-start */}
            <div
                className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative"
                data-background={breadcrumbImage}
                style={{
                    backgroundImage: breadcrumbCssValue,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <h3 className="tv-breadcrumb-title">{sectorData.name}</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><Link to="/">Inicio</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <span><Link to="/services">Sectores</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>{sectorData.name}</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* breadcrumb-area-end */}

            <div className="tv-blog-area tv-project-details pt-130 pb-130">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="project-thumbnail mb-60">
                                <img src={sectorImages.main} alt={sectorData.name} style={{
                                    borderRadius: '30px 0 30px 0',
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover'
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-12">
                            <div className="tv-blog-list-wrap">
                                <div className="tv-blog-details">
                                    <div className="tv-blog-details-content">
                                        <div className="tv-project-content">
                                            <h2>{sectorData.name}</h2>
                                            <p>{sectorData.longDescription}</p>
                                            <p>Nuestro equipo de expertos en certificaciones ISO trabaja de manera integral para brindar soluciones personalizadas que se adapten a las necesidades específicas de cada sector. Con años de experiencia en el mercado latinoamericano, garantizamos procesos eficientes y resultados exitosos.</p>
                                        </div>
                                        <div className="tv-blog-details-thumb-img d-flex justify-content-between">
                                            <div><img src={sectorImages.secondary[0]} alt="Beneficios" style={{
                                                borderRadius: '30px 0 30px 0',
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover'
                                            }} /></div>
                                            <div><img src={sectorImages.secondary[1]} alt="Procesos" style={{
                                                borderRadius: '30px 0 30px 0',
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover'
                                            }} /></div>
                                        </div>
                                        <p className="mb-60">La implementación de sistemas de gestión certificados permite a las organizaciones mejorar significativamente sus procesos internos, aumentar la satisfacción del cliente y acceder a nuevos mercados. Nuestro enfoque metodológico garantiza una transición suave y resultados medibles.</p>

                                        <div className="tv-project-content mb-42">
                                            <h2>Beneficios de la Certificación</h2>
                                            <p>Las certificaciones ISO proporcionan múltiples ventajas competitivas y operativas que transforman la forma en que las organizaciones operan y se posicionan en el mercado.</p>
                                            <div className="tv-custom-accordion">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingBenefits">
                                                        <button
                                                            className={`accordion-buttons ${openAccordion === 'benefits' ? '' : 'collapsed'}`}
                                                            type="button"
                                                            onClick={() => setOpenAccordion(openAccordion === 'benefits' ? null : 'benefits')}
                                                        >
                                                            Ver Beneficios Detallados
                                                            <i className={openAccordion === 'benefits' ? 'ri-subtract-line' : 'ri-add-line'}></i>
                                                        </button>
                                                    </h2>
                                                    <div
                                                        className={`accordion-collapse ${openAccordion === 'benefits' ? 'show' : ''}`}
                                                        style={{
                                                            display: openAccordion === 'benefits' ? 'block' : 'none',
                                                            maxHeight: openAccordion === 'benefits' ? '1000px' : '0',
                                                            overflow: 'hidden',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <div className="accordion-body" style={{
                                                            padding: '30px 35px',
                                                            background: '#ffffff',
                                                            borderTop: '1px solid #e5e7eb'
                                                        }}>
                                                            <ul className="tv-about-list" style={{
                                                                listStyle: 'none',
                                                                padding: 0,
                                                                margin: 0
                                                            }}>
                                                                {sectorData.benefits.map((benefit, index) => (
                                                                    <li key={index} style={{
                                                                        display: 'flex',
                                                                        alignItems: 'flex-start',
                                                                        marginBottom: '20px',
                                                                        padding: '18px 0',
                                                                        borderBottom: index < sectorData.benefits.length - 1 ? '1px solid #f3f4f6' : 'none',
                                                                        position: 'relative'
                                                                    }}>
                                                                        <i className="ri-check-line" style={{
                                                                            color: '#159dbc',
                                                                            fontSize: '18px',
                                                                            marginRight: '15px',
                                                                            marginTop: '2px',
                                                                            flexShrink: 0
                                                                        }}></i>
                                                                        <span style={{
                                                                            fontSize: '16px',
                                                                            color: '#374151',
                                                                            fontWeight: '400',
                                                                            lineHeight: '1.6',
                                                                            flex: 1
                                                                        }}>{benefit}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-12">
                            <div className="tv-project-sidebar-details">
                                <h4>Detalles del Sector</h4>
                                <div className="tv-project-list-item">
                                    <ul>
                                        <li>
                                            <span className="name">Sector</span>
                                            <span className="colon">:</span>
                                            <span>{sectorData.name}</span>
                                        </li>
                                        <li>
                                            <span className="name">Categoría</span>
                                            <span className="colon">:</span>
                                            <span>Certificaciones ISO</span>
                                        </li>
                                        <li>
                                            <span className="name">Contacto</span>
                                            <span className="colon">:</span>
                                            <span><a href="mailto:info@intercertlatam.com">info@intercertlatam.com</a></span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="tv-header-top-social-box">
                                    <a href="https://www.facebook.com/IntercertLatam" target="_blank" rel="noreferrer"><i className="ri-facebook-fill"></i></a>
                                    <a href="https://x.com/intercertlatam" target="_blank" rel="noreferrer"><i className="ri-twitter-fill"></i></a>
                                    <a href="https://www.linkedin.com/company/intercertlatam" target="_blank" rel="noreferrer"><i className="ri-linkedin-fill"></i></a>
                                    <a href="https://www.instagram.com/intercertlatam" target="_blank" rel="noreferrer"><i className="ri-instagram-fill"></i></a>
                                </div>
                            </div>

                            {/* Carrusel de ISOs del Sector - Div Independiente */}
                            <div className="tv-project-sidebar-details" style={{ marginTop: '30px' }}>
                                <h4>Certificaciones ISO</h4>
                                <div className="tv-iso-carousel-main" style={{
                                    background: 'white',
                                    borderRadius: '15px',
                                    padding: '20px',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                    overflow: 'hidden'
                                }}>
                                    <Swiper
                                        modules={[Autoplay, Pagination]}
                                        slidesPerView={1}
                                        spaceBetween={16}
                                        loop={false}
                                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                                        pagination={{ clickable: true }}
                                        breakpoints={{
                                            576: { slidesPerView: 1 },
                                            768: { slidesPerView: 2 },
                                        }}
                                        style={{ width: '100%', paddingBottom: '32px' }}
                                    >
                                        {uniqueCertifications.map((cert) => (
                                            <SwiperSlide key={cert.code}>
                                                <div className="tv-iso-item-main" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%',
                                                    width: '100%',
                                                    padding: '12px',
                                                    textAlign: 'center',
                                                    border: '1px solid #e9ecef',
                                                    borderRadius: '8px',
                                                    background: '#fff',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    <img
                                                        src={getISOImagePath(cert.code)}
                                                        alt={cert.code}
                                                        style={{
                                                            maxWidth: '120px',
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            display: 'block'
                                                        }}
                                                        onError={(e) => {
                                                            console.log(`Error loading image for: ${cert.code}`);
                                                            (e.target as HTMLImageElement).src = '/assets/images/ISOS/ISO 9001.png';
                                                        }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectorDetail;
