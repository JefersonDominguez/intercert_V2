
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCurrentCountry, buildCountryUrl } from '../config/countries';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import { getSeoConfig } from '../config/seoConfig';
import { buildHreflangLinks } from '../utils/hreflang';
import { allCertifications } from '../data/certifications';

const LEGAL_BREADCRUMB_BG = '/assets/images/breadcrumb/certificate-background.webp';

interface ThematicImages {
    [key: string]: string[];
}

const baseImages: ThematicImages = {
    'ISO 9001': [
        '/assets/images/IsosD/714bae008c6fc104a227a7292ed1e6c4944eafb8.png',
        '/assets/images/IsosD/bdbe1893e3142911f17806edf2453333f9077ada.png',
    ],
    'ISO 14001': [
        '/assets/images/IsosD/0c129bdb6aac5cedbb3bbc447156d704767aec5c.png',
        '/assets/images/IsosD/27efaf086257bf8fea1e799ff66fe96a8a2e9748.png',
    ],
    'ISO 45001': [
        '/assets/images/IsosD/0a7cac92aa295bf711bfa7c14443eec547f9a693.png',
        '/assets/images/IsosD/9eb0db7443c1103c4585f7d865b5e6b4b6b5eed2.png',
    ],
    'ISO 27001': [
        '/assets/images/IsosD/397b654d5112481d10ab646e8656a3657d70329d.png',
        '/assets/images/IsosD/eb604adcf7f4d28856778cc28489c65b63a57a9b.png',
    ],
    'ISO 22000': [
        '/assets/images/IsosD/3b92db5e69552d42b15783822c32cf61f0f83437.png',
        '/assets/images/IsosD/71dfb17f571803b2029c68e0b3b0cf14f15ecb1b.png',
    ],
    'ISO 50001': [
        '/assets/images/IsosD/c1959faf4a3263409a6d92119579fbadcab0f601.png',
        '/assets/images/IsosD/9c6e1038ebefdaa947218550c3b0150efcdcdf26.png',
    ],
    'ISO 13485': [
        '/assets/images/IsosD/6e7b110bbfec99084b3c6be3d4ae90c3f081ff30.png',
        '/assets/images/IsosD/fe2644f1785735a557e74cb8957f643b7f9d7ef2.png',
    ],
    'ISO 20000-1': [
        '/assets/images/IsosD/86caf109112e1c082dd18823dad36a85a455490a.png',
        '/assets/images/IsosD/c2cccfb8f106bbf9d209917c8a850cf02a7a7b8a.png',
    ],
    'ISO 22301': [
        '/assets/images/IsosD/08ee63a0d7947d82306aa241dbe18f055d0b8a16.png',
        '/assets/images/IsosD/112f0f4792c01d28bb0b74a543250e276f2a319b.png',
    ],
    'ISO 10002': [
        '/assets/images/IsosD/3d8a5adc09a0860b252f5b772ad235580c4b45e4.png',
        '/assets/images/IsosD/e859ea3d908f2934faa2ff54ec2af7f5eeb12f5d.png',
    ],
    'ISO 17020': [
        '/assets/images/IsosD/2373b1944ce1a32b2f1de774fdefeede3e5988c2.png',
        '/assets/images/IsosD/2373b1944ce1a32b2f1de774fdefeede3e5988c2.png',
    ],
    'ISO 17021': [
        '/assets/images/IsosD/47996366a3cfd66321ab87b19d0f769dde31c64e.png',
        '/assets/images/IsosD/dc1aecda653161270bd1cae86a69110674e16148.png',
    ],
    'ISO 17025': [
        '/assets/images/IsosD/6a4e190d6a018398231c81d43288c3752b13bbd1.png',
        '/assets/images/IsosD/beed1369b4e7701e3638f45561133dccf54a4b2b.png',
    ],
    'ISO 21001': [
        '/assets/images/IsosD/3d85652125280757e2ca228c76a7e3cf32f495bf.png',
        '/assets/images/IsosD/b7f7313273ad81638683d14b51d75794fa8d7ae8.png',
    ],
    'ISO 22005': [
        '/assets/images/IsosD/6c6280cd31bf27fb4dea75e0873856d72462ebe7.png',
        '/assets/images/IsosD/241f28610284e0d27733ea6c9fcf7a9399ea4a88.png',
    ],
    'ISO 27701': [
        '/assets/images/IsosD/74dd2321d99054d846a085857ec6c9687fbd4a0f.png',
        '/assets/images/IsosD/ca6ac08ac59160efa9f3353d9b3e0b9aa9c4b17c.png',
    ],
    'ISO 28000': [
        '/assets/images/IsosD/2ea0ac0b82b9d268330a80d78eff4eb6c0bab416.png',
        '/assets/images/IsosD/b780d7e11cb5a443c8ff020db101a0aeb1d74d85.png',
    ],
    'ISO 31000': [
        '/assets/images/IsosD/21f104169d19b4665565e00660863cab301b601d.png',
        '/assets/images/IsosD/23dde6cc9e832bd04e0d74055123af6fd449432b.png',
    ],
    'ISO 56002': [
        '/assets/images/IsosD/508d0974a0689a7cd41e6922b1f70064d62880fa.png',
        '/assets/images/IsosD/aa68d0f1f98228b3bdd52ece484d3907844c4d49.png',
    ],
    'ISO 90003': [
        '/assets/images/IsosD/02181b6f4d6021b5f39d57f961bb9ffaefc3241c.png',
        '/assets/images/IsosD/f76058b884de881c1911ec7b2114ffbde37de1fa.png',
    ],
    'ISO 26000': [
        '/assets/images/IsosD/800fe5f84df5d52c38b5d6b9a378b3e8ccb6ae05.png',
        '/assets/images/IsosD/c6f4a28f86094c360f8e7475daea8fa0c6b06deb.png',
    ],
    'ISO 37001': [
        '/assets/images/IsosD/8fc311be7ac2d8d7cd30ea86def7a1a08485e4d9.png',
        '/assets/images/IsosD/42b8e94b03ff928dbf04f069acb7710e08374413.png',
    ],
    'ISO 39001': [
        '/assets/images/IsosD/8b3477adf276d8bc03a9a3fa7ac9d90d1622bac2.png',
        '/assets/images/IsosD/766ddc937d016e84249c9046ced4ba1fafbbb02d.png',
    ],
    'ISO IEC 2382': [
        '/assets/images/IsosD/2875ac9b8084a268cf10eee159d44fd8d1899a3f.png',
        '/assets/images/IsosD/3468c91ba401feefccb4b90e74436ee4508e207d.png',
    ],
    'ISO IEC 29119': [
        '/assets/images/IsosD/5ca60a1a5915bbc8877e72c06f4656ddbf3bee3c.png',
        '/assets/images/IsosD/b8c4e8b6899590f1396fff0052347622780904b5.png',
    ],
    'BPA': [
        '/assets/images/IsosD/5080477bc56eafb1ef6f9ded2e5650fd46f9bd55.png',
        '/assets/images/IsosD/da1461c049b8542dbf06f24d7ecc712032d3e2fb.png',
    ],
    'BPL ISO': [
        '/assets/images/IsosD/49ed7549c6e59b81432a4cf2e5f7a9173437494e.png',
        '/assets/images/IsosD/fd4e64688b32a824a17fa221bcc0a41cd78ebb2a.png',
    ],
    'BPM': [
        '/assets/images/IsosD/b5ac6ab443a2c72b395134bea7b1fd9c1acbe658.png',
        '/assets/images/IsosD/dd5148fdc4b32ad2630d7c34a0a278f416a58ed6.png',
    ],
    'HACCP': [
        '/assets/images/IsosD/55cbce707f8cd7403ed80f55cc174623f1ee97c4.png',
        '/assets/images/IsosD/f56555148c2d65d8165308420ac53b8c67592cf3.png',
    ],
};

