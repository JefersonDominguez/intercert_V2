import React from 'react';

export interface SearchResultItem {
    companyName: string;
    country: string;
    certificates: number;
    standards: number;
    locations: number;
    // Add other properties as needed based on actual data structure
    [key: string]: any;
}

interface SearchResultsProps {
    searchQuery: string;
    results: SearchResultItem[];
    onViewCertificate: (result: SearchResultItem) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, results, onViewCertificate }) => {
    return (
        <div className="search-results-container">
            {/* Header con mensaje de búsqueda */}
            <div className="search-results-header">
                <h2 className="search-results-title">
                    Autenticar certificaciones acreditadas
                </h2>
                <p className="search-results-subtitle">
                    Verifique quién posee una certificación acreditada dentro de su cadena de suministro.
                </p>
            </div>

            {/* Barra de búsqueda (reutilizada) */}
            <div className="search-bar-container">
                {/* Aquí se integrará el VerificationForm */}
            </div>

            {/* Mensaje de resultados */}
            <div className="results-message">
                <span className="results-text">
                    No se encontraron registros para "{searchQuery}"
                </span>
                <div className="filter-dropdown">
                    <i className="ri-arrow-down-s-line"></i>
                    <span>Filtrar por país</span>
                </div>
            </div>

            {/* Tarjetas de resultados */}
            <div className="results-cards">
                {results.map((result, index) => (
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
                                <span className="label">ubicación(es)</span>
                            </div>
                        </div>

                        <div className="card-action">
                            <button
                                className="view-certificates-btn"
                                onClick={() => onViewCertificate(result)}
                            >
                                Ver certificado(s) →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="search-results-footer">
                <a href="/" className="footer-link">Hogar</a>
                <a href="/accreditation-bodies" className="footer-link">Lista de organismos de acreditación</a>
                <a href="/plans" className="footer-link">Planes</a>
            </div>
        </div>
    );
};

export default SearchResults;
