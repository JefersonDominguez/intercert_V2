import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { getCurrentCountry } from '../config/countries';
import { useBuildCountryUrl } from '../hooks/useBuildCountryUrl';
import { getTestimonialsForCountry } from '../config/testimonials';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './About.css';

declare global {
    interface Window {
        Swiper: any;
    }
}

interface Testimonial {
    name: string;
    quote: string;
    avatar: string;
    role?: string;
}

/** Coloca la imagen en: frontend/public/assets/images/about/nueva-imagen-nosotros.jpg */
const ABOUT_BREADCRUMB_BG = '/assets/images/about/nueva-imagen-nosotros.jpg';

/** Coloca tu video en: frontend/public/assets/images/about/sobre-nosotros.mp4 */
const ABOUT_VIDEO_SRC = '/assets/images/about/sobre-nosotros.mp4';

const About = () => {
    const { buildUrl } = useBuildCountryUrl();
    const currentCountry = getCurrentCountry();
    const testimonials: Testimonial[] = useMemo(() =>
        getTestimonialsForCountry(currentCountry.code),
        [currentCountry.code]
    );
    const SHOW_TEAM_SECTION = false;

    return (
        <>
            {/* breadcrumb-area-start */}
            <div className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb about-page-breadcrumb z-index-1 fix p-relative">
                <img
                    src={ABOUT_BREADCRUMB_BG}
                    alt=""
                    className="about-page-breadcrumb__bg"
                    loading="eager"
                    aria-hidden="true"
                />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <h3 className="tv-breadcrumb-title tv-spltv-text tv-spltv-in-right">Sobre Nosotros</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><a href="/" data-discover="true">Inicio</a></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>Sobre Nosotros</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* breadcrumb-area-end */}

            {/* about-area-start */}
            <div className="tv-about-area z-index-1 p-relative pt-90 pb-90 white-bg">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-xl-5 col-lg-5">
                            <div className="tv-section-title-box">
                                <span className="tv-section-subtitle">SOBRE INTERCERT</span>
                                <h4 className="tv-section-title pb-20">Líderes en Certificaciones ISO en Latinoamérica</h4>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 text-end">
                            <div className="tv-fade-anim button" data-fade-from="top" data-ease="bounce" data-delay=".5">
                                <Link className="tv-btn-secondary" to={buildUrl('/contact')}>
                                    <span className="btn-wrap">
                                        <span className="btn-text1">Contáctanos</span>
                                        <span className="btn-text2">Contáctanos</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="tv-about-section mt-60">
                        <div className="row align-items-center">
                            <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                                <div className="tv-about-left">
                                    <div className="single-icon-box">
                                        <span><img src="/assets/images/about/ICON 1.png" alt="" loading="lazy" /></span>
                                        <div className="icon-box-content">
                                            <h3>Nuestra Misión</h3>
                                            <p>Brindamos soluciones digitales de certificación y gestión empresarial que convierten desafíos en oportunidades.</p>
                                        </div>
                                    </div>
                                    <div className="single-icon-box">
                                        <span><img src="/assets/images/about/ICON 2.png" alt="" loading="lazy" /></span>
                                        <div className="icon-box-content">
                                            <h3>Nuestra Visión</h3>
                                            <p>Aplicamos la Metodología Intercert para automatizar procesos, reducir costos y potenciar resultados en cada sector.</p>
                                        </div>
                                    </div>
                                    <div className="single-icon-box">
                                        <span><img src="/assets/images/about/ICON 3.png" alt="" loading="lazy" /></span>
                                        <div className="icon-box-content">
                                            <h3>Nuestros Logros</h3>
                                            <p>5.000+ empresas certificadas, 17+ años de experiencia y organismo acreditado internacionalmente.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s">
                                <div className="tv-about-middle" style={{ borderRadius: '20px 0px 20px 0px' }}>
                                    <img src="/assets/images/about/ferm.png" alt="" loading="lazy" />
                                    <p>Impulsamos rentabilidad y talento con certificaciones ISO y formación que genera resultados sostenibles.</p>
                                </div>
                            </div>
                            <div className="col-xl-4 d-xxl-block d-xl-block d-none col-md-6 col-sm-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s">
                                <div className="tv-about-right">
                                    <video
                                        className="tv-about-video"
                                        src={ABOUT_VIDEO_SRC}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                        preload="metadata"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* about-area-end */}

            {/* why-choose-area-start */}
            <div className="tv-why-choose-area pt-130 pb-130 gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-xl-6">
                            <div className="tv-why-choose-left">
                                <img className="wow img-anim-left rounded-32-0" src="/assets/images/about/2.png" alt="" loading="lazy" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="tv-why-choose-right">
                                <div className="tv-section-title-box">
                                    <span className="tv-section-subtitle">POR QUÉ ELEGIRNOS</span>
                                    <h4 className="tv-section-title">Soluciones Diseñadas para Impulsar Resultados</h4>
                                    <p>Nuestra metodología probada y equipo de expertos certificados garantizan procesos eficientes y resultados excepcionales para tu organización.</p>
                                </div>
                                <img src="/assets/images/about/+17.png" alt="" loading="lazy" />
                                <img src="/assets/images/about/adn.jpg" alt="" className="abs wow img-anim-left" loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="tv-why-choose-icon-area mt-30">
                        <div className="row">
                            <div className="col-xxl-3 col-xl-4 col-lg-4 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                                <div className="single-icon-box2 d-flex align-items-center">
                                    <div className="icon">
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="ri-medal-line" style={{ fontSize: '40px', color: '#0A165E' }}></i>
                                        </span>
                                    </div>
                                    <div className="content">
                                        <h5>Experiencia Comprobada</h5>
                                        <p>17+ años certificando empresas exitosamente</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-4 col-lg-4 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".5s">
                                <div className="single-icon-box2 d-flex align-items-center">
                                    <div className="icon">
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="ri-settings-4-line" style={{ fontSize: '40px', color: '#0A165E' }}></i>
                                        </span>
                                    </div>
                                    <div className="content">
                                        <h5>Metodología Innovadora</h5>
                                        <p>Procesos optimizados para máxima eficiencia</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-4 col-lg-4 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s">
                                <div className="single-icon-box2 d-flex align-items-center">
                                    <div className="icon">
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="ri-user-star-line" style={{ fontSize: '40px', color: '#0A165E' }}></i>
                                        </span>
                                    </div>
                                    <div className="content">
                                        <h5>Equipo Certificado</h5>
                                        <p>Auditores con certificaciones internacionales</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-xl-4 col-lg-4 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".9s">
                                <div className="single-icon-box2 d-flex align-items-center">
                                    <div className="icon">
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="ri-customer-service-2-line" style={{ fontSize: '40px', color: '#0A165E' }}></i>
                                        </span>
                                    </div>
                                    <div className="content">
                                        <h5>Soporte Continuo</h5>
                                        <p>Acompañamiento durante todo el proceso</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* why-choose-area-end */}

            {/* counter-area-start */}
            <div className="tv-counter-area pb-130">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-3 col-xl-3 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                            <div className="single-couter-wrap mt-60 d-flex align-items-center justify-content-center">
                                <div className="inner">
                                    <h5>
                                        <span>+</span>
                                        <span className="purecounter" data-purecounter-duration="0" data-purecounter-end="17">17</span>
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
                                        <span className="purecounter" data-purecounter-duration="0" data-purecounter-end="98">98</span>
                                        <span>%</span>
                                    </h5>
                                    <h6>Tasa de Éxito</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xl-3 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".7s">
                            <div className="single-couter-wrap mt-60 d-flex align-items-center justify-content-center">
                                <div className="inner">
                                    <h5>
                                        <span>+</span>
                                        <span className="purecounter" data-purecounter-duration="0" data-purecounter-end="50">50</span>
                                        <span>k</span>
                                    </h5>
                                    <h6>Empresas Certificadas</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xl-3 col-md-6 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".9s">
                            <div className="single-couter-wrap d-flex align-items-center justify-content-center">
                                <div className="inner">
                                    <h5>
                                        <span>+</span>
                                        <span className="purecounter" data-purecounter-duration="0" data-purecounter-end="29">29</span>
                                    </h5>
                                    <h6>Certificaciones ISO</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* counter-area-end */}

            {/* team-area-start */}
            {SHOW_TEAM_SECTION && (
                <div className="tv-team-area pt-130 pb-130 section-bg footer-bg" style={{ backgroundImage: 'url(/assets/images/team/team-bg.png)' }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-5 col-lg-5 col-12 order-md-1">
                                <div className="tv-team-slider-area">
                                    <Swiper
                                        className="tv-team-slide-active swiper"
                                        modules={[Navigation, Autoplay, Pagination]}
                                        slidesPerView={1}
                                        spaceBetween={35}
                                        loop={true}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                        navigation={{
                                            nextEl: '.tv-team-arrow-box .arrow-next',
                                            prevEl: '.tv-team-arrow-box .arrow-prev',
                                        }}
                                        pagination={{
                                            el: '.tv-team-pagination',
                                            clickable: true,
                                            renderBullet: function (index, className) {
                                                const images = [
                                                    '/assets/images/about/team-1-1.png',
                                                    '/assets/images/about/team-1-2.png',
                                                    '/assets/images/about/team-1-3.png'
                                                ];
                                                return `<span class="${className}"><img src="${images[index]}" alt="Thumb ${index + 1}"></span>`;
                                            },
                                        }}
                                    >
                                        <SwiperSlide>
                                            <div className="single-team-item">
                                                <img src="/assets/images/about/team-1-1.png" alt="" />
                                                <div className="team-social">
                                                    <a href="#"><i className="ri-facebook-fill"></i></a>
                                                    <a href="#"><i className="ri-linkedin-fill"></i></a>
                                                    <a href="#"><i className="ri-twitter-fill"></i></a>
                                                    <a href="#"><i className="ri-instagram-fill"></i></a>
                                                </div>
                                                <div className="team-content d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h2 className="team-name"><a href="#">Carlos Mendoza</a></h2>
                                                        <p className="designation">Auditor Líder ISO</p>
                                                    </div>
                                                    <div>
                                                        <div className="round-shape">-</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="single-team-item">
                                                <img src="/assets/images/about/team-1-2.png" alt="" />
                                                <div className="team-social">
                                                    <a href="#"><i className="ri-facebook-fill"></i></a>
                                                    <a href="#"><i className="ri-linkedin-fill"></i></a>
                                                    <a href="#"><i className="ri-twitter-fill"></i></a>
                                                    <a href="#"><i className="ri-instagram-fill"></i></a>
                                                </div>
                                                <div className="team-content d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h2 className="team-name"><a href="#">María González</a></h2>
                                                        <p className="designation">Consultora Senior</p>
                                                    </div>
                                                    <div>
                                                        <div className="round-shape">-</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="single-team-item">
                                                <img src="/assets/images/about/team-1-3.png" alt="" />
                                                <div className="team-social">
                                                    <a href="#"><i className="ri-facebook-fill"></i></a>
                                                    <a href="#"><i className="ri-linkedin-fill"></i></a>
                                                    <a href="#"><i className="ri-twitter-fill"></i></a>
                                                    <a href="#"><i className="ri-instagram-fill"></i></a>
                                                </div>
                                                <div className="team-content d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h2 className="team-name"><a href="#">Roberto Silva</a></h2>
                                                        <p className="designation">Coordinador de Proyectos</p>
                                                    </div>
                                                    <div>
                                                        <div className="round-shape">-</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7 col-12 order-md-0">
                                <div className="tv-team-right-area">
                                    <div className="tv-section-title-box mb-40">
                                        <span className="tv-section-subtitle">NUESTRO EQUIPO</span>
                                        <h4 className="tv-section-title pb-20">Nuestro Equipo Está Listo Para Ayudar</h4>
                                        <p>Nuestro equipo de profesionales altamente capacitados y certificados internacionalmente trabaja con dedicación para brindar el mejor servicio de certificación ISO.</p>
                                    </div>
                                    <div className="tv-team-arrow-box d-flex justify-content-md-end">
                                        <div>
                                            <div className="it-fade-anim" data-fade-from="top" data-ease="bounce" data-delay=".7">
                                                <button className="arrow-next mb-25">
                                                    <i className="ri-arrow-left-line"></i>
                                                </button>
                                            </div>
                                            <div className="it-fade-anim" data-fade-from="top" data-ease="bounce" data-delay=".5">
                                                <button className="arrow-prev active">
                                                    <i className="ri-arrow-right-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tv-team-pagination d-flex swiper-pagination-clickable swiper-pagination-bullets">
                                        <span className="swiper-pagination-bullet">
                                            <img src="/assets/images/about/team-1-1.png" alt="Thumb 1" />
                                        </span>
                                        <span className="swiper-pagination-bullet swiper-pagination-bullet-active">
                                            <img src="/assets/images/about/team-1-2.png" alt="Thumb 2" />
                                        </span>
                                        <span className="swiper-pagination-bullet">
                                            <img src="/assets/images/about/team-1-3.png" alt="Thumb 3" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* team-area-end */}

            {/* testimonial-area-start */}
            <div className="tv-testimonial-area2 pt-130 pb-130">
                <div className="container">
                    <div className="row align-items-end mb-60">
                        <div className="col-xl-5 col-lg-5">
                            <div className="tv-section-title-box">
                                <span className="tv-section-subtitle">TESTIMONIOS</span>
                                <h4 className="tv-section-title">Lo Que Dicen Nuestros Clientes</h4>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7">
                            <div className="tv-testimonial-nav2 text-end">
                                <button className="arrow-prev"><i className="ri-arrow-left-line"></i></button>
                                <button className="arrow-next"><i className="ri-arrow-right-line"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="tv-testimonial2-slider-wrap">
                            <Swiper
                                className="tv-testimonial-slider-active2 swiper"
                                modules={[Navigation, Autoplay, Pagination]}
                                slidesPerView={3}
                                spaceBetween={30}
                                loop={true}
                                autoplay={{
                                    delay: 4500,
                                    disableOnInteraction: false,
                                }}
                                navigation={{
                                    nextEl: '.tv-testimonial-nav2 .arrow-next',
                                    prevEl: '.tv-testimonial-nav2 .arrow-prev',
                                }}
                                pagination={{
                                    el: '.tv-testimonial2-slider-wrap .swiper-pagination',
                                    clickable: true,
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 25,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    }
                                }}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <SwiperSlide key={`${testimonial.name}-${index}`}>
                                        <div className="single-testimonial-item2">
                                            <div className="shap">
                                                <span>
                                                    <svg width="29" height="18" viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M27.7322 0C28.0224 0 28.2833 0.190865 28.3617 0.47398C28.4488 0.788786 28.2823 1.11838 27.9743 1.23956C25.9286 2.04564 24.4263 3.42739 23.4993 5.35314C26.3364 6.07635 28.3847 8.61705 28.3847 11.5714C28.3847 15.1163 25.4563 18 21.8569 18C18.2575 18 15.3294 15.1163 15.3294 11.5714C15.324 11.5228 14.7478 1.93828 27.6333 0.00720024C27.6665 0.00218582 27.6994 0 27.7322 0ZM21.8569 16.7143C24.7362 16.7143 27.0784 14.4071 27.0784 11.5714C27.0784 8.98181 25.1111 6.78954 22.5026 6.47254C22.3037 6.44805 22.127 6.33536 22.0237 6.16648C21.92 5.9976 21.9009 5.79137 21.972 5.60681C22.4959 4.24421 23.2415 3.08751 24.202 2.14361C16.2363 4.88578 16.6283 11.4487 16.6337 11.5237C16.6356 14.4071 18.9779 16.7143 21.8569 16.7143Z" fill="white"></path>
                                                        <path d="M12.408 0C12.6982 0 12.959 0.190865 13.0375 0.47398C13.1246 0.788786 12.9581 1.11838 12.6501 1.23956C10.6044 2.04564 9.1021 3.42739 8.17507 5.35314C11.0122 6.07635 13.0604 8.61705 13.0604 11.5714C13.0604 15.1163 10.132 18 6.53266 18C2.93327 18 0.0051899 15.1163 0.0051899 11.5714C-0.000229836 11.5228 -0.576456 1.93828 12.3091 0.00720024C12.3423 0.00218582 12.3752 0 12.408 0ZM6.53266 16.7143C9.41196 16.7143 11.7542 14.4071 11.7542 11.5714C11.7542 8.98181 9.78692 6.78954 7.17843 6.47254C6.97945 6.44805 6.80275 6.33536 6.69944 6.16648C6.5958 5.9976 6.57667 5.79137 6.64778 5.60681C7.1717 4.24421 7.91732 3.08751 8.87779 2.14361C0.912106 4.88578 1.30405 11.4487 1.30947 11.5237C1.31143 14.4071 3.65368 16.7143 6.53266 16.7143Z" fill="white"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="icon">
                                                <i className="ri-star-fill"></i>
                                                <i className="ri-star-fill"></i>
                                                <i className="ri-star-fill"></i>
                                                <i className="ri-star-fill"></i>
                                                <i className="ri-star-fill"></i>
                                            </div>
                                            <p>“{testimonial.quote}”</p>
                                            <div className="author-info">
                                                <div>
                                                    <img src={testimonial.avatar} alt={testimonial.name} />
                                                </div>
                                                <div>
                                                    <h2>{testimonial.name}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-pagination"></div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            {/* testimonial-area-end */}
        </>
    );
};

export default About;
