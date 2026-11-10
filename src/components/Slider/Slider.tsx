import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { useBuildCountryUrl } from '../../hooks/useBuildCountryUrl';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './Slider.css';

interface Slide {
    background: string;
    subtitle: string;
    title: string;
    text: string;
    cta: string;
}

const slides: Slide[] = [
    {
        background: '/assets/images/home/slide1.jpeg',
        subtitle: 'Lider en certificaciones ISO a nivel internacional',
        title: '¿Quieres Certificarte y Potenciar tu Empresa?',
        text: 'Te guiamos paso a paso para que obtengas la certificación ISO que te abrirá nuevos mercados y clientes.',
        cta: 'Contactanos y Certificate →',
    },
    {
        background: '/assets/images/home/slide2.jpeg',
        subtitle: 'Lider en certificaciones ISO a nivel internacional',
        title: 'Excelencia Empresarial a través de la Certificación ISO.',
        text: 'Fortalece tus procesos, garantiza calidad y alcanza el reconocimiento que tu empresa merece.',
        cta: 'Contactanos',
    },
    {
        background: '/assets/images/home/slide3.jpeg',
        subtitle: 'Lider en certificaciones ISO a nivel internacional',
        title: 'Expertos que Aseguran tu Crecimiento',
        text: 'Nuestro equipo de auditores y expertos te acompaña en cada etapa para asegurar resultados confiables.',
        cta: 'Contactanos',
    },
];

const Slider: React.FC = () => {
    const { buildUrl } = useBuildCountryUrl();

    return (
    <div className="tv-slider-area">
        <div className="tv-slider-wrap">
            <Swiper
                className="tv-slider-active tv-slider-animation p-relative"
                modules={[EffectFade, Autoplay, Pagination]}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop
                speed={900}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    el: '.tv-slider-arrow-box .swiper-pagination',
                    clickable: true,
                    renderBullet: (index, className) => {
                        return '<span class="' + className + '">' + (index + 1) + '</span>';
                    },
                }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.title}>
                        <div className="tv-slider-overlay z-index-1 fix p-relative">
                            <div className="tv-slider-bg" style={{ backgroundImage: `url("${slide.background}")` }}></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="tv-slider-content z-index-1">
                                            <span className="tv-slider-subtitle">{slide.subtitle}</span>
                                            <h1 className="tv-slider-title p-relative">{slide.title}</h1>
                                            <div className="tv-slider-text pb-20">
                                                <p>{slide.text}</p>
                                            </div>
                                            <div className="tv-slider-btn">
                                                <Link className="tv-btn-primary" to={buildUrl('/contact')}>
                                                    <span className="btn-wrap">
                                                        <span className="btn-text1">{slide.cta}</span>
                                                        <span className="btn-text2">{slide.cta}</span>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="tv-slider-arrow-box d-none d-lg-block">
                    <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
                </div>
            </Swiper>
        </div>
    </div>
    );
};

export default Slider;
