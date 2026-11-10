import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBuildCountryUrl } from '../hooks/useBuildCountryUrl';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import './PersonCertification.css';

interface CertificationPlan {
    title: string;
    benefits: string[];
    description: string;
    proposito: string;
    duracion: string;
    formato: string;
    dirigido: string;
}

type PlanKey = 'interpretacion' | 'auditorInterno' | 'auditorLider';

const PLAN_IMAGES: Record<PlanKey, string> = {
    interpretacion: '/assets/images/projects/_yqco9yqco9yqco9y.png',
    auditorInterno: '/assets/images/projects/_b5dbusb5dbusb5db.png',
    auditorLider: '/assets/images/projects/_ct5rw5ct5rw5ct5r.png',
};

const PLAN_ICONS: Record<PlanKey, string> = {
    interpretacion: 'ri-book-open-line',
    auditorInterno: 'ri-search-eye-line',
    auditorLider: 'ri-user-star-line',
};

const HERO_BG = '/assets/images/cursos/fondo_banner_cursos.png';
const HERO_FIGURE = '/assets/images/cursos/chica_banne_cursos.png';

const ISO_BADGES = [
    { alt: 'ISO 9001', src: '/assets/images/ISOS/ISO 9001.png' },
    { alt: 'ISO 14001', src: '/assets/images/ISOS/ISO 14001.png' },
    { alt: 'ISO 45001', src: '/assets/images/ISOS/ISO45001.png' },
    { alt: 'ISO 27001', src: '/assets/images/ISOS/ISO 27001.png' },
    { alt: 'ISO 22000', src: '/assets/images/ISOS/ISO 22000.png' },
    { alt: 'ISO 50001', src: '/assets/images/ISOS/ISO50001.png' },
    { alt: 'ISO 37001', src: '/assets/images/ISOS/ISO37001.png' },
    { alt: 'ISO 22301', src: '/assets/images/ISOS/ISO22301.png' },
];

const FEATURED_COURSES = [
    {
        tag: 'Auditor Líder',
        title: 'ISO 9001:2015 Sistemas de Gestión',
        description: 'Domine las herramientas para liderar auditorías de calidad eficaces bajo estándares internacionales.',
        duration: '40 Horas',
        image: '/assets/images/home/slide1.jpeg',
    },
    {
        tag: 'Ciberseguridad',
        title: 'ISO/IEC 27001 Seguridad Información',
        description: 'Implemente estrategias robustas para la protección de la información corporativa.',
        duration: '32 Horas',
        image: '/assets/images/home/slide2.jpeg',
    },
    {
        tag: 'Continuidad',
        title: 'ISO 22301 Gestión de Continuidad',
        description: 'Prepare a su organización para responder ante incidentes disruptivos graves.',
        duration: '24 Horas',
        image: '/assets/images/home/slide3.jpeg',
    },
];

type SectorSize = 'qhse' | 'sm' | 'md';

interface SectorCard {
    key: string;
    title: string;
    description: string;
    image: string;
    size: SectorSize;
    cta: string | null;
}

interface SectorSlide {
    id: string;
    label: string;
    sectors: SectorCard[];
}

