import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentCountry } from '../../config/countries';
import { useBuildCountryUrl } from '../../hooks/useBuildCountryUrl';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const navigate = useNavigate();
    const currentCountry = getCurrentCountry(location.pathname);
    const { buildUrl } = useBuildCountryUrl();

    const goToLibro = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.currentTarget.blur();
        const target = '/libro-de-reclamaciones';
        if (location.pathname !== target) {
            navigate(target);
        }
        const toTop = () => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };
        window.setTimeout(toTop, 0);
        window.setTimeout(toTop, 150);
    };

    return (
        <footer>
            {/* Footer Top - Newsletter (only Home) */}
            <div className="tv-footer-wrap footer-bg z-index-1 pt-130">
                {/* Footer Main Content */}
                <div className="tv-footer-area mb-65">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-50">
                                <div className="tv-footer-widget tv-footer-col-1">
                                    <div className="tv-footer-widget-logo mb-30">
                                        <Link to={buildUrl('/home')}>
                                            <img src={currentCountry.logo} alt={`Intercert ${currentCountry.name} `} />
                                        </Link>
                                    </div>
                                    <div className="tv-footer-widget-text">
                                        <p>
                                            Brindamos soluciones digitales de certificación y gestión empresarial
                                            que convierten desafíos en oportunidades, respaldadas por auditorías
                                            acreditadas e innovación constante.
                                        </p>
                                    </div>
                                    <div className="contact-icons-container-custom" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                        {/* PHONE */}
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            {/* Icon without background */}
                                            <a
                                                href={`tel:${currentCountry.phone.replace(/[^\d]/g, '')} `}
                                                style={{
                                                    fontSize: "26px",
                                                    color: "white",
                                                    textDecoration: "none"
                                                }}
                                            >
                                                <i className="ri-phone-line"></i>
                                            </a>

                                            {/* White number */}
                                            <a
                                                href={`tel:${currentCountry.phone.replace(/[^\d]/g, '')} `}
                                                style={{
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    color: "white",
                                                    textDecoration: "none"
                                                }}
                                            >
                                                {currentCountry.phone}
                                            </a>
                                        </div>

                                        {/* EMAIL + WHATSAPP */}
                                        <div className="tv-footer-widget-social" style={{ marginTop: '0' }}>
                                            {/* Email */}
                                            <a
                                                href={`mailto:${currentCountry.email} `}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="ri-mail-line"></i>
                                            </a>

                                            {/* WhatsApp */}
                                            <a
                                                href={`https://api.whatsapp.com/send?phone=${(currentCountry.code === "global" || currentCountry.code === "pe")
                                                    ? "51986123418"
                                                    : currentCountry.phone.replace(/[^\d]/g, '')
                                                    }& text=Hola vengo de intercertlatam.com / ${currentCountry.code}. Deseo más información sobre los certificados ISO.`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="ri-whatsapp-line"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-50">
                                <div className="tv-footer-widget tv-footer-col-2">
                                    <h4 className="tv-footer-widget-title">Enlaces Rápidos</h4>
                                    <div className="tv-footer-widget-menu">
                                        <ul>
                                            <li><Link to={buildUrl('/about')}>Nosotros</Link></li>
                                            <li><Link to={buildUrl('/services')}>Sectores</Link></li>
                                            <li><Link to={buildUrl('/blog')}>Blog</Link></li>

                                            <li><Link to={buildUrl('/contact')}>Contacto</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-50">
                                <div className="tv-footer-widget tv-footer-col-3 d-flex justify-content-xl-end">
                                    <div>
                                        <h4 className="tv-footer-widget-title">Servicios</h4>
                                        <div className="tv-footer-widget-menu">
                                            <ul>
                                                <li><Link to={buildUrl('/certificacion-iso')}>Certificaciones ISO</Link></li>
                                                <li><Link to={buildUrl('/certificacion-personas')}>Certificaciones de Personas</Link></li>

                                                <li><Link to={buildUrl('/services')}>Sectores</Link></li>
                                                {/* <li><Link to={buildUrl('/about-partners')}>Partners</Link></li> */}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-50">
                                <div className="tv-footer-widget tv-footer-col-4 d-flex justify-content-xl-end">
                                    <div>
                                        <h4 className="tv-footer-widget-title">Información</h4>
                                        <div className="tv-footer-widget-menu">
                                            <ul>
                                                <li><Link to={buildUrl('/terminos-uso')}>Términos de Uso</Link></li>
                                                <li><Link to={buildUrl('/politica-privacidad')}>Política de Privacidad</Link></li>
                                                <li><Link to={buildUrl('/faq')}>FAQs</Link></li>
                                                <li>
                                                    <Link
                                                        to="/libro-de-reclamaciones"
                                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                                                        onClick={goToLibro}
                                                    >
                                                        <img
                                                            src="/assets/images/libro-reclamaciones.png"
                                                            alt="Libro de Reclamaciones"
                                                            style={{
                                                                width: '110px',
                                                                height: 'auto',
                                                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))',
                                                            }}
                                                        />
                                                        Libro de reclamaciones
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom - Copyright */}
                <div className="tv-copyright-area">
                    <div className="container">
                        <div className="tv-copyright-border">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="tv-copyright-left text-center text-lg-start">
                                        <p className="mb-0">
                                            © {currentYear} <Link to={buildUrl('/')}>INTERCERT LATAM</Link> Todos los derechos reservados
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <div className="tv-footer-widget-social">
                                        <a href="https://www.facebook.com/IntercertLatam/" target="_blank" rel="noopener noreferrer">
                                            <i className="ri-facebook-fill"></i>
                                        </a>
                                        <a href="https://www.instagram.com/intercertlatam/" target="_blank" rel="noopener noreferrer">
                                            <i className="ri-instagram-fill"></i>
                                        </a>
                                        <a href="https://www.tiktok.com/@intercertlatam?_t=zs-8zwuhfjlpiz&_r=1" target="_blank" rel="noopener noreferrer">
                                            <i className="ri-tiktok-fill"></i>
                                        </a>
                                        <a href="https://www.linkedin.com/company/intercertlatam" target="_blank" rel="noopener noreferrer">
                                            <i className="ri-linkedin-fill"></i>
                                        </a>
                                        <a href="https://x.com/intercertlatam" target="_blank" rel="noopener noreferrer">
                                            <i className="ri-twitter-x-fill"></i>
                                        </a>
                                        <a href="https://www.youtube.com/@intercertlatam" target="_blank" rel="noopener noreferrer">
                                            <i className="ri-youtube-fill"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
