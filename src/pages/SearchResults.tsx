import { useLocation, useNavigate } from 'react-router-dom';
import VerificationForm from '../components/CertificateVerification/VerificationForm';
import '../assets/css/iaf-certsearch-exact.css';

interface SearchResult {
    companyName?: string;
    name?: string;
    country: string;
    certificates: number;
    standards: number;
    locations: number;
    registrationNumber?: string;
    token?: string;
    id?: string;
    companyId?: string;
}

interface LocationState {
    searchQuery?: string;
    searchResults?: SearchResult[];
}

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;

    // Obtener los datos de búsqueda desde la navegación
    const searchQuery = state?.searchQuery ?? '';
    const searchResults: SearchResult[] = state?.searchResults ?? [];

    const handleViewCertificate = (result: SearchResult) => {
        // Si es búsqueda por código de certificado, navegar directamente al detalle
        if (result.registrationNumber) {
            // Usar token si está disponible, sino registration number (legacy)
            const identifier = result.token || result.registrationNumber;
            const param = result.token ? 'token' : 'code';
            navigate(`/certificate?${param}=${identifier}`);
        } else if (result.token || result.id || result.companyId) {
            // Navegar al perfil de la empresa usando token (seguro)
            const identifier = result.token || result.id || result.companyId;
            const companyName = result.companyName || result.name;
            const param = result.token ? 'token' : 'id';
            navigate(`/company-results?${param}=${identifier}&name=${encodeURIComponent(companyName || '')}`);
        } else {
            console.log('Ver certificados de empresa:', result);
            alert(`Mostrar certificados de ${result.companyName}`);
        }
    };

    const handleNewSearch = async (data: { registrationNumber: string }) => {
        // Volver a la página de verificación con la nueva búsqueda
        navigate('/verify-certificate', { state: { initialSearch: data.registrationNumber } });
    };

    return (
        <div className="search-results-page">
            {/* Header Section con Background Azul */}
            <div className="Section_section__LUJCW Hero_hero-section__stARX" style={{ minHeight: '40vh' }}>
                <div className="Section_section--container__3G43I container">
                    <div className="SectionContents_section-contents__2WXJ0 row">
                        <div className="col-12">
                            <div className="Hero_hero-section--contents__3JT_i">
                                {/* Search Form */}
                                <div className="HeroSearch_search__3jwd7">
                                    <VerificationForm
                                        checkCertification={handleNewSearch}
                                        buttonLoading={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="container" style={{ marginTop: '-50px', position: 'relative', zIndex: 10 }}>
                <div className="row">
                    <div className="col-12">
                        {/* Results Summary */}
                        <div className="results-message mb-4">
                            <span className="results-text">
                                {searchResults.length} Registro(s) encontrado(s) para "{searchQuery}"
                            </span>
                            <div className="filter-dropdown">
                                <i className="ri-arrow-down-s-line"></i>
                                <span>Filtrar por País</span>
                            </div>
                        </div>

                        {/* Results Cards */}
                        <div className="results-cards">
                            {searchResults.map((result, index) => (
                                <div key={index} className="result-card">
                                    <div className="card-header">
                                        <h3 className="company-name">{result.companyName}</h3>
                                        <div className="location">
                                            <i className="ri-map-pin-fill"></i>
                                            <span>{result.country}</span>
                                        </div>
                                    </div>
                                    <div className="certification-summary">
                                        <div className="summary-item green">
                                            <span className="count">{result.certificates}</span>
                                            <span className="label">Certificado(s)</span>
                                        </div>
                                        <div className="summary-item blue">
                                            <span className="count">{result.standards}</span>
                                            <span className="label">Estándar(es)</span>
                                        </div>
                                        <div className="summary-item yellow">
                                            <span className="count">{result.locations}</span>
                                            <span className="label">Ubicación(es)</span>
                                        </div>
                                    </div>
                                    <div className="card-action">
                                        <button
                                            className="view-certificates-btn"
                                            onClick={() => handleViewCertificate(result)}
                                        >
                                            Ver Certificado(s) →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