const SECTOR_SLIDES: SectorSlide[] = [
    {
        id: 'gestion',
        label: 'Gestión Integral',
        sectors: [
            {
                key: 'qhse',
                title: 'QHSE: Calidad, Salud y Ambiente',
                description: 'ISO 9001, 14001 y 45001. Soluciones integrales para la gestión de riesgos operativos y excelencia organizacional.',
                image: '/assets/images/home/home-certificacion_iso_peru.webp',
                size: 'qhse',
                cta: 'Ver más',
            },
            {
                key: 'food',
                title: 'Inocuidad Alimentaria',
                description: 'Garantía de calidad en la cadena de suministro.',
                image: '/assets/images/home/DSC00825.JPG',
                size: 'sm',
                cta: 'Explorar',
            },
            {
                key: 'cyber',
                title: 'Ciberseguridad e IT',
                description: 'Protección de activos digitales y cumplimiento ISO 27001.',
                image: '/assets/images/home/slide2.jpeg',
                size: 'sm',
                cta: 'Ver detalles',
            },
            {
                key: 'risk',
                title: 'Riesgo y Continuidad',
                description: 'Resiliencia operativa frente a cualquier interrupción crítica.',
                image: '/assets/images/home/auditoria y certificacion.png',
                size: 'md',
                cta: null,
            },
            {
                key: 'sustainability',
                title: 'Sostenibilidad Corporativa',
                description: 'Estrategias ESG y compromiso con el impacto ambiental positivo.',
                image: '/assets/images/breadcrumb/Certificado de Personas.jpg',
                size: 'md',
                cta: null,
            },
        ],
    },
    {
        id: 'industria',
        label: 'Industrias Clave',
        sectors: [
            {
                key: 'salud',
                title: 'Salud y Bienestar',
                description: 'Certificación de competencias para profesionales del sector salud bajo estándares internacionales.',
                image: '/assets/images/home/slide1.jpeg',
                size: 'qhse',
                cta: 'Ver más',
            },
            {
                key: 'educativo',
                title: 'Sector Educativo',
                description: 'Formación y certificación para instituciones y profesionales de la educación.',
                image: '/assets/images/home/slide3.jpeg',
                size: 'sm',
                cta: 'Explorar',
            },
            {
                key: 'alimentos',
                title: 'Alimentos y Bebidas',
                description: 'Competencias en inocuidad, BPM y normas ISO para la industria alimentaria.',
                image: '/assets/images/home/DSC00825.JPG',
                size: 'sm',
                cta: 'Ver detalles',
            },
            {
                key: 'construccion',
                title: 'Construcción e Infraestructura',
                description: 'Gestión de calidad y seguridad para proyectos de construcción y obras civiles.',
                image: '/assets/images/home/emision y certificacion.png',
                size: 'md',
                cta: null,
            },
            {
                key: 'tecnologia',
                title: 'Tecnologías de la Información',
                description: 'Auditoría y certificación de profesionales en sistemas y servicios tecnológicos.',
                image: '/assets/images/home/slide2.jpeg',
                size: 'md',
                cta: null,
            },
        ],
    },
    {
        id: 'operaciones',
        label: 'Operaciones y Servicios',
        sectors: [
            {
                key: 'agro',
                title: 'Agroexportación',
                description: 'Certificación de personas en buenas prácticas agrícolas y trazabilidad para exportación.',
                image: '/assets/images/home/home-certificacion_iso_peru.webp',
                size: 'qhse',
                cta: 'Ver más',
            },
            {
                key: 'pesca',
                title: 'Pesca y Acuicultura',
                description: 'Normas de calidad e inocuidad para la cadena pesquera y acuícola.',
                image: '/assets/images/home/DSC00825.JPG',
                size: 'sm',
                cta: 'Explorar',
            },
            {
                key: 'energia',
                title: 'Energía y Eficiencia',
                description: 'Competencias en ISO 50001 y gestión energética para organizaciones sostenibles.',
                image: '/assets/images/home/diagnostico inicial.png',
                size: 'sm',
                cta: 'Ver detalles',
            },
            {
                key: 'logistica',
                title: 'Logística y Distribución',
                description: 'Certificación profesional en cadena de suministro y operaciones logísticas.',
                image: '/assets/images/home/auditoria y certificacion.png',
                size: 'md',
                cta: null,
            },
            {
                key: 'servicios',
                title: 'Servicios Profesionales',
                description: 'Formación certificada para consultores, auditores y asesores especializados.',
                image: '/assets/images/breadcrumb/Certificado de Personas.jpg',
                size: 'md',
                cta: null,
            },
        ],
    },
];

const getBentoCardClass = (size: SectorSize) => {
    if (size === 'qhse') return 'pc-bento-card--large pc-bento-card--qhse';
    if (size === 'sm') return 'pc-bento-card--sm';
    return 'pc-bento-card--md';
};

const WHY_US = [
    {
        icon: 'ri-sparkling-2-line',
        title: 'Metodología de Vanguardia',
        description: 'Teoría rigurosa con casos prácticos reales para asegurar la aplicación efectiva.',
    },
    {
        icon: 'ri-global-line',
        title: 'Presencia Global',
        description: 'Certificados aceptados y valorados por empresas líderes en más de 40 países.',
    },
    {
        icon: 'ri-award-line',
        title: 'Acreditación Oficial',
        description: 'Garantía total de cumplimiento con los estándares internacionales más exigentes.',
    },
    {
        icon: 'ri-customer-service-2-line',
        title: 'Soporte Continuo',
        description: 'Acompañamiento experto durante todo el proceso de formación y auditoría.',
    },
];

