import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerificationForm from '../components/CertificateVerification/VerificationForm';
import CardSkeleton from '../components/CertificateVerification/CardSkeleton';
import CardPlaceholder from '../components/CertificateVerification/CardPlaceholder';
import '../assets/css/iaf-certsearch-exact.css';

interface FormValues {
    registrationNumber?: string;
}

interface SearchResultItem {
    id: string | number;
    companyName: string;
    country: string;
    certificates: number;
    standards: number;
    locations: number;
    registrationNumber?: string;
    status?: string;
    issueDate?: string;
    expiryDate?: string;
    lastCertificationDate?: string;
}

const CertificateVerification = () => {
    const navigate = useNavigate();
    const [startPlaceholder, setStartPlaceholder] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);


    const sanitizeInput = (value: string): string => {
        if (!value) return '';
        let cleaned = value.replace(/[<>]/g, '');
        cleaned = cleaned.replace(/['"`]/g, '');
        cleaned = cleaned.replace(/(--|;|\/\*|\*\/)/g, ' ');
        cleaned = cleaned.replace(/\s+/g, ' ');
        return cleaned.slice(0, 120);
    };

    const checkCertification = async (values: FormValues) => {
        setStartPlaceholder(false);
        setButtonLoading(true);

        try {
            const query = sanitizeInput(values.registrationNumber || '');

            // Determinar si es búsqueda por código de certificado o nombre de empresa
            // Acepta: IC-QM-2511191, IC-UNE20-2511001, IC-UNE58-2511001, etc.
            const isCertificateCode = /^[A-Z]{1,4}-[A-Z0-9]{2,8}-\d+$/i.test(query);

            let searchResults: SearchResultItem[] = [];

            // Usar servicio centralizado Clean Architecture
            const { certificacionesCleanApi } = await import('../services/certificacionesCleanApi');
            const searchResult = await certificacionesCleanApi.search(query);

            const results = searchResult.results || [];

            if (isCertificateCode && results.length > 0) {
                // Resultado único de certificado (o el primero que coincida con el código)
                const cert = results[0]!;
                searchResults = [{
                    id: cert.id,
                    companyName: typeof cert.company === 'string' ? cert.company : (cert.company?.name || 'Empresa Desconocida'),
                    country: 'PE', // El backend actual no devuelve país en búsqueda simple, se asume PE o se ajustará
                    certificates: 1,
                    standards: 1,
                    locations: 1,
                    registrationNumber: (cert as any).registration_number || (cert as any).number,
                    status: cert.status,
                    issueDate: cert.issue_date,
                    expiryDate: cert.expiry_date
                }];
            } else if (results.length > 0) {
                // Búsqueda por nombre de empresa (agrupar resultados por empresa)
                const companiesMap: { [key: string]: SearchResultItem } = {};

                results.forEach((cert: any) => {
                    const companyId = cert.company_id || 'unknown';
                    if (!companiesMap[companyId]) {
                        companiesMap[companyId] = {
                            id: companyId,
                            companyName: typeof cert.company === 'string' ? cert.company : (cert.company?.name || 'Empresa Desconocida'),
                            country: 'PE', // Default
                            certificates: 0,
                            standards: 0,
                            locations: 1,
                            lastCertificationDate: cert.issue_date
                        };
                    }
                    companiesMap[companyId].certificates++;
                });

                searchResults = Object.values(companiesMap);

                // Si hay más resultados, agregar información de paginación
                if (searchResult.count > results.length) {
                    console.log(`Mostrando ${results.length} de ${searchResult.count} resultados encontrados.`);
                }
            }

            // Navegar a la vista de resultados con los datos
            navigate('/search-results', {
                state: {
                    searchQuery: query,
                    searchResults: searchResults,
                    searchType: isCertificateCode ? 'certificate' : 'company'
                }
            });

            if (searchResults.length > 0) {
                toast.success(`Operación exitosa: ${searchResults.length} resultado(s) encontrado(s)`);
            } else {
                toast.warning("Sin resultados: No se encontraron resultados para la búsqueda");
            }
            setButtonLoading(false);
        } catch (error) {
            console.error('Error al verificar certificado:', error);
            toast.error("Error al realizar la búsqueda. Por favor, intente nuevamente.");
            setButtonLoading(false);
        }
    };

    // Efecto para manejar data-background y animaciones
    useEffect(() => {
        // Aplicar data-background a elementos que lo necesiten
        const elementsWithBackground = document.querySelectorAll('[data-background]');
        elementsWithBackground.forEach(element => {
            const backgroundImage = element.getAttribute('data-background');
            if (backgroundImage) {
                (element as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
            }
        });

        // Inicializar animaciones WOW si están disponibles
        if ((window as any).WOW) {
            new (window as any).WOW().init();
        }
    }, []);

    return (
        <>
            {/* Hero Section - IAF CertSearch Exact Structure */}
            <div className="Section_section__LUJCW Hero_hero-section__stARX" style={{ overflow: 'visible' }}>
                <div className="Section_section--container__3G43I container" style={{ overflow: 'visible' }}>
                    <div className="SectionContents_section-contents__2WXJ0 row" style={{ overflow: 'visible' }}>
                        <div className="col-12">
                            <div className="Hero_hero-section--contents__3JT_i" style={{ overflow: 'visible' }}>
                                <div className="Hero_hero-section--contents--hero__3Rcjs">
                                    <div className="SectionContentsHero_hero__3rBtP">
                                        <h1 className="text-center">
                                            <span className="Hero_hero-section--contents--tertiary__TZ6e9">Verifica tus certificaciones</span><br />
                                            <span className="Hero_hero-section--contents--tertiary__TZ6e9">ISO con INTERCERT</span>
                                        </h1>
                                        <h5 className="text-center">
                                            <p>Consulta la vigencia de certificados emitidos por<br />Intercert y organiza tus auditorías con información oficial.</p>
                                        </h5>
                                    </div>
                                </div>

                                {/* Search Form */}
                                <div className="HeroSearch_search__3jwd7" style={{ position: 'relative', zIndex: 100 }}>
                                    <VerificationForm
                                        checkCertification={checkCertification}
                                        buttonLoading={buttonLoading}
                                    />
                                </div>

                                {/* Hero Stats */}
                                <div className="HeroStats_hero-stats__mqeJF text-center">
                                    <div className="HeroStats_hero-stats--content__aBb0P">
                                        <p style={{ color: '#0A165E' }}>+50,000</p>
                                        <h5 style={{ color: '#0A165E' }}>Empresas certificadas</h5>
                                    </div>
                                    <div className="HeroStats_hero-stats--content__aBb0P">
                                        <p style={{ color: '#0A165E' }}>+17</p>
                                        <h5 style={{ color: '#0A165E' }}>Años de experiencia</h5>
                                    </div>
                                    <div className="HeroStats_hero-stats--content__aBb0P">
                                        <p style={{ color: '#0A165E' }}>+3</p>
                                        <h5 style={{ color: '#0A165E' }}>Organismo acreditado internacionalmente</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-12">
                        {startPlaceholder && <CardPlaceholder />}
                        {buttonLoading && <CardSkeleton />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CertificateVerification;
