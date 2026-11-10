import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
// @ts-ignore
import Slider from '../components/Slider/Slider';
import { getCurrentCountry, buildCountryUrl } from '../config/countries';
import { useBuildCountryUrl } from '../hooks/useBuildCountryUrl';
import { getTestimonialsForCountry } from '../config/testimonials';
// @ts-ignore
import { BLOG_POSTS } from '../config/blogPosts';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import { getSeoConfig } from '../config/seoConfig';
import { buildHreflangLinks } from '../utils/hreflang';
import { allCertifications } from '../data/certifications';
import { announceFormSuccess } from '../utils/formSuccess';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Sector {
    id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
    visits?: number;
    searches?: number;
    popularityScore?: number;
}


interface HomeFormData {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    taxId: string;
    message: string;
}

interface HomeFormFeedback {
    type: 'success' | 'error' | null;
    message: string;
}

interface BlogPost {
    id: string | number;
    title: string;
    category: string;
    date: string;
    image: string;
}

interface Testimonial {
    name: string;
    quote: string;
    avatar: string;
    role?: string;
}

const Home = () => {
    const navigate = useNavigate();
    const { buildUrl } = useBuildCountryUrl();
    // Estados para el formulario de contacto
    const [selectedISOs, setSelectedISOs] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
    const [homeFormData, setHomeFormData] = useState<HomeFormData>({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        taxId: '',
        message: '',
    });
    const [homeFormFeedback, setHomeFormFeedback] = useState<HomeFormFeedback>({ type: null, message: '' });
    const [homeFormSubmitting, setHomeFormSubmitting] = useState(false);
    const SHOW_TEAM_SECTION = false;

    // Opciones para el dropdown de servicios
    const serviceOptions = [
        { value: 'certificacion-inicial', label: 'Certificación Inicial' },
        { value: 'seguimiento-1', label: 'Seguimiento 1' },
        { value: 'seguimiento-2', label: 'Seguimiento 2' },
        { value: 'recertificacion', label: 'Re-certificación' }
    ];

    // Opciones para el dropdown de ISO (29 certificaciones basadas en las imágenes disponibles)
    const isoOptions = [
        { value: 'bpa', label: 'BPA - Buenas Prácticas Agrícolas' },
        { value: 'bpl-iso', label: 'BPL ISO - Buenas Prácticas de Laboratorio ISO' },
        { value: 'bpm', label: 'BPM - Buenas Prácticas de Manufactura' },
        { value: 'haccp', label: 'HACCP - Análisis de Peligros y Puntos Críticos de Control' },
        { value: 'iso10002', label: 'ISO 10002 - Gestión de la Calidad - Satisfacción del Cliente' },
        { value: 'iso13485', label: 'ISO 13485 - Sistema de Gestión de Dispositivos Médicos' },
        { value: 'iso14001', label: 'ISO 14001 - Sistema de Gestión Ambiental' },
        { value: 'iso17020', label: 'ISO 17020 - Sistema de Gestión de Organismos de Inspección' },
        { value: 'iso17021', label: 'ISO 17021 - Sistema de Gestión de Organismos de Certificación' },
        { value: 'iso17025', label: 'ISO 17025 - Sistema de Gestión de Laboratorios de Ensayo' },
        { value: 'iso20000', label: 'ISO 20000 - Sistema de Gestión de Servicios de TI' },
        { value: 'iso21001', label: 'ISO 21001 - Sistema de Gestión para Organizaciones Educativas' },
        { value: 'iso22000', label: 'ISO 22000 - Sistema de Gestión de Seguridad Alimentaria' },
        { value: 'iso22005', label: 'ISO 22005 - Trazabilidad en la Cadena Alimentaria' },
        { value: 'iso27001', label: 'ISO 27001 - Sistema de Gestión de Seguridad de la Información' },
        { value: 'iso27701', label: 'ISO 27701 - Sistema de Gestión de Privacidad de la Información' },
        { value: 'iso28000', label: 'ISO 28000 - Sistema de Gestión de Seguridad de la Cadena de Suministro' },
        { value: 'iso31000', label: 'ISO 31000 - Gestión del Riesgo' },
        { value: 'iso56002', label: 'ISO 56002 - Sistema de Gestión de la Innovación' },
        { value: 'iso90003', label: 'ISO 90003 - Aplicación de ISO 9001 al Software' },
        { value: 'iso9001', label: 'ISO 9001 - Sistema de Gestión de Calidad' },
        { value: 'iso-iec-2382', label: 'ISO/IEC 2382 - Vocabulario de Tecnología de la Información' },
        { value: 'iso-iec-29119', label: 'ISO/IEC 29119 - Ingeniería de Software y Pruebas' },
        { value: 'iso22301', label: 'ISO 22301 - Sistema de Gestión de Continuidad del Negocio' },
        { value: 'iso26000', label: 'ISO 26000 - Responsabilidad Social' },
        { value: 'iso37001', label: 'ISO 37001 - Sistema de Gestión Antisoborno' },
        { value: 'iso39001', label: 'ISO 39001 - Sistema de Gestión de Seguridad Vial' },
        { value: 'iso45001', label: 'ISO 45001 - Sistema de Gestión de Seguridad y Salud en el Trabajo' },
        { value: 'iso50001', label: 'ISO 50001 - Sistema de Gestión de la Energía' }
    ];

    const blogHighlights: BlogPost[] = BLOG_POSTS;
    const currentCountry = getCurrentCountry();
    const testimonials: Testimonial[] = getTestimonialsForCountry(currentCountry.code);

    // Funciones para manejar la selección de ISO
    const handleISOToggle = (isoValue: string) => {
        setSelectedISOs(prev =>
            prev.includes(isoValue)
                ? prev.filter(iso => iso !== isoValue)
                : [...prev, isoValue]
        );
    };

    const getDisplayText = () => {
        if (selectedISOs.length === 0) return 'Seleccionar Certificaciones ISO';
        if (selectedISOs.length === 1) {
            const iso = isoOptions.find(option => option.value === selectedISOs[0]);
            return iso ? iso.label.substring(0, 30) + '...' : 'Seleccionar Certificaciones ISO';
        }
        return `${selectedISOs.length} certificaciones seleccionadas`;
    };

    // Funciones para manejar la selección de servicios
    const handleServiceSelect = (serviceValue: string) => {
        setSelectedService(serviceValue);
        setIsServiceDropdownOpen(false);
    };

    const getServiceDisplayText = () => {
        if (!selectedService) return 'Seleccionar Servicio';
        const service = serviceOptions.find(option => option.value === selectedService);
        return service ? service.label : 'Seleccionar Servicio';
    };

    const sanitizeInput = (value: string) => {
        if (!value) return '';
        let cleaned = value.replace(/[<>]/g, '');
        cleaned = cleaned.replace(/['"`]/g, '');
        cleaned = cleaned.replace(/(--|;|\/\*|\*\/)/g, ' ');
        cleaned = cleaned.replace(/\s+/g, ' ');
        return cleaned.slice(0, 200);
    };

    const handleHomeInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const safeValue = name === 'email' ? value.trim() : sanitizeInput(value);
        setHomeFormData((prev) => ({
            ...prev,
            [name]: safeValue,
        }));
    };

    const handleHomeSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setHomeFormFeedback({ type: null, message: '' });

        if (
            !homeFormData.name.trim() ||
            !homeFormData.email.trim() ||
            !homeFormData.phone.trim() ||
            !homeFormData.businessName.trim() ||
            !homeFormData.taxId.trim() ||
            !homeFormData.message.trim()
        ) {
            setHomeFormFeedback({ type: 'error', message: 'Completa todos los campos obligatorios (incluye Razón Social y RUC).' });
            return;
        }

        setHomeFormSubmitting(true);
        try {
            const response = await fetch('/api/forms/contact/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: homeFormData.name.trim(),
                    email: homeFormData.email.trim(),
                    phone: homeFormData.phone.trim(),
                    business_name: homeFormData.businessName.trim(),
                    tax_id: homeFormData.taxId.trim(),
                    message: homeFormData.message.trim(),
                    service: selectedService,
                    isos: selectedISOs,
                    country_code: currentCountry.code,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setHomeFormData({ name: '', email: '', phone: '', businessName: '', taxId: '', message: '' });
                setSelectedISOs([]);
                setSelectedService('');
                setHomeFormFeedback({ type: null, message: '' });
                announceFormSuccess(
                    navigate,
                    buildUrl,
                    result.message || '¡Formulario enviado correctamente! Nos pondremos en contacto contigo pronto.',
                );
            } else {
                setHomeFormFeedback({
                    type: 'error',
                    message: result.error || 'No pudimos enviar tu mensaje. Inténtalo nuevamente.',
                });
            }
        } catch (error) {
            setHomeFormFeedback({
                type: 'error',
                message: 'Error de conexión. Por favor intenta más tarde.',
            });
        } finally {
            setHomeFormSubmitting(false);
        }
    };

    // Cerrar dropdowns al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as Element).closest('.home-iso-select') && !(event.target as Element).closest('.home-service-select')) {
                setIsDropdownOpen(false);
                setIsServiceDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Swiper carousels are now initialized globally in AnimationInit component
    useEffect(() => {
        // This effect is now empty as initialization is handled by AnimationInit
    }, []);

    // Algoritmo para determinar los 4 sectores más visitados
    const getTop4VisitedSectors = () => {
        // Obtener datos de visitas desde localStorage (simulando base de datos)
        const getSectorVisits = () => {
            const visits = localStorage.getItem('sectorVisits');
            return visits ? JSON.parse(visits) : {};
        };

        // Obtener datos de búsquedas desde localStorage
        const getSectorSearches = () => {
            const searches = localStorage.getItem('sectorSearches');
            return searches ? JSON.parse(searches) : {};
        };

        // Datos de sectores disponibles
        const allSectors: Sector[] = [
            {
                id: 'educativo',
                name: 'Sector Educativo',
                description: 'Certificaciones para instituciones educativas y centros de formación',
                icon: 'ri-graduation-cap-line',
                image: 'https://picsum.photos/400/300?random=101'
            },
            {
                id: 'pesca',
                name: 'Sector Pesca',
                description: 'Certificaciones para empresas pesqueras y acuicultura',
                icon: 'ri-anchor-line',
                image: 'https://picsum.photos/400/300?random=201'
            },
            {
                id: 'construccion',
                name: 'Sector Construcción',
                description: 'Certificaciones para empresas constructoras y de infraestructura',
                icon: 'ri-building-line',
                image: 'https://picsum.photos/400/300?random=301'
            },
            {
                id: 'salud',
                name: 'Sector Salud',
                description: 'Certificaciones para hospitales y centros de salud',
                icon: 'ri-hospital-line',
                image: 'https://picsum.photos/400/300?random=401'
            },
            {
                id: 'alimentos-bebidas',
                name: 'Sector Alimentos y Bebidas',
                description: 'Certificaciones para empresas alimentarias y restaurantes',
                icon: 'ri-restaurant-line',
                image: 'https://picsum.photos/400/300?random=501'
            },
            {
                id: 'agroexportacion',
                name: 'Sector Agroexportación',
                description: 'Certificaciones para empresas agrícolas y de exportación',
                icon: 'ri-plant-line',
                image: 'https://picsum.photos/400/300?random=601'
            },
            {
                id: 'soluciones-sostenibles',
                name: 'Soluciones Sostenibles',
                description: 'Certificaciones para empresas con enfoque sostenible',
                icon: 'ri-leaf-line',
                image: 'https://picsum.photos/400/300?random=701'
            },
            {
                id: 'tecnologias-informacion',
                name: 'Tecnologías de la Información',
                description: 'Certificaciones para empresas de tecnología y software',
                icon: 'ri-computer-line',
                image: 'https://picsum.photos/400/300?random=801'
            }
        ];

        const visits = getSectorVisits();
        const searches = getSectorSearches();

        // Calcular score de popularidad (visitas + búsquedas)
        const sectorsWithScore = allSectors.map(sector => {
            const visitCount = visits[sector.id] || 0;
            const searchCount = searches[sector.id] || 0;
            return {
                ...sector,
                visits: visitCount,
                searches: searchCount,
                popularityScore: visitCount + (searchCount * 0.5) // Las búsquedas valen menos que las visitas
            };
        });

        // Ordenar por score y tomar los top 4
        return sectorsWithScore
            .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
            .slice(0, 4);
    };

    const top4Sectors = getTop4VisitedSectors();

    // Algoritmo para determinar las 3 certificaciones ISO más populares
    const getTop3PopularISOs = () => {
        // Obtener vistas desde localStorage
        const views = JSON.parse(localStorage.getItem('iso_views') || '{}');

        // Mapear certificaciones con sus vistas
        const certificationsWithViews = allCertifications.map(cert => ({
            ...cert,
            views: views[cert.id] || 0
        }));

        // Ordenar por vistas (descendente) y tomar top 3
        // Si hay empate o no hay vistas, se mantiene el orden original del array
        return certificationsWithViews
            .sort((a, b) => b.views - a.views)
            .slice(0, 3);
    };

    const top3ISOs = getTop3PopularISOs();
    const country = getCurrentCountry();
    const seoConfig = getSeoConfig(country.code);

    // Configuración SEO mejorada para la página principal
    const helmet = useSeoMetadata({
        title: seoConfig.home.title,
        description: seoConfig.home.description,
        keywords: seoConfig.home.keywords,
        schema: seoConfig.schema.organization,
        hreflangs: buildHreflangLinks('/home'),
        ogType: 'website',
        robots: 'index, follow, max-image-preview:large',
    });

    return (
        <>
            {helmet}
            {/* slider-area-start */}
            <Slider />
            {/* slider-area-end */}

            {/* about-area-start */}
            <div className="tv-about-area z-index-1 p-relative pt-80 pb-130 white-bg">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-xl-5 col-lg-5">
                            <div className="tv-section-title-box">
                                <span className="tv-section-subtitle">SOBRE INTERCERT</span>
                                <h4 className="tv-section-title pb-20">Líderes en Certificaciones ISO </h4>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 text-end">
                            <div className="tv-fade-anim button" data-fade-from="top" data-ease="bounce" data-delay=".5">
                                <a className="tv-btn-secondary" href="/about">
                                    <span className="btn-wrap">
                                        <span className="btn-text1">Conoce Más</span>
                                        <span className="btn-text2">Conoce Más</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="tv-about-section mt-60">
                        <div className="row align-items-center">
                            <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s" style={{ marginBottom: '40px' }}>
                                <div className="tv-about-left">
                                    <div className="single-icon-box">
                                        <span><img src="/assets/images/about/ICON 1.png" alt="" /></span>
                                        <div className="icon-box-content">
                                            <h3>Nuestra Misión</h3>
                                            <p>Impulsamos certificación y gestión empresarial con soluciones digitales que convierten retos en crecimiento sostenible.</p>
                                        </div>
                                    </div>
                                    <div className="single-icon-box">
                                        <span><img src="/assets/images/about/ICON 2.png" alt="" /></span>
                                        <div className="icon-box-content">
                                            <h3>Nuestra Visión</h3>
                                            <p>Aplicamos la Metodología Intercert para automatizar procesos, reducir costos y aumentar resultados en cualquier sector.</p>
                                        </div>
                                    </div>
                                    <div className="single-icon-box">
                                        <span><img src="/assets/images/about/ICON 3.png" alt="" /></span>
                                        <div className="icon-box-content">
                                            <h3>Nuestros Logros</h3>
                                            <p>+50.000 empresas certificadas, +17 años de experiencia y organismo acreditado internacionalmente.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s" style={{ marginBottom: '20px' }}>
                                <div className="tv-about-middle">
                                    <img src="/assets/images/home/home-certificacion_iso_peru.webp" alt="Certificación ISO Perú" style={{ borderRadius: '28px 0px 28px 0px', width: '100%', height: 'auto' }} />
                                    <p>Fortalecemos organizaciones y equipos con certificaciones ISO y formación que genera impacto global.</p>
                                </div>
                            </div>
                            <div className="col-xl-4 d-xxl-block d-xl-block d-none col-md-6 col-sm-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                                <div className="tv-about-right" style={{ width: '100%' }}>
                                    <img src="/assets/images/home/DSC00825.JPG" alt="" style={{ borderRadius: '28px 0px 28px 0px', width: '100%', height: 'auto' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* about-area-end */}

            {/* Service-area-start */}
            <div className="tv-service-area gray-bg pt-130 pb-130">
                <div className="container">
                    <div className="row  justify-content-center">
                        <div className="col-12 text-center">
                            <div className="tv-section-title-box mb-60">
                                <span className="tv-section-subtitle">SECTORES</span>
                                <h4 className="tv-section-title pb-20">Descubre los sectores y sus certificaciones especializadas.</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-4">
                        {top4Sectors.map((sector, index) => (
                            <div key={sector.id} className="col-xl-3 col-lg-3 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay={`${0.3 + (index * 0.2)}s`} style={{ marginBottom: '40px' }}>
                                <div className="single-service-item mb-50" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <span className="service-icon" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '80px',
                                        height: '80px',
                                        margin: '0 auto 20px auto',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '50%',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <i className={sector.icon} style={{ fontSize: '32px', color: '#159dbc', zIndex: '2', position: 'relative' }}></i>
                                    </span>
                                    <h3 className="service-section-title" style={{ textAlign: 'center', marginBottom: '15px' }}>{sector.name}</h3>
                                    <p style={{ textAlign: 'center', flexGrow: '1', marginBottom: '20px' }}>{sector.description}</p>
                                    <div style={{ marginTop: 'auto' }}>
                                        <Link className="tv-normal-btn" to={`/sector/${sector.id}`}>Leer Más <i className="ri-arrow-right-line"></i></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-12 text-center mt-30">
                            <div className="tv-fade-anim" data-fade-from="top" data-ease="bounce" data-delay=".5">
                                <Link className="tv-btn-primary" to="/services">
                                    <span className="btn-wrap">
                                        <span className="btn-text1">Ver Todos los Sectores</span>
                                        <span className="btn-text2">Ver Todos los Sectores</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service-area-end */}

            {/* Certificaciones ISO Section */}
            <div className="tv-project-area pt-130 pb-130">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="tv-section-title-box mb-60">
                                <span className="tv-section-subtitle">CERTIFICACIONES ISO</span>
                                <h4 className="tv-section-title pb-20">Soluciones de Certificación que Impulsan la Excelencia Empresarial</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-4">
                        {top3ISOs.map((certification, index) => (
                            <div key={certification.id} className="col-lg-4 col-xl-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay={`${0.3 + (index * 0.2)}s`} style={{ marginBottom: '40px' }}>
                                <div className="single-project-item mb-50">
                                    <img
                                        src={`/assets/images/ISOS/${certification.image}`}
                                        alt={certification.name}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="icon">
                                        <Link to={buildCountryUrl(`/certificacion-iso/${certification.slug}`)}>
                                            <i className="ri-arrow-right-line"></i>
                                        </Link>
                                    </span>
                                    <div className="single-project-content">
                                        <h3>{certification.name}</h3>
                                        <div className="project-cat">
                                            <span>{certification.description}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-12 text-center mt-30">
                            <div className="tv-fade-anim" data-fade-from="top" data-ease="bounce" data-delay=".5">
                                <Link className="tv-btn-primary" to={buildCountryUrl('/certificacion-iso')}>
                                    <span className="btn-wrap">
                                        <span className="btn-text1">Ver Todas las Certificaciones</span>
                                        <span className="btn-text2">Ver Todas las Certificaciones</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Certificaciones ISO Section-end */}


            {/* Team Section */}
            {SHOW_TEAM_SECTION && (
                <div className="tv-team-area pt-130 pb-130 section-bg footer-bg" style={{ backgroundImage: 'url(/assets/images/team/team-bg.png)' }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-5 col-lg-5 col-12">
                                <div className="tv-team-slider-area">
                                    <div className="swiper tv-team-slide-active">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="single-team-item">
                                                    <img src="/assets/images/team/team-1-1.png" alt="" />
                                                    <div className="team-social">
                                                        <a href="https://facebook.com/rosy.gaggero" target="_blank" rel="noopener noreferrer"><i className="ri-facebook-fill"></i></a>
                                                        <a href="https://linkedin.com/in/rosy-gaggero" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-fill"></i></a>
                                                        <a href="https://twitter.com/rosygaggero" target="_blank" rel="noopener noreferrer"><i className="ri-twitter-fill"></i></a>
                                                        <a href="https://instagram.com/rosy.gaggero" target="_blank" rel="noopener noreferrer"><i className="ri-instagram-fill"></i></a>
                                                    </div>
                                                    <div className="team-content d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h2 className="team-name"><a href="/team-details">Rosy Gaggero</a></h2>
                                                            <p className="designation">Web Developer</p>
                                                        </div>
                                                        <div>
                                                            <div className="round-shape">-</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="single-team-item">
                                                    <img src="/assets/images/team/team-1-2.png" alt="" />
                                                    <div className="team-social">
                                                        <a href="https://facebook.com/sarah.johnson" target="_blank" rel="noopener noreferrer"><i className="ri-facebook-fill"></i></a>
                                                        <a href="https://linkedin.com/in/sarah-johnson-dev" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-fill"></i></a>
                                                        <a href="https://twitter.com/sarahjohnson" target="_blank" rel="noopener noreferrer"><i className="ri-twitter-fill"></i></a>
                                                        <a href="https://instagram.com/sarah.johnson" target="_blank" rel="noopener noreferrer"><i className="ri-instagram-fill"></i></a>
                                                    </div>
                                                    <div className="team-content d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h2 className="team-name"><a href="/team-details">Sarah Johnson</a></h2>
                                                            <p className="designation">UI/UX Designer</p>
                                                        </div>
                                                        <div>
                                                            <div className="round-shape">-</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="single-team-item">
                                                    <img src="/assets/images/team/team-1-3.png" alt="" />
                                                    <div className="team-social">
                                                        <a href="https://facebook.com/mike.chen" target="_blank" rel="noopener noreferrer"><i className="ri-facebook-fill"></i></a>
                                                        <a href="https://linkedin.com/in/mike-chen-dev" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-fill"></i></a>
                                                        <a href="https://twitter.com/mikechen" target="_blank" rel="noopener noreferrer"><i className="ri-twitter-fill"></i></a>
                                                        <a href="https://instagram.com/mike.chen" target="_blank" rel="noopener noreferrer"><i className="ri-instagram-fill"></i></a>
                                                    </div>
                                                    <div className="team-content d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h2 className="team-name"><a href="/team-details">Mike Chen</a></h2>
                                                            <p className="designation">Full Stack Developer</p>
                                                        </div>
                                                        <div>
                                                            <div className="round-shape">-</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7 col-12 order-md-0">
                                <div className="tv-team-right-area">
                                    <div className="tv-section-title-box mb-40">
                                        <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">Our Team Members</span>
                                        <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">Our Team is Ready To Help.</h4>
                                        <p>It is a long established fact that a reader will be distracted the readable content of a page when looking.</p>
                                    </div>
                                    <div className="tv-team-arrow-box d-flex justify-content-md-end">
                                        <div>
                                            <div className="it-fade-anim" data-fade-from="top" data-ease="bounce" data-delay=".7">
                                                <button className="arrow-next mb-25" tabIndex={0} aria-label="Next slide">
                                                    <i className="ri-arrow-left-line"></i>
                                                </button>
                                            </div>
                                            <div className="it-fade-anim" data-fade-from="top" data-ease="bounce" data-delay=".5">
                                                <button className="arrow-prev active" tabIndex={0} aria-label="Previous slide">
                                                    <i className="ri-arrow-right-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tv-team-pagination d-flex swiper-pagination-clickable swiper-pagination-bullets">
                                        <span className="swiper-pagination-bullet" tabIndex={0}>
                                            <img src="/assets/images/team/team-1-1.png" alt="Thumb 1" />
                                        </span>
                                        <span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabIndex={0}>
                                            <img src="/assets/images/team/team-1-2.png" alt="Thumb 2" />
                                        </span>
                                        <span className="swiper-pagination-bullet" tabIndex={0}>
                                            <img src="/assets/images/team/team-1-3.png" alt="Thumb 3" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Process Section */}
            <div className="tv-process-area pt-130 pb-130">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 text-center">
                            <div className="tv-section-title-box mb-60">
                                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">NUESTRO PROCESO DE CERTIFICACION</span>
                                <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">Los pasos para obtener su certificado ISO</h4>
                            </div>
                        </div>

                        <div className="tv-process-box-area">
                            <div className="row p-relative gy-4">
                                <div className="shap">
                                    <img src="/assets/images/icons/line-shap.png" alt="" />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s" style={{ marginBottom: '40px' }}>
                                    <div className="single-process-box">
                                        <img
                                            src="/assets/images/home/diagnostico inicial.png"
                                            alt="Diagnóstico inicial"
                                            style={{ display: 'block', width: '100%', height: '220px', objectFit: 'cover', marginBottom: '16px' }}
                                        />
                                        <div className="process-box-content">
                                            <span>PASO - 01</span>
                                            <h2>Diagnostico Inicial</h2>
                                            <p>Se analiza la informacion del sistema de gestion del cliente.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s" style={{ marginBottom: '40px' }}>
                                    <div className="single-process-box">
                                        <img
                                            src="/assets/images/home/auditoria y certificacion.png"
                                            alt="Auditoría y certificación"
                                            style={{ display: 'block', width: '100%', height: '220px', objectFit: 'cover', marginBottom: '16px' }}
                                        />
                                        <div className="process-box-content">
                                            <span>PASO - 02</span>
                                            <h2>Auditoria y Certificacion</h2>
                                            <p>Se realiza en dos bases: revision y verificacion del cumplimiento de sistema de gestion.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s" style={{ marginBottom: '40px' }}>
                                    <div className="single-process-box">
                                        <img
                                            src="/assets/images/home/emision y certificacion.png"
                                            alt="Emisión del certificado"
                                            style={{ display: 'block', width: '100%', height: '220px', objectFit: 'cover', marginBottom: '16px' }}
                                        />
                                        <div className="process-box-content">
                                            <span>PASO - 03</span>
                                            <h2>Emision del Certificado</h2>
                                            <p>Una vez superada la auditoria, se emite el certificado acreditado validando el cumplimiento de los requisitos de la norma ISO.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="tv-cta-area pt-150" style={{ backgroundImage: 'url(/assets/images/cta/cta-bg-1-1.png)' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xxl-4 col-xl-4 col-lg-3 col-md-3">
                            <div className="video-play-btn-area p-relative">
                                <div className="tv-video-icon">
                                    <a href="https://www.youtube.com/embed/oKLCN0ZU1GY?autoplay=1" className="popup-video ripple-white">
                                        <span>
                                            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.9005 10.6854C21.2395 11.4541 21.2395 13.3857 19.9005 14.1544L3.23761 23.7201C1.90428 24.4856 0.241875 23.523 0.241875 21.9856L0.241875 2.85419C0.241875 1.31677 1.90428 0.354247 3.23761 1.11968L19.9005 10.6854Z" fill="#fff"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-8 col-xl-8 col-lg-9 col-md-9 p-relative">
                            <div className="cta-form">
                                <h2>Solicitar Cotización</h2>
                                <p>Completa el formulario y nos pondremos en contacto contigo</p>
                                <div className="tv-contact-wrap">
                                    <form onSubmit={handleHomeSubmit}>
                                        <div className="row">
                                            {/* Columna Izquierda */}
                                            <div className="col-md-6">
                                                <div className="it-contact-input-box mb-20">
                                                    <label className="form-label">Nombre Completo *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={homeFormData.name}
                                                        onChange={handleHomeInputChange}
                                                        placeholder="Ingresa tu nombre completo"
                                                        autoCapitalize="off"
                                                        autoComplete="name"
                                                        required
                                                    />
                                                </div>
                                                <div className="it-contact-input-box mb-20">
                                                    <label className="form-label">Correo Electrónico *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={homeFormData.email}
                                                        onChange={handleHomeInputChange}
                                                        placeholder="ejemplo@correo.com"
                                                        autoCapitalize="off"
                                                        autoComplete="email"
                                                        required
                                                    />
                                                </div>
                                                <div className="it-contact-input-box mb-20">
                                                    <label className="form-label">Teléfono *</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={homeFormData.phone}
                                                        onChange={handleHomeInputChange}
                                                        placeholder="+51 999 999 999"
                                                        autoCapitalize="off"
                                                        autoComplete="tel"
                                                        required
                                                    />
                                                </div>
                                                <div className="it-contact-input-box mb-20">
                                                    <label className="form-label">Tipo de Servicio *</label>
                                                    <div className="home-service-select" style={{ position: 'relative', width: '100%' }}>
                                                        <div
                                                            className={`nice-select custom-dropdown ${isServiceDropdownOpen ? 'open' : ''}`}
                                                            onClick={() => {
                                                                setIsServiceDropdownOpen(!isServiceDropdownOpen);
                                                            }}
                                                        >
                                                            <span className="current">
                                                                {getServiceDisplayText()}
                                                            </span>
                                                        </div>

                                                        {isServiceDropdownOpen && (
                                                            <div className="dropdown-list">
                                                                {serviceOptions.map((option) => {
                                                                    return (
                                                                        <div
                                                                            key={option.value}
                                                                            className={`dropdown-option ${selectedService === option.value ? 'selected' : ''}`}
                                                                            onClick={() => handleServiceSelect(option.value)}
                                                                        >
                                                                            {option.label}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Columna Derecha */}
                                            <div className="col-md-6">
                                                <div className="it-contact-input-box mb-20">
                                                    <label className="form-label">Razón Social *</label>
                                                    <input
                                                        type="text"
                                                        name="businessName"
                                                        value={homeFormData.businessName}
                                                        onChange={handleHomeInputChange}
                                                        placeholder="Nombre legal de la empresa"
                                                        autoCapitalize="off"
                                                        autoComplete="organization"
                                                        required
                                                    />
                                                </div>
                                                <div className="it-contact-input-box mb-20">
                                                    <label className="form-label">RUC / RFC / NIT *</label>
                                                    <input
                                                        type="text"
                                                        name="taxId"
                                                        value={homeFormData.taxId}
                                                        onChange={handleHomeInputChange}
                                                        placeholder="Identificador tributario"
                                                        autoCapitalize="off"
                                                        autoComplete="off"
                                                        required
                                                    />
                                                </div>
                                                <div className="it-contact-input-box mb-20">
                                                    <label className="form-label">Certificaciones ISO de Interés</label>
                                                    <div className="home-iso-select" style={{ position: 'relative', width: '100%' }}>
                                                        <div
                                                            className={`nice-select custom-dropdown ${isDropdownOpen ? 'open' : ''}`}
                                                            onClick={() => {
                                                                setIsDropdownOpen(!isDropdownOpen);
                                                            }}
                                                        >
                                                            <span className="current">
                                                                {getDisplayText()}
                                                            </span>
                                                        </div>

                                                        {isDropdownOpen && (
                                                            <div className="dropdown-list">
                                                                {isoOptions.map((option) => {
                                                                    return (
                                                                        <div
                                                                            key={option.value}
                                                                            className={`dropdown-option ${selectedISOs.includes(option.value) ? 'selected' : ''}`}
                                                                            onClick={() => {
                                                                                handleISOToggle(option.value);
                                                                            }}
                                                                        >
                                                                            {option.label}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="it-contact-input-box mb-20">
                                                    <label className="form-label">Mensaje *</label>
                                                    <textarea
                                                        name="message"
                                                        rows={4}
                                                        placeholder="Cuéntanos sobre tu proyecto o certificación de interés"
                                                        value={homeFormData.message}
                                                        onChange={handleHomeInputChange}
                                                        autoCapitalize="off"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {homeFormFeedback.message && (
                                            <div
                                                className={`mb-3 ${homeFormFeedback.type === 'error' ? 'text-danger' : 'text-success'}`}
                                            >
                                                {homeFormFeedback.message}
                                            </div>
                                        )}
                                        <div className="it-contact-sumbit-box cta">
                                            <button
                                                type="submit"
                                                className="tv-btn-secondary p-relative"
                                                disabled={homeFormSubmitting}
                                            >
                                                <span className="btn-wrap">
                                                    <span className="btn-text1">{homeFormSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                                                    <span className="btn-text2">{homeFormSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Area */}
            <div className="tv-pricing-area pt-228 pb-130">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 text-center">
                            <div className="tv-section-title-box mb-60">
                                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">CERTIFICACIONES DE PERSONAS</span>
                                <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">Planes de Certificación de Personas</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-4">
                        <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s" style={{ marginBottom: '40px' }}>
                            <div className="single-price-box mb-50 active" style={{ cursor: 'pointer', marginRight: '15px', marginLeft: '15px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <h4 className="price-package text-center" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Interpretación de la Norma</h4>
                                <ul style={{ flexGrow: 1 }}>
                                    <li><i className="ri-check-line"></i> Comprensión profunda de los requisitos de la norma</li>
                                    <li><i className="ri-check-line"></i> Capacidad para implementar la norma en su organización</li>
                                    <li><i className="ri-check-line"></i> Conocimiento de las mejores prácticas internacionales</li>
                                    <li><i className="ri-check-line"></i> Mejora de la eficiencia en los procesos de implementación</li>
                                    <li><i className="ri-check-line"></i> Base sólida para avanzar hacia certificaciones de auditor</li>
                                </ul>
                                <div className="price-box-btn">
                                    <Link to={buildUrl('/contact')} className="tv-btn-primary p-relative">
                                        <span className="btn-wrap">
                                            <span className="btn-text1">Solicitar Certificación</span>
                                            <span className="btn-text2">Solicitar Certificación</span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s" style={{ marginBottom: '40px' }}>
                            <div className="single-price-box mb-50" style={{ cursor: 'pointer', marginRight: '15px', marginLeft: '15px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <h4 className="price-package text-center" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Auditor Interno</h4>
                                <ul style={{ flexGrow: 1 }}>
                                    <li><i className="ri-check-line"></i> Capacidad para realizar auditorías internas completas</li>
                                    <li><i className="ri-check-line"></i> Identificación de no conformidades y oportunidades de mejora</li>
                                    <li><i className="ri-check-line"></i> Contribución a la mejora continua de la organización</li>
                                    <li><i className="ri-check-line"></i> Preparación para auditorías externas de certificación</li>
                                    <li><i className="ri-check-line"></i> Desarrollo de habilidades de comunicación y análisis</li>
                                </ul>
                                <div className="price-box-btn">
                                    <Link to={buildUrl('/contact')} className="tv-btn-primary p-relative">
                                        <span className="btn-wrap">
                                            <span className="btn-text1">Solicitar Certificación</span>
                                            <span className="btn-text2">Solicitar Certificación</span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s" style={{ marginBottom: '40px' }}>
                            <div className="single-price-box mb-50" style={{ cursor: 'pointer', marginRight: '15px', marginLeft: '15px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <h4 className="price-package text-center" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Auditor Líder</h4>
                                <ul style={{ flexGrow: 1 }}>
                                    <li><i className="ri-check-line"></i> Capacidad para liderar equipos de auditoría</li>
                                    <li><i className="ri-check-line"></i> Gestión eficaz de programas de auditoría</li>
                                    <li><i className="ri-check-line"></i> Evaluación integral de sistemas de gestión</li>
                                    <li><i className="ri-check-line"></i> Reconocimiento profesional internacional</li>
                                    <li><i className="ri-check-line"></i> Oportunidades de carrera como auditor certificado</li>
                                </ul>
                                <div className="price-box-btn">
                                    <Link to={buildUrl('/contact')} className="tv-btn-primary p-relative">
                                        <span className="btn-wrap">
                                            <span className="btn-text1">Solicitar Certificación</span>
                                            <span className="btn-text2">Solicitar Certificación</span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Counter Area */}
            <div className="tv-counter-area pb-130">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-3 col-xl-3 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                            <div className="single-couter-wrap mt-60 d-flex align-items-center justify-content-center">
                                <div className="inner">
                                    <h5>
                                        <span>+</span>
                                        <span
                                            className="purecounter"
                                            data-purecounter-duration="0"
                                            data-purecounter-end="17"
                                        >
                                            17
                                        </span>
                                    </h5>
                                    <h6>Años de Experiencia</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xl-3 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s">
                            <div className="single-couter-wrap d-flex align-items-center justify-content-center">
                                <div className="inner">
                                    <h5>
                                        <span>+</span>
                                        <span
                                            className="purecounter"
                                            data-purecounter-duration="0"
                                            data-purecounter-end="50"
                                        >
                                            50
                                        </span>
                                        <span>K</span>
                                    </h5>
                                    <h6>Empresas Certificadas</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xl-3 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s">
                            <div className="single-couter-wrap mt-60 d-flex align-items-center justify-content-center">
                                <div className="inner">
                                    <h5>
                                        <span>+</span>
                                        <span
                                            className="purecounter"
                                            data-purecounter-duration="0"
                                            data-purecounter-end="27"
                                        >
                                            27
                                        </span>
                                        <span>K</span>
                                    </h5>
                                    <h6>Certificados Emitidos</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xl-3 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".9s">
                            <div className="single-couter-wrap d-flex align-items-center justify-content-center">
                                <div className="inner">
                                    <h5>
                                        <span>+</span>
                                        <span
                                            className="purecounter"
                                            data-purecounter-duration="0"
                                            data-purecounter-end="19"
                                        >
                                            19
                                        </span>
                                        <span>K</span>
                                    </h5>
                                    <h6>Profesionales Formados y Capacitados </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonial Area */}
            <div className="tv-testimonial-area pt-130 pb-130" style={{ backgroundImage: 'url(/assets/images/testimonial/testi-bg-1-1.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-5 col-lg-6 col">
                            <div className="testimonial-left-content">
                                <div className="tv-section-title-box mb-40">
                                    <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">TESTIMONIOS</span>
                                    <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">Los que nuestros clientes dicen de nosotros</h4>
                                    <p>Nuestros clientes destacan la claridad del proceso, el acompañamiento experto y la velocidad con la que alcanzan su certificación.</p>
                                </div>
                                <div className="tv-testi-arrow-box d-flex">
                                    <div className="it-fade-anim">
                                        <button className="testi-arrow-prev" tabIndex={0} aria-label="Slide anterior">
                                            <i className="ri-arrow-left-line"></i>
                                        </button>
                                    </div>
                                    <div className="it-fade-anim">
                                        <button className="testi-arrow-next" tabIndex={0} aria-label="Slide siguiente">
                                            <i className="ri-arrow-right-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-8 col-xl-7 col-lg-6 col">
                            <div className="tv-testmonial-wrap">
                                <Swiper
                                    className="tv-testi-slider-active swiper"
                                    modules={[Navigation, Autoplay, Pagination]}
                                    speed={1000}
                                    loop={true}
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    autoplay={{
                                        delay: 4500,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={{
                                        prevEl: '.testi-arrow-prev',
                                        nextEl: '.testi-arrow-next',
                                    }}
                                    pagination={{
                                        el: '.tv-testmonial-wrap .swiper-pagination',
                                        clickable: true,
                                    }}
                                >
                                    {testimonials.map((testimonial, index) => (
                                        <SwiperSlide key={`${testimonial.name}-${index}`}>
                                            <div className="single-testi-slider-item">
                                                <div className="rating">
                                                    <i className="ri-star-fill"></i>
                                                    <i className="ri-star-fill"></i>
                                                    <i className="ri-star-fill"></i>
                                                    <i className="ri-star-fill"></i>
                                                    <i className="ri-star-fill"></i>
                                                </div>
                                                <p>“{testimonial.quote}”</p>
                                                <div className="author-info d-flex align-items-center">
                                                    <img src={testimonial.avatar} alt={testimonial.name} />
                                                    <h5>{testimonial.name}</h5>
                                                </div>
                                                <img src="/assets/images/testimonial/testi-shap-1.png" alt="" className="shap-icon" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    <div className="swiper-pagination"></div>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Area */}
            <div className="tv-blog-area pt-130 pb-130">
                <div className="container">
                    <div className="row align   -items-end">
                        <div className="col-xl-6 col-lg-6">
                            <div className="tv-section-title-box">
                                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">BLOGS</span>
                                <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">Blogs Recientes y Artículos sobre Certificaciones ISO</h4>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 text-end">
                            <div className="tv-fade-anim button" data-fade-from="top" data-ease="bounce" data-delay=".5">
                                <Link className="tv-btn-primary p-relative" to={buildCountryUrl('/blog')}>
                                    <span className="btn-wrap">
                                        <span className="btn-text1">Ver Todos los Blogs</span>
                                        <span className="btn-text2">Ver Todos los Blogs</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="tv-blog-wrap mt-60">
                        <div className="row gy-4">
                            {blogHighlights.map((post, index) => {
                                const delay = (0.3 + index * 0.2).toFixed(1);
                                return (
                                    <div
                                        key={`home-blog-${post.id}`}
                                        className={`${index === 0 ? 'col-lg-6 col-xl-6' : 'col-lg-6 col-xl-3'
                                            } col-md-6 wow itfadeUp`}
                                        data-wow-duration=".9s"
                                        data-wow-delay={`${delay}s`}
                                        style={{ marginBottom: '40px' }}
                                    >
                                        <div className={`single-blog-item ${index === 0 ? 'first' : ''} mb-50`}>
                                            <img src={post.image} alt={post.title} className="blog-image-angled" />
                                            <div className="blog-content mt-30">
                                                <div className="blog-meta">
                                                    <span className="author">{post.category}</span>
                                                    <span className="date">{post.date}</span>
                                                </div>
                                                <h2>
                                                    <Link to={buildCountryUrl(`/blog/${post.id}`)}>
                                                        {post.title}
                                                    </Link>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