const VALUE_PROPS = [
    {
        icon: 'ri-global-line',
        title: 'Reconocimiento Internacional',
        description: 'Certificaciones avaladas por organismos globales que abren puertas en mercados internacionales.',
    },
    {
        icon: 'ri-shield-check-line',
        title: 'Auditores Expertos',
        description: 'Nuestro equipo cuenta con años de experiencia en auditoría y consultoría estratégica bajo estándares ISO.',
    },
    {
        icon: 'ri-graduation-cap-line',
        title: 'Aprendizaje Flexible',
        description: 'Programas diseñados para adaptarse a tu ritmo con modalidades online, híbridas y presenciales.',
    },
];

const ACCORDION_KEYS = ['descripcion', 'proposito', 'duracion', 'dirigido'] as const;
type AccordionKey = (typeof ACCORDION_KEYS)[number];

const PersonCertification: React.FC = () => {
    const { buildUrl } = useBuildCountryUrl();
    const [activePlan, setActivePlan] = useState<PlanKey | null>(null);
    const [openAccordion, setOpenAccordion] = useState<AccordionKey | null>('descripcion');
    const [sectorSlide, setSectorSlide] = useState(0);
    const planDetailRef = useRef<HTMLDivElement>(null);

    const helmet = useSeoMetadata({
        title: 'Certificación de Personas | INTERCERT LATAM',
        description:
            'Programas de certificación profesional en normas ISO: Interpretación de la Norma, Auditor Interno y Auditor Líder. Formación acreditada internacionalmente.',
    });

    const certificationPlans: Record<PlanKey, CertificationPlan> = {
        interpretacion: {
            title: 'Interpretación de la Norma',
            benefits: [
                'Comprensión profunda de los requisitos de la norma',
                'Capacidad para implementar la norma en su organización',
                'Conocimiento de las mejores prácticas internacionales',
                'Mejora de la eficiencia en los procesos de implementación',
                'Base sólida para avanzar hacia certificaciones de auditor',
            ],
            description:
                'Formación especializada para comprender e interpretar correctamente los requisitos y directrices de las normas ISO.',
            proposito:
                'Proporcionar a los participantes el conocimiento necesario para entender los requisitos específicos de una norma ISO y cómo aplicarlos en su organización.',
            duracion: '16 horas de capacitación de manera asincrónica',
            formato: 'Materiales digitales',
            dirigido:
                'Profesionales responsables de implementar sistemas de gestión, consultores, y cualquier persona interesada en comprender las normas ISO.',
        },
        auditorInterno: {
            title: 'Auditor Interno',
            benefits: [
                'Capacidad para realizar auditorías internas completas',
                'Identificación de no conformidades y oportunidades de mejora',
                'Contribución a la mejora continua de la organización',
                'Preparación para auditorías externas de certificación',
                'Desarrollo de habilidades de comunicación y análisis',
            ],
            description:
                'Formación para realizar auditorías internas efectivas de sistemas de gestión basados en normas ISO dentro de la organización.',
            proposito:
                'Formar auditores internos competentes capaces de evaluar la conformidad de los sistemas de gestión, identificar no conformidades y proponer acciones correctivas para la mejora continua.',
            duracion: '24 a 30 horas de capacitación de manera asincrónica',
            formato: 'Materiales digitales',
            dirigido:
                'Profesionales designados como auditores internos, responsables de calidad, y personal involucrado en el mantenimiento de sistemas de gestión.',
        },
        auditorLider: {
            title: 'Auditor Líder',
            benefits: [
                'Capacidad para liderar equipos de auditoría',
                'Gestión eficaz de programas de auditoría',
                'Evaluación integral de sistemas de gestión',
                'Reconocimiento profesional internacional',
                'Oportunidades de carrera como auditor certificado',
            ],
            description:
                'Formación avanzada para liderar equipos de auditoría y gestionar programas completos de auditoría de sistemas de gestión.',
            proposito:
                'Desarrollar las competencias clave para planificar, liderar y coordinar auditorías integrales, actuando con enfoque estratégico, dominio normativo y capacidad para guiar equipos de manera eficaz.',
            duracion: '40 horas de capacitación de manera asincrónica',
            formato: 'Materiales digitales',
            dirigido:
                'Auditores internos experimentados, consultores, profesionales que buscan certificarse como auditores de tercera parte.',
        },
    };

    const handlePlanSelect = (key: PlanKey) => {
        const next = activePlan === key ? null : key;
        setActivePlan(next);
        if (next) {
            setOpenAccordion('descripcion');
        }
    };

    useEffect(() => {
        if (activePlan && planDetailRef.current) {
            planDetailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activePlan]);

    const toggleAccordion = (key: AccordionKey) => {
        setOpenAccordion((prev) => (prev === key ? null : key));
    };

    const getAccordionContent = (key: AccordionKey, plan: CertificationPlan) => {
        switch (key) {
            case 'descripcion':
                return plan.description;
            case 'proposito':
                return plan.proposito;
            case 'duracion':
                return (
                    <>
                        <strong>Duración:</strong> {plan.duracion}
                        <br />
                        <strong>Formato:</strong> {plan.formato}
                    </>
                );
            case 'dirigido':
                return plan.dirigido;
        }
    };

    const accordionLabels: Record<AccordionKey, string> = {
        descripcion: 'Descripción del Programa',
        proposito: 'Propósito Principal',
        duracion: 'Duración y Formato',
        dirigido: 'Dirigido a',
    };

    const marqueeItems = [...ISO_BADGES, ...ISO_BADGES];

    const goSectorPrev = () => {
        setSectorSlide((prev) => (prev === 0 ? SECTOR_SLIDES.length - 1 : prev - 1));
    };

    const goSectorNext = () => {
        setSectorSlide((prev) => (prev === SECTOR_SLIDES.length - 1 ? 0 : prev + 1));
    };

    const renderBentoGrid = (sectors: SectorCard[], slideId: string) => (
        <div className="pc-bento">
            {sectors.map((sector) => (
                <article
                    key={`${slideId}-${sector.key}`}
                    className={`pc-bento-card ${getBentoCardClass(sector.size)}`}
                >
                    <img src={sector.image} alt={sector.title} loading="lazy" />
                    <div className="pc-bento-card__overlay" />
                    <div className="pc-bento-card__body">
                        <h4>{sector.title}</h4>
                        <p>{sector.description}</p>
                        {sector.cta && (
                            <Link to={buildUrl('/certificacion-iso')} className="pc-bento-link">
                                {sector.cta}{' '}
                                <i className="ri-arrow-right-line" aria-hidden="true" />
                            </Link>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );

    return (
        <>
            {helmet}
            <div className="pc-page">
                {/* Hero — layout alineado al slider del Home */}
                <section className="pc-hero">
                    <div className="pc-hero__overlay">
                        <div
                            className="pc-hero__overlay-bg"
                            style={{ backgroundImage: `url("${HERO_BG}")` }}
                        />
                        <div className="pc-hero__overlay-shade" />
                        <div className="pc-hero__figure-wrap">
                            <img
                                className="pc-hero__figure"
                                src={HERO_FIGURE}
                                alt="Profesional certificada Intercert"
                            />
                        </div>
                    </div>
                    <div className="container pc-hero__container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="pc-hero__content">
                                    <span className="pc-hero__eyebrow">
                                        Líderes en Certificación Global
                                    </span>
                                    <h1 className="pc-hero__title">
                                        Expertos en Certificaciones ISO para tu{' '}
                                        <span>Crecimiento</span>
                                    </h1>
                                    <div className="pc-hero__text">
                                        <p className="pc-hero__subtitle">
                                            Impulsamos la competitividad organizacional y el desarrollo
                                            profesional a través de estándares internacionales de excelencia.
                                        </p>
                                    </div>
                                    <div className="pc-hero__actions">
                                        <Link to={buildUrl('/contact')} className="pc-btn pc-btn--white">
                                            Contáctanos
                                        </Link>
                                        <a
                                            href="#categorias-formacion"
                                            className="pc-btn pc-btn--ghost"
                                        >
                                            Explorar Programas
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pc-hero__wave" aria-hidden="true">
                        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
                        </svg>
                    </div>
                </section>

                {/* Value proposition */}
                <section className="pc-section">
                    <div className="pc-organic-blob" style={{ top: 0, left: '25%' }} />
                    <div className="pc-container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="pc-value-grid">
                            {VALUE_PROPS.map((item) => (
                                <div key={item.title} className="pc-glass-card">
                                    <div className="pc-glass-card__icon">
                                        <i className={item.icon} aria-hidden="true" />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bento sectors */}
                <section className="pc-section pc-bento-section">
                    <div className="pc-organic-blob" style={{ bottom: 0, right: 0, opacity: 0.5 }} />
                    <div className="pc-container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="pc-section-header">
                            <span className="pc-eyebrow">Nuestros Sectores</span>
                            <h2>Áreas de Especialización</h2>
                        </div>
                        <div className="pc-bento-carousel">
                            <button
                                type="button"
                                className="pc-bento-carousel__arrow pc-bento-carousel__arrow--prev"
                                onClick={goSectorPrev}
                                aria-label="Grupo de áreas anterior"
                            >
                                <i className="ri-arrow-left-s-line" aria-hidden="true" />
                            </button>

                            <div className="pc-bento-carousel__viewport">
                                <div
                                    className="pc-bento-carousel__track"
                                    style={{ transform: `translateX(-${sectorSlide * 100}%)` }}
                                >
                                    {SECTOR_SLIDES.map((slide) => (
                                        <div key={slide.id} className="pc-bento-carousel__slide">
                                            {renderBentoGrid(slide.sectors, slide.id)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="pc-bento-carousel__arrow pc-bento-carousel__arrow--next"
                                onClick={goSectorNext}
                                aria-label="Grupo de áreas siguiente"
                            >
                                <i className="ri-arrow-right-s-line" aria-hidden="true" />
                            </button>

                            <div
                                className="pc-bento-carousel__dots"
                                role="tablist"
                                aria-label="Grupos de áreas de especialización"
                            >
                                {SECTOR_SLIDES.map((slide, index) => (
                                    <button
                                        key={slide.id}
                                        type="button"
                                        role="tab"
                                        className={`pc-bento-carousel__dot ${sectorSlide === index ? 'is-active' : ''}`}
                                        onClick={() => setSectorSlide(index)}
                                        aria-label={slide.label}
                                        aria-selected={sectorSlide === index}
                                        title={slide.label}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Intercert */}
                <section className="pc-section pc-why">
                    <div className="pc-why__blob-tr" />
                    <div className="pc-why__blob-bl" />
                    <div className="pc-container">
                        <div className="pc-section-header" style={{ maxWidth: '48rem', margin: '0 auto 5rem' }}>
                            <span className="pc-eyebrow">Autoridad de Confianza</span>
                            <h2>¿Por qué elegir Intercert?</h2>
                            <p>
                                Nuestra metodología centrada en la excelencia y resultados tangibles nos
                                posiciona como referentes globales.
                            </p>
                        </div>
                        <div className="pc-why-grid">
                            {WHY_US.map((item) => (
                                <div key={item.title} className="pc-glass-dark">
                                    <div className="pc-glass-dark__icon">
                                        <i className={item.icon} aria-hidden="true" />
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Training categories */}
                <section className="pc-section pc-categories-section" id="categorias-formacion">
                    <div className="pc-container">
                        <div className="pc-section-header">
                            <span className="pc-eyebrow">Nuestra Oferta</span>
                            <h2>Categorías de Formación</h2>
                        </div>
                        <div className="pc-categories-grid">
                            {(Object.keys(certificationPlans) as PlanKey[]).map((key) => {
                                const plan = certificationPlans[key];
                                return (
                                    <article
                                        key={key}
                                        className={`pc-category-card ${activePlan === key ? 'is-active' : ''}`}
                                        onClick={() => handlePlanSelect(key)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handlePlanSelect(key);
                                            }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={activePlan === key}
                                        aria-label={`Ver detalles de ${plan.title}`}
                                    >
                                        <div className="pc-category-card__image">
                                            <img
                                                src={PLAN_IMAGES[key]}
                                                alt={plan.title}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="pc-category-card__box">
                                            <h4 className="pc-category-card__title">{plan.title}</h4>
                                            <div className="pc-category-card__desc">
                                                <div className="pc-category-card__icon">
                                                    <i className={PLAN_ICONS[key]} aria-hidden="true" />
                                                </div>
                                                <div className="pc-category-card__desc-text">
                                                    <p>{plan.description}</p>
                                                </div>
                                            </div>
                                            <Link
                                                to={buildUrl('/contact')}
                                                className="pc-category-card__cta"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Solicitar Certificación
                                                <i className="ri-arrow-right-line" aria-hidden="true" />
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {activePlan && (
                            <div className="pc-plan-detail" ref={planDetailRef}>
                                <div className="pc-plan-detail__inner">
                                    <div className="pc-plan-detail__content">
                                        <p className="pc-plan-detail__eyebrow">Información</p>
                                        <h3>{certificationPlans[activePlan].title}</h3>
                                        <p className="pc-plan-detail__intro">
                                            Conoce todos los detalles sobre este programa de certificación
                                            profesional.
                                        </p>
                                        {ACCORDION_KEYS.map((key) => (
                                            <div key={key} className="pc-accordion-item">
                                                <button
                                                    type="button"
                                                    className={`pc-accordion-trigger ${openAccordion === key ? 'is-open' : ''}`}
                                                    onClick={() => toggleAccordion(key)}
                                                    aria-expanded={openAccordion === key}
                                                >
                                                    {accordionLabels[key]}
                                                    <i className="ri-arrow-down-s-line" aria-hidden="true" />
                                                </button>
                                                <div
                                                    className={`pc-accordion-panel ${openAccordion === key ? 'is-open' : ''}`}
                                                >
                                                    <p>{getAccordionContent(key, certificationPlans[activePlan])}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="pc-plan-detail__cta">
                                            <Link to={buildUrl('/contact')} className="pc-btn pc-btn--navy">
                                                Solicitar Información
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="pc-plan-detail__image">
                                        <img
                                            src={PLAN_IMAGES[activePlan]}
                                            alt={`${certificationPlans[activePlan].title} - Certificación Profesional`}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ISO marquee */}
                <section className="pc-iso-bar" aria-label="Normas ISO disponibles">
                    <div className="pc-container">
                        <p className="pc-iso-bar__label">Normas Internacionales</p>
                    </div>
                    <div className="pc-marquee">
                        <div className="pc-marquee__inner">
                            <div className="pc-marquee__track">
                                {marqueeItems.map((iso, i) => (
                                    <div key={`${iso.alt}-${i}`} className="pc-marquee__badge">
                                        <img src={iso.src} alt={iso.alt} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                            <div className="pc-marquee__track" aria-hidden="true">
                                {marqueeItems.map((iso, i) => (
                                    <div key={`dup-${iso.alt}-${i}`} className="pc-marquee__badge">
                                        <img src={iso.src} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured courses */}
                <section className="pc-section">
                    <div className="pc-container">
                        <div className="pc-courses-header">
                            <div>
                                <span className="pc-eyebrow">Aprendizaje Continuo</span>
                                <h2>Cursos Destacados</h2>
                            </div>
                            <Link to={buildUrl('/certificacion-iso')} className="pc-link-arrow">
                                Ver catálogo completo
                                <i className="ri-arrow-right-line" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="pc-courses-grid">
                            {FEATURED_COURSES.map((course) => (
                                <article key={course.title} className="pc-course-card">
                                    <div className="pc-course-card__img">
                                        <img src={course.image} alt={course.title} loading="lazy" />
                                        <span className="pc-course-card__tag">{course.tag}</span>
                                    </div>
                                    <div className="pc-course-card__body">
                                        <h4>{course.title}</h4>
                                        <p>{course.description}</p>
                                        <div className="pc-course-card__footer">
                                            <span className="pc-course-card__duration">
                                                <i className="ri-time-line" aria-hidden="true" />
                                                {course.duration}
                                            </span>
                                            <Link
                                                to={buildUrl('/contact')}
                                                className="pc-course-card__link"
                                            >
                                                Saber más
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="pc-final-cta">
                    <div className="pc-final-cta__box">
                        <div className="pc-final-cta__blob pc-final-cta__blob--tr" />
                        <div className="pc-final-cta__blob pc-final-cta__blob--bl" />
                        <h2>¿Listo para llevar tu carrera al siguiente nivel?</h2>
                        <p>
                            Únete a la red global de profesionales certificados por Intercert y transforma
                            tu futuro profesional hoy mismo.
                        </p>
                        <div className="pc-final-cta__actions">
                            <Link to={buildUrl('/certificacion-iso')} className="pc-btn pc-btn--teal-pill">
                                Explorar Catálogo
                            </Link>
                            <Link to={buildUrl('/contact')} className="pc-btn pc-btn--white">
                                Solicitar Asesoría
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PersonCertification;
