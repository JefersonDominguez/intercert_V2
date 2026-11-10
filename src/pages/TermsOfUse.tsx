import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildCountryUrl } from '../config/countries';

const LEGAL_BREADCRUMB_BG = '/assets/images/breadcrumb/certificate-background.webp';

interface Section {
    title: string;
    body: string;
    icon: string;
}

const TermsOfUse = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('[data-background]');
        elements.forEach((element) => {
            const backgroundImage = element.getAttribute('data-background');
            if (backgroundImage) {
                (element as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
            }
        });
    }, []);

    const sections: Section[] = [
        {
            title: 'Aceptación y alcance',
            body: 'Al acceder a los sitios y plataformas de Intercert aceptas cumplir estos términos y cualquier actualización futura. Son aplicables a clientes, partners, auditores y visitantes.',
            icon: 'ri-article-line',
        },
        {
            title: 'Uso correcto de la plataforma',
            body: 'Se prohíbe emplear la plataforma para actividades ilegales, vulnerar controles de seguridad, distribuir malware o replicar contenidos sin autorización escrita de Intercert.',
            icon: 'ri-shield-keyhole-line',
        },
        {
            title: 'Credenciales y seguridad',
            body: 'Cada usuario es responsable de proteger su cuenta, mantener contraseñas seguras y activar el doble factor cuando esté disponible. Ante cualquier sospecha debe notificarse a soporte@intercertlatam.com.',
            icon: 'ri-lock-password-line',
        },
        {
            title: 'Disponibilidad del servicio',
            body: 'Intercert puede suspender temporalmente funciones por mantenimiento o mejoras. Trabajamos para restablecer el servicio con rapidez, pero no garantizamos disponibilidad ininterrumpida.',
            icon: 'ri-time-line',
        },
        {
            title: 'Propiedad intelectual',
            body: 'Los contenidos, marcas y documentación provienen de Intercert o terceros licenciantes. No pueden copiarse ni modificarse sin consentimiento previo y por escrito.',
            icon: 'ri-copyright-line',
        },
        {
            title: 'Limitación de responsabilidad',
            body: 'Intercert no se responsabiliza por pérdidas indirectas derivadas del uso de la plataforma, fallas de conectividad de terceros o uso indebido por parte del usuario.',
            icon: 'ri-error-warning-line',
        },
        {
            title: 'Actualizaciones de los términos',
            body: 'Nos reservamos el derecho de actualizar estas condiciones. Cualquier cambio se publicará en este portal con una fecha de vigencia. El uso posterior implica aceptación de la nueva versión.',
            icon: 'ri-refresh-line',
        },
    ];
    const buildUrl = (path: string) => buildCountryUrl(path);

    return (
        <>
            <div
                className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative"
                data-background={LEGAL_BREADCRUMB_BG}
                style={{ backgroundImage: `url(${LEGAL_BREADCRUMB_BG})` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tv-breadcrumb-content z-index-1 text-center">
                                <div className="tv-breadcrumb-title-box">
                                    <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">DOCUMENTOS LEGALES</span>
                                    <h3 className="tv-breadcrumb-title">Términos de Uso</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span>
                                            <Link to={buildUrl('/home')}>Inicio</Link>
                                        </span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z"
                                                    fill="#F5F6F7"
                                                ></path>
                                            </svg>
                                        </span>
                                        <i>Términos de Uso</i>
                                    </div>
                                </div>
                                <p style={{ marginTop: '20px', color: '#E2E8F0' }}>Última actualización: 09 de noviembre de 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tv-about-area z-index-1 p-relative pt-130 pb-130 white-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tv-section-title-box mb-40">
                                <span className="tv-section-subtitle">CONDICIONES DE USO</span>
                                <h4 className="tv-section-title pb-20">Lineamientos para el uso de las plataformas Intercert</h4>
                                <p>
                                    Los portales, aplicaciones y servicios digitales de Intercert fueron diseñados para respaldar procesos de
                                    certificación y acompañamiento técnico. Nos esforzamos por ofrecer herramientas confiables y queremos
                                    asegurarnos de que cada interacción sea segura, ética y alineada con los objetivos de nuestros clientes.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="tv-privacy-content mt-60">
                        {sections.map((item, index) => (
                            <div key={index} className="single-icon-box mb-30">
                                <span className="tv-privacy-icon">
                                    <i className={item.icon}></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default TermsOfUse;