const getRelatedImages = (isoName: string): string[] => {
    return baseImages[isoName] || [];
};

const getImageAltFromPath = (path: string, fallback = 'Certificación ISO') => {
    if (!path || typeof path !== 'string') return fallback;
    const filename = path.split('/').pop();
    return filename ? filename.replace(/\.[^/.]+$/, '') : fallback;
};

const CertificationDetail = () => {
    const { id: slugOrId } = useParams<{ id: string }>();
    const country = getCurrentCountry();
    const seoConfig = getSeoConfig(country.code);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [showAllCertifications, setShowAllCertifications] = useState(false);
    const currentCountry = getCurrentCountry();
    const helpPhone = currentCountry.phone || '+51 986 123 418';
    const helpPhoneHref = `tel:${helpPhone.replace(/\s+/g, '')} `;
    const helpEmail = currentCountry.email || 'info@intercertlatam.com';
    const helpAddress = currentCountry.address || 'Centro Empresarial PLEXUS Piso 11, San Miguel, Lima';
    const helpMapUrl = currentCountry.mapUrl || 'https://www.google.com/maps';

    // Buscar la certificación por slug o ID (para retrocompatibilidad)
    const certification = allCertifications.find(cert =>
        cert.slug === slugOrId || cert.id === parseInt(slugOrId || '0')
    ) || allCertifications[0]!;

    const certificationSeo = seoConfig.certificationDetail(certification?.name || 'Certificación ISO', certification?.name || 'ISO');
    const helmet = useSeoMetadata({
        title: certificationSeo.title,
        description: certificationSeo.description,
        schema: seoConfig.schema.organization,
        hreflangs: buildHreflangLinks(`/certificacion-iso/${certification.slug}`),
    });
    const relatedImages = getRelatedImages(certification.name) || [];
    const displayedImages = relatedImages.slice(0, 2);

    useEffect(() => {
        // Scroll to top when certification changes
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Manejar data-background para React
        const elements = document.querySelectorAll('[data-background]');
        elements.forEach(element => {
            const backgroundImage = element.getAttribute('data-background');
            if (backgroundImage) {
                (element as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
            }
        });
    }, [slugOrId]);

    return (
        <>
            {helmet}
            {/* Breadcrumb Section */}
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
                                    <h3 className="tv-breadcrumb-title">{certification.description}</h3>
                                </div>
                                <div className="tv-breadcrumb-list-wrap">
                                    <div className="tv-breadcrumb-list">
                                        <span><Link to="/">Inicio</Link></span>
                                        <span className="dvdr">
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z" fill="#F5F6F7"></path>
                                            </svg>
                                        </span>
                                        <i>{certification.name}</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="tv-blog-area tv-single-service pt-130 pb-130">
                <div className="container">
                    <div className="row">
                        {/* Left Content */}
                        <div className="col-xl-8 col-lg-8 col-12 order-xl-1 order-lg-1">
                            <div className="tv-blog-list-wrap">
                                <div className="tv-blog-details">
                                    <div className="tv-blog-details-thumb mb-40">
                                        <img
                                            src={`/assets/images/ISOS/${certification.image}`}
                                            alt={certification.name}
                                            style={{
                                                maxWidth: '300px',
                                                height: 'auto',
                                                display: 'block',
                                                margin: '0 auto'
                                            }}
                                        />
                                    </div>
                                    <h2 className="title">{certification.name}</h2>
                                    <div className="tv-blog-details-content">
                                        <p>La certificación {certification.name} es una norma internacional reconocida que ayuda a las organizaciones a mejorar su eficiencia operativa, cumplir con los requisitos legales y mejorar continuamente sus procesos de gestión.</p>

                                        <p>Esta certificación establece los criterios para un sistema de gestión efectivo y es reconocida mundialmente por su enfoque en la mejora continua, la satisfacción del cliente y la gestión de procesos.</p>

                                        <div className="tv-service-list-item">
                                            <ul>
                                                <li><i className="ri-check-line"></i>Mejora la eficiencia operativa de la organización</li>
                                                <li><i className="ri-check-line"></i>Reduce costos operativos significativamente</li>
                                                <li><i className="ri-check-line"></i>Aumenta la satisfacción del cliente</li>
                                                <li><i className="ri-check-line"></i>Mejora la imagen corporativa</li>
                                                <li><i className="ri-check-line"></i>Facilita el acceso a nuevos mercados</li>
                                                <li><i className="ri-check-line"></i>Reduce riesgos operativos</li>
                                            </ul>
                                        </div>

                                        {displayedImages.length > 0 && (
                                            <div className="tv-blog-details-thumb-img d-flex justify-content-between">
                                                {displayedImages.map((imagePath, index) => (
                                                    <div key={`related-image-${index}`}>
                                                        {imagePath ? (
                                                            <img
                                                                src={imagePath}
                                                                alt={getImageAltFromPath(imagePath, certification.name)}
                                                            />
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    width: '180px',
                                                                    height: '120px',
                                                                    borderRadius: '16px',
                                                                    background: 'rgba(10, 22, 94, 0.08)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    color: '#0A165E',
                                                                    fontWeight: 600,
                                                                    textAlign: 'center',
                                                                    padding: '0 12px',
                                                                }}
                                                            >
                                                                {certification.name}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <p>La implementación de {certification.name} requiere un compromiso organizacional completo y un enfoque sistemático para la mejora continua. Nuestro equipo de expertos te guiará a través de todo el proceso de certificación.</p>

                                        <h3 className="faq-title">Preguntas Frecuentes</h3>

                                        <div className="tv-custom-accordion">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-items">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button
                                                            className={`accordion-buttons ${activeFaq === 0 ? '' : 'collapsed'}`}
                                                            type="button"
                                                            onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                                                        >
                                                            ¿Cuánto tiempo toma obtener la certificación {certification.name}?
                                                            <i className={`ri-${activeFaq === 0 ? 'subtract' : 'add'}-line`}></i>
                                                        </button>
                                                    </h2>
                                                    {activeFaq === 0 && (
                                                        <div className="accordion-collapse show">
                                                            <div className="accordion-body">
                                                                <p className="mb-0">El proceso típicamente toma entre 3-6 meses, dependiendo del tamaño y complejidad de la organización. Incluye la implementación del sistema, auditoría interna y auditoría de certificación.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="accordion-items">
                                                    <h2 className="accordion-header" id="headingTwo">
                                                        <button
                                                            className={`accordion-buttons ${activeFaq === 1 ? '' : 'collapsed'}`}
                                                            type="button"
                                                            onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                                                        >
                                                            ¿Cuáles son los beneficios principales de la {certification.name}?
                                                            <i className={`ri-${activeFaq === 1 ? 'subtract' : 'add'}-line`}></i>
                                                        </button>
                                                    </h2>
                                                    {activeFaq === 1 && (
                                                        <div className="accordion-collapse show">
                                                            <div className="accordion-body">
                                                                <p className="mb-0">Los principales beneficios incluyen mejora en la eficiencia operativa, mayor satisfacción del cliente, acceso a nuevos mercados, mejora de la imagen corporativa y reducción de riesgos operativos.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="accordion-items">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button
                                                            className={`accordion-buttons ${activeFaq === 2 ? '' : 'collapsed'}`}
                                                            type="button"
                                                            onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                                                        >
                                                            ¿La certificación {certification.name} es obligatoria?
                                                            <i className={`ri-${activeFaq === 2 ? 'subtract' : 'add'}-line`}></i>
                                                        </button>
                                                    </h2>
                                                    {activeFaq === 2 && (
                                                        <div className="accordion-collapse show">
                                                            <div className="accordion-body">
                                                                <p className="mb-0">No es obligatoria por ley, pero muchas empresas la requieren como condición para trabajar con ellas. También es esencial para competir en mercados internacionales.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="accordion-items">
                                                    <h2 className="accordion-header" id="headingFour">
                                                        <button
                                                            className={`accordion-buttons ${activeFaq === 3 ? '' : 'collapsed'}`}
                                                            type="button"
                                                            onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                                                        >
                                                            ¿Cuánto cuesta obtener la certificación {certification.name}?
                                                            <i className={`ri-${activeFaq === 3 ? 'subtract' : 'add'}-line`}></i>
                                                        </button>
                                                    </h2>
                                                    {activeFaq === 3 && (
                                                        <div className="accordion-collapse show">
                                                            <div className="accordion-body">
                                                                <p className="mb-0">El costo varía según el tamaño de la organización y la complejidad del sistema. Incluye costos de consultoría, implementación, auditoría y certificación anual.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-xl-4 col-lg-4 col-12 order-xl-0 order-lg-0">
                            <div className="tv-sidebar-area">
                                <div className="tv-widget widget mb-40 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                                    <ul>
                                        {(showAllCertifications ? allCertifications : allCertifications.slice(0, 6)).map(cert => (
                                            <li key={cert.id} className="cat-item">
                                                <Link to={buildCountryUrl(`/certificacion-iso/${cert.slug}`)}>{cert.name}</Link>
                                                <span><i className="ri-arrow-right-line"></i></span>
                                            </li>
                                        ))}
                                    </ul>
                                    {allCertifications.length > 6 && (
                                        <div className="tv-widget-btn text-center mt-20">
                                            <button
                                                className="tv-btn-sm"
                                                onClick={() => setShowAllCertifications(!showAllCertifications)}
                                            >
                                                {showAllCertifications ? 'Ver menos' : 'Ver más'}
                                                <i className={`ri-arrow-${showAllCertifications ? 'up' : 'down'}-line`}></i>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="tv-widget widget mb-30 wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
                                    <div className="tv-widget-content">
                                        <h4>¿Necesitas Ayuda?</h4>
                                        <p>¿Necesitas soporte en {currentCountry.name}? Contáctanos 24/7 para acompañarte en tu proceso.</p>
                                        <div className="widget-contact-wrap-area mt-40">
                                            <div className="widget-contact-wrap d-flex align-items-center">
                                                <div className="icon">
                                                    <i className="ri-phone-line"></i>
                                                </div>
                                                <div className="contact-info">
                                                    <p>Llámanos</p>
                                                    <h5><a href={helpPhoneHref}>{helpPhone}</a></h5>
                                                </div>
                                            </div>
                                            <div className="widget-contact-wrap d-flex align-items-center">
                                                <div className="icon">
                                                    <i className="ri-mail-line"></i>
                                                </div>
                                                <div className="contact-info">
                                                    <p>Email</p>
                                                    <h5><a href={`mailto:${helpEmail} `}>{helpEmail}</a></h5>
                                                </div>
                                            </div>
                                            <div className="widget-contact-wrap d-flex align-items-center">
                                                <div className="icon">
                                                    <i className="ri-map-pin-line"></i>
                                                </div>
                                                <div className="contact-info">
                                                    <p>Dirección de Oficina</p>
                                                    <h5>
                                                        <a href={helpMapUrl} target="_blank" rel="noopener noreferrer">
                                                            {helpAddress}
                                                        </a>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
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

export default CertificationDetail;
