import { useEffect } from 'react';
import { getCurrentCountry } from '../config/countries';
import { getTestimonialsForCountry } from '../config/testimonials';

import { Link } from 'react-router-dom';

// Función para rastrear búsquedas de sectores
const trackSectorSearch = (sectorId: string) => {
    const searches = JSON.parse(localStorage.getItem('sectorSearches') || '{}') as Record<string, number>;
    searches[sectorId] = (searches[sectorId] || 0) + 1;
    localStorage.setItem('sectorSearches', JSON.stringify(searches));
};

const Services = () => {
    // Obtener país actual y testimonios correspondientes
    const currentCountry = getCurrentCountry();
    const testimonials = getTestimonialsForCountry(currentCountry.code);

    // Función para manejar clic en sector
    const handleSectorClick = (sectorId: string) => {
        trackSectorSearch(sectorId);
    };

    useEffect(() => {
        // Manejar data-background para React
        const elements = document.querySelectorAll('[data-background]');
        elements.forEach(element => {
            const backgroundImage = element.getAttribute('data-background');
            if (backgroundImage) {
                (element as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
            }
        });
    }, []);

    return (
        <>
            {/* breadcrumb-area-start */}
            <div className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative" data-background="/assets/images/slider/slider-1-1.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <h3 className="tv-breadcrumb-title">Sectores</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><Link to="/">Inicio</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>Sectores</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* breadcrumb-area-end */}

            {/* service-area-start */}
            <div className="tv-service-page-area pt-130 pb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay="0.3s">
                            <div className="single-service-item gray-bg mb-30">
                                <span className="service-icon">
                                    <i className="ri-graduation-cap-line"></i>
                                </span>
                                <h3 className="service-section-title">
                                    Sector Educativo
                                </h3>
                                <p>Certificaciones ISO especializadas para instituciones educativas, universidades y centros de formación profesional.</p>
                                <Link className="tv-normal-btn" to="/sector/educativo" onClick={() => handleSectorClick('educativo')}>Leer Más <i className="ri-arrow-right-line"></i></Link>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay="0.5s">
                            <div className="single-service-item gray-bg mb-30">
                                <span className="service-icon">
                                    <i className="ri-anchor-line"></i>
                                </span>
                                <h3 className="service-section-title">
                                    Sector Pesca
                                </h3>
                                <p>Certificaciones para empresas pesqueras, acuicultura y procesamiento de productos del mar.</p>
                                <Link className="tv-normal-btn" to="/sector/pesca" onClick={() => handleSectorClick('pesca')}>Leer Más <i className="ri-arrow-right-line"></i></Link>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay="0.7s">
                            <div className="single-service-item gray-bg mb-30">
                                <span className="service-icon">
                                    <i className="ri-building-line"></i>
                                </span>
                                <h3 className="service-section-title">
                                    Sector Construcción
                                </h3>
                                <p>Certificaciones ISO para empresas constructoras, ingeniería civil y gestión de proyectos inmobiliarios.</p>
                                <Link className="tv-normal-btn" to="/sector/construccion" onClick={() => handleSectorClick('construccion')}>Leer Más <i className="ri-arrow-right-line"></i></Link>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay="0.9s">
                            <div className="single-service-item gray-bg mb-30">
                                <span className="service-icon">
                                    <i className="ri-hospital-line"></i>
                                </span>
                                <h3 className="service-section-title">
                                    Sector Salud
                                </h3>
                                <p>Certificaciones especializadas para hospitales, clínicas, laboratorios y empresas farmacéuticas.</p>
                                <Link className="tv-normal-btn" to="/sector/salud" onClick={() => handleSectorClick('salud')}>Leer Más <i className="ri-arrow-right-line"></i></Link>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay="0.8s">
                            <div className="single-service-item gray-bg mb-30">
                                <span className="service-icon">
                                    <i className="ri-restaurant-line"></i>
                                </span>
                                <h3 className="service-section-title">
                                    Sector Alimentos y Bebidas
                                </h3>
                                <p>Certificaciones ISO para empresas alimentarias, restaurantes, procesamiento y distribución de alimentos.</p>
                                <Link className="tv-normal-btn" to="/sector/alimentos-bebidas" onClick={() => handleSectorClick('alimentos-bebidas')}>Leer Más <i className="ri-arrow-right-line"></i></Link>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay="1.0s">
                            <div className="single-service-item gray-bg mb-30">
                                <span className="service-icon">
                                    <i className="ri-plant-line"></i>
                                </span>
                                <h3 className="service-section-title">
                                    Sector Agroexportación
                                </h3>
                                <p>Certificaciones para empresas agrícolas, exportadoras y procesamiento de productos agropecuarios.</p>
                                <Link className="tv-normal-btn" to="/sector/agroexportacion">Leer Más <i className="ri-arrow-right-line"></i></Link>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay="1.1s">
                            <div className="single-service-item gray-bg mb-30">
                                <span className="service-icon">
                                    <i className="ri-leaf-line"></i>
                                </span>
                                <h3 className="service-section-title">
                                    Soluciones Sostenibles
                                </h3>
                                <p>Certificaciones ambientales y de sostenibilidad para empresas comprometidas con el medio ambiente.</p>
                                <Link className="tv-normal-btn" to="/sector/soluciones-sostenibles">Leer Más <i className="ri-arrow-right-line"></i></Link>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay="1.2s">
                            <div className="single-service-item gray-bg mb-30">
                                <span className="service-icon">
                                    <i className="ri-computer-line"></i>
                                </span>
                                <h3 className="service-section-title">
                                    Tecnologías de la Información
                                </h3>
                                <p>Certificaciones ISO para empresas de tecnología, software, telecomunicaciones y servicios digitales.</p>
                                <Link className="tv-normal-btn" to="/sector/tecnologias-informacion">Leer Más <i className="ri-arrow-right-line"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* service-area-end */}

            {/* testimonial-area-start */}
            <div className="tv-testimonial-area pt-130 pb-130" style={{ backgroundImage: 'url("/assets/images/testimonial/testi-bg-1-1.png")' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-5 col-lg-6 col">
                            <div className="testimonial-left-content">
                                <div className="tv-section-title-box mb-40">
                                    <span className="tv-section-subtitle">Testimonial</span>
                                    <h4 className="tv-section-title pb-20">Lo Que Dicen Nuestros Clientes de los Sectores</h4>
                                    <p>Cada sector tiene necesidades específicas de certificación. Podemos personalizar nuestras soluciones para cualquier industria.</p>
                                </div>
                                <div className="tv-testi-arrow-box d-flex">
                                    <div className="it-fade-anim">
                                        <button className="arrow-prev" tabIndex={0} aria-label="Previous slide">
                                            <i className="ri-arrow-left-line"></i>
                                        </button>
                                    </div>
                                    <div className="it-fade-anim">
                                        <button className="arrow-next active" tabIndex={0} aria-label="Next slide">
                                            <i className="ri-arrow-right-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-8 col-xl-7 col-lg-6 col">
                            <div className="tv-testmonial-wrap">
                                <div className="swiper tv-testi-slider-active">
                                    <div className="swiper-wrapper">
                                        {testimonials.map((testimonial, index) => (
                                            <div key={index} className="swiper-slide">
                                                <div className="single-testi-slider-item">
                                                    <div className="rating">
                                                        <i className="ri-star-fill"></i>
                                                        <i className="ri-star-fill"></i>
                                                        <i className="ri-star-fill"></i>
                                                        <i className="ri-star-fill"></i>
                                                        <i className="ri-star-fill"></i>
                                                    </div>
                                                    <p>"{testimonial.quote}"</p>
                                                    <div className="author-info d-flex align-items-center">
                                                        <img
                                                            src={testimonial.avatar}
                                                            alt={testimonial.name}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/assets/images/testimonial/testi-avatar-1.png';
                                                            }}
                                                        />
                                                        <h5>{testimonial.name}</h5>
                                                    </div>
                                                    <img src="/assets/images/testimonial/testi-shap-1.png" alt="" className="shap-icon" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* testimonial-area-end */}
        </>
    );
};

export default Services;
