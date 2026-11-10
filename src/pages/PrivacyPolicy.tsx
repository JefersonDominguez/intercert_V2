import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildCountryUrl } from '../config/countries';

const LEGAL_BREADCRUMB_BG = '/assets/images/breadcrumb/certificate-background.webp';

interface Section {
    title: string;
    body: string;
    icon: string;
}

const PrivacyPolicy = () => {
    useEffect(() => {
        document.querySelectorAll('[data-background]').forEach((element) => {
            const backgroundImage = element.getAttribute('data-background');
            if (backgroundImage) {
                (element as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
            }
        });
    }, []);

    const sections: Section[] = [
        {
            title: 'Información personal',
            body: 'Recolectamos datos voluntarios (nombre, empresa, teléfono, correo, dirección) cuando completas formularios, solicitas información, te registras en eventos o realizas compras en nuestra tienda virtual.',
            icon: 'ri-id-card-line',
        },
        {
            title: 'Información de navegación',
            body: 'Al visitar nuestros sitios registramos automáticamente dirección IP, tipo de navegador, dispositivo, páginas visitadas y tiempo de permanencia. Estos datos ayudan a mejorar la seguridad y el rendimiento.',
            icon: 'ri-global-line',
        },
        {
            title: 'Uso de la información',
            body: 'La información se emplea para procesar pedidos, responder consultas, ofrecer soporte, personalizar tu experiencia, enviar actualizaciones comerciales con tu consentimiento y cumplir obligaciones legales.',
            icon: 'ri-task-line',
        },
        {
            title: 'Compartir información',
            body: 'No vendemos ni alquilamos tus datos. Solo los compartimos con proveedores que prestan servicios a Intercert (hosting, mensajería, soporte) bajo acuerdos de confidencialidad o cuando la ley lo requiera.',
            icon: 'ri-exchange-line',
        },
        {
            title: 'Cookies y tecnologías similares',
            body: 'Utilizamos cookies para recordar preferencias y analizar el uso del sitio. Puedes deshabilitarlas desde tu navegador; sin embargo, algunas funciones podrían verse limitadas.',
            icon: 'ri-cookie-line',
        },
        {
            title: 'Seguridad',
            body: 'Aplicamos medidas técnicas y organizativas para preservar confidencialidad e integridad (cifrado, control de accesos, monitoreo). Aunque hacemos lo posible, ningún sistema conectado a Internet garantiza seguridad absoluta.',
            icon: 'ri-shield-keyhole-line',
        },
        {
            title: 'Derechos de los titulares',
            body: 'Puedes solicitar acceso, rectificación, actualización, portabilidad o eliminación de datos enviando un correo a privacy@intercertlatam.com. Atendemos las solicitudes dentro de los plazos legales vigentes.',
            icon: 'ri-user-settings-line',
        },
        {
            title: 'Cambios en la política',
            body: 'Podemos actualizar este documento. Las modificaciones entrarán en vigencia al publicarse en esta página y se recomienda revisarla periódicamente.',
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
                                    <h3 className="tv-breadcrumb-title">Política de Privacidad</h3>
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
                                        <i>Política de Privacidad</i>
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
                                <span className="tv-section-subtitle">PROTECCIÓN DE DATOS</span>
                                <h4 className="tv-section-title pb-20">Cómo gestionamos la información personal en Intercert</h4>
                                <p>
                                    Somos un organismo de evaluación de la conformidad acreditado internacionalmente. Respetamos la privacidad
                                    de nuestros clientes, auditores y aliados, aplicando controles alineados a las normativas de cada país y a
                                    los estándares ISO aplicables.
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

export default PrivacyPolicy;
