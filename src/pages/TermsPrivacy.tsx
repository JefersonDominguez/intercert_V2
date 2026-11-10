import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentCountry } from '../config/countries';
import { useBuildCountryUrl } from '../hooks/useBuildCountryUrl';

interface SectionItem {
    title: string;
    body: string;
}

interface LegalSection {
    id: string;
    title: string;
    description: string;
    items: SectionItem[];
}

const TermsPrivacy = () => {
    const { buildUrl } = useBuildCountryUrl();
    const currentCountry = getCurrentCountry();
    const contactEmail = currentCountry.email || 'info@intercertlatam.com';
    const contactPhone = currentCountry.phone || '+51 986 123 418';
    const contactPhoneHref = `tel:${contactPhone.replace(/\s+/g, '')}`;

    useEffect(() => {
        const elements = document.querySelectorAll('[data-background]');
        elements.forEach((element) => {
            const backgroundImage = element.getAttribute('data-background');
            if (backgroundImage) {
                (element as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
            }
        });
    }, []);

    const LEGAL_BREADCRUMB_BG = '/assets/images/breadcrumb/certificate-background.webp';

    const sections: LegalSection[] = [
        {
            id: 'terms',
            title: 'Términos de Uso',
            description:
                'Estos lineamientos regulan la navegación, registro y utilización de los portales digitales de Intercert en todos los países donde operamos.',
            items: [
                {
                    title: 'Condiciones generales',
                    body: 'Al acceder aceptas emplear la plataforma únicamente para fines legítimos ligados a la evaluación y certificación. No se permite reproducir contenidos ni intentar vulnerar la seguridad del sistema.',
                },
                {
                    title: 'Cuentas de usuario',
                    body: 'Cada usuario es responsable de proteger sus credenciales, activar el doble factor disponible y avisar de inmediato al área de soporte ante accesos sospechosos.',
                },
                {
                    title: 'Disponibilidad del servicio',
                    body: 'Intercert puede programar mantenimiento o mejoras que impliquen suspensiones temporales. Procuramos restablecer el servicio con rapidez y comunicar cambios relevantes.',
                },
                {
                    title: 'Limitación de responsabilidad',
                    body: 'Trabajamos con estándares de calidad, pero factores externos pueden afectar la disponibilidad. No se garantiza continuidad ininterrumpida ni ausencia total de errores.',
                },
            ],
        },
        {
            id: 'privacy',
            title: 'Política de Privacidad',
            description:
                'Tratamos los datos personales conforme a las normativas vigentes y a estándares internacionales de seguridad, priorizando transparencia y confidencialidad.',
            items: [
                {
                    title: 'Información que recopilamos',
                    body: 'Recopilamos datos voluntarios (nombre, correo, teléfono, dirección) cuando completas formularios, así como información de navegación (IP, navegador, páginas visitadas) para mejorar la experiencia y seguridad del sitio.',
                },
                {
                    title: 'Uso de la información',
                    body: 'Los datos se usan para procesar solicitudes, responder consultas, personalizar contenidos, enviar comunicaciones comerciales autorizadas y cumplir obligaciones legales. También contribuyen a optimizar la seguridad del portal.',
                },
                {
                    title: 'Compartición y proveedores',
                    body: 'No vendemos ni alquilamos datos. Solo compartimos información con proveedores de servicios que operan bajo contrato de confidencialidad o cuando la ley lo exige.',
                },
                {
                    title: 'Cookies y tecnologías similares',
                    body: 'Utilizamos cookies para recordar preferencias y analizar uso del sitio. Puedes deshabilitarlas en tu navegador, aunque ciertas funciones podrían verse limitadas.',
                },
                {
                    title: 'Seguridad y derechos',
                    body: 'Aplicamos controles para resguardar la confidencialidad, aunque no podemos garantizar seguridad absoluta en Internet. Puedes ejercer derechos de acceso, rectificación, eliminación o limitación escribiendo a privacy@intercertlatam.com.',
                },
                {
                    title: 'Actualizaciones de la política',
                    body: 'Nos reservamos el derecho de actualizar esta política. Las modificaciones se publicarán en esta página y se recomienda revisarla periódicamente.',
                },
            ],
        },
        {
            id: 'impartiality',
            title: 'Política de Imparcialidad',
            description:
                'Intercert garantiza independencia objetiva en todas las actividades de certificación, gestionando conflictos de interés y cumpliendo ISO 17021:2015.',
            items: [
                {
                    title: 'Compromiso con la objetividad',
                    body: 'Contamos con un comité de partes interesadas y procesos formales que identifican, evalúan y registran cualquier amenaza a la imparcialidad, mitigando riesgos residuales antes de emitir una certificación.',
                },
                {
                    title: 'Servicios prohibidos',
                    body: 'No brindamos consultoría de sistemas de gestión, auditorías internas ni subcontratamos auditorías a consultoras; tampoco certificamos a otros organismos de certificación.',
                },
                {
                    title: 'Gestión de conflictos de interés',
                    body: 'El personal interno y externo debe declarar posibles conflictos. Quienes hayan prestado consultoría a un cliente en los últimos dos años no participan en su proceso de certificación.',
                },
                {
                    title: 'Acciones frente a amenazas',
                    body: 'Si una relación compromete la imparcialidad, la certificación se rehúsa. Intercert actúa ante vínculos comerciales o presiones que pongan en riesgo la objetividad.',
                },
            ],
        },
        {
            id: 'quality',
            title: 'Política de Calidad',
            description:
                'Prestamos servicios de auditoría de tercera parte mediante un equipo competente y enmarcado en cultura 5S, orientados a la mejora continua y satisfacción del cliente.',
            items: [
                {
                    title: 'Satisfacción del cliente',
                    body: 'Nuestro objetivo es responder de forma oportuna y transparente, garantizando confidencialidad, integridad e imparcialidad durante todo el proceso de certificación.',
                },
                {
                    title: 'Competencia del personal',
                    body: 'Capacitamos y motivamos continuamente a nuestro equipo y auditores externos para asegurar competencias acordes a los principios y requisitos de Intercert.',
                },
                {
                    title: 'Orden y disciplina',
                    body: 'Implementamos la metodología 5S para mantener orden, limpieza y disciplina, evaluando periódicamente los procesos para sostener la calidad del servicio.',
                },
                {
                    title: 'Gestión basada en datos',
                    body: 'Las decisiones se toman tras un análisis detallado. Comunicamos de manera clara y proveemos herramientas a las partes interesadas para que cumplan metas y objetivos.',
                },
                {
                    title: 'Mejora continua',
                    body: 'Promovemos la actualización constante de nuestros sistemas y procesos, integrando retroalimentación de clientes y partes interesadas en cada ciclo de auditoría.',
                },
            ],
        },
    ];

    const getIconClass = (sectionId: string): string => {
        switch (sectionId) {
            case 'terms':
                return 'ri-file-list-line';
            case 'privacy':
                return 'ri-lock-line';
            case 'impartiality':
                return 'ri-shield-check-line';
            default:
                return 'ri-check-double-line';
        }
    };

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
                                    <h3 className="tv-breadcrumb-title">Términos de Uso y Política de Privacidad</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span>
                                            <Link to="/home">Inicio</Link>
                                        </span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z"
                                                    fill="#F5F6F7"
                                                ></path>
                                            </svg>
                                        </span>
                                        <i>Términos y Privacidad</i>
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
                        <div className="col-12 col-xl-8">
                            <div className="tv-section-title-box mb-40">
                                <span className="tv-section-subtitle">COMPROMISO INTERCERT</span>
                                <h4 className="tv-section-title pb-20">Transparencia para clientes, partners y auditores</h4>
                                <p>
                                    Intercert opera con acreditaciones internacionales y estándares de seguridad que exigen una comunicación
                                    clara sobre el uso de nuestros portales. En este documento encontrarás los lineamientos que aplican a
                                    usuarios de cualquier país donde ofrecemos servicios de certificación, formación y acompañamiento técnico.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="tv-project-sidebar-details" style={{ background: '#0A165E', color: '#FFFFFF' }}>
                                <h4 style={{ color: '#FFFFFF' }}>¿Necesitas ayuda?</h4>
                                <p style={{ color: '#CBD5F5' }}>
                                    Nuestro equipo en {currentCountry.name} puede orientarte sobre el tratamiento de datos o integraciones con la plataforma.
                                </p>
                                <div style={{ marginTop: '16px', lineHeight: 1.6 }}>
                                    <div>
                                        <strong>Teléfono:</strong>{' '}
                                        <a href={contactPhoneHref} style={{ color: '#FFFFFF' }}>
                                            {contactPhone}
                                        </a>
                                    </div>
                                    <div>
                                        <strong>Email:</strong>{' '}
                                        <a href={`mailto:${contactEmail}`} style={{ color: '#FFFFFF' }}>
                                            {contactEmail}
                                        </a>
                                    </div>
                                </div>
                                <Link className="tv-btn-secondary" to={buildUrl('/contact')} style={{ display: 'inline-block', marginTop: '12px' }}>
                                    <span className="btn-wrap">
                                        <span className="btn-text1">Contactar al equipo</span>
                                        <span className="btn-text2">Contactar al equipo</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {sections.map((section) => (
                        <div key={section.id} id={section.id} className="tv-privacy-section mt-60">
                            <div className="row align-items-start">
                                <div className="col-lg-4">
                                    <div className="tv-section-title-box">
                                        <span className="tv-section-subtitle">{section.id === 'terms' ? 'CONDICIONES' : 'DATOS PERSONALES'}</span>
                                        <h4 className="tv-section-title pb-15">{section.title}</h4>
                                        <p>{section.description}</p>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="tv-privacy-content">
                                        {section.items.map((item, index) => (
                                            <div key={`${section.id}-${index}`} className="single-icon-box mb-30">
                                                <span className="tv-privacy-icon">
                                                    <i className={getIconClass(section.id)}></i>
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
                        </div>
                    ))}

                    <div className="tv-info-wrapper mt-80">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="single-icon-box">
                                    <span className="tv-privacy-icon">
                                        <i className="ri-customer-service-2-line"></i>
                                    </span>
                                    <div className="icon-box-content">
                                        <h3>Canales de contacto</h3>
                                        <p>
                                            Escríbenos a{' '}
                                            <a href={`mailto:${contactEmail}`} style={{ color: '#159dbc' }}>
                                                {contactEmail}
                                            </a>{' '}
                                            o llámanos al{' '}
                                            <a href={contactPhoneHref} style={{ color: '#159dbc' }}>
                                                {contactPhone}
                                            </a>{' '}
                                            para incidencias relacionadas al portal.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="single-icon-box">
                                    <span className="tv-privacy-icon">
                                        <i className="ri-loop-right-line"></i>
                                    </span>
                                    <div className="icon-box-content">
                                        <h3>Revisiones periódicas</h3>
                                        <p>
                                            Intercert se reserva el derecho de actualizar estos lineamientos para adaptarse a cambios regulatorios
                                            o mejoras del servicio. Notificaremos cambios relevantes a través de nuestros canales oficiales.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsPrivacy;
