import React from 'react';

// Función para obtener la bandera según el país (usa códigos normalizados)
const getCountryFlag = (country: string | undefined): string => {
    const normalized = (country || '').toString().trim().toUpperCase();
    const flagMap: Record<string, string> = {
        'PERU': '🇵🇪',
        'PERÚ': '🇵🇪',
        'PE': '🇵🇪',
        'MEXICO': '🇲🇽',
        'MÉXICO': '🇲🇽',
        'MX': '🇲🇽',
        'COLOMBIA': '🇨🇴',
        'CO': '🇨🇴',
        'CHILE': '🇨🇱',
        'CL': '🇨🇱',
        'ARGENTINA': '🇦🇷',
        'AR': '🇦🇷',
        'BRAZIL': '🇧🇷',
        'BRASIL': '🇧🇷',
        'BR': '🇧🇷',
        'SPAIN': '🇪🇸',
        'ESPAÑA': '🇪🇸',
        'ES': '🇪🇸',
        'UNITED STATES': '🇺🇸',
        'USA': '🇺🇸',
        'US': '🇺🇸',
        'ECUADOR': '🇪🇨',
        'EC': '🇪🇨',
        'PANAMA': '🇵🇦',
        'PANAMÁ': '🇵🇦',
        'PA': '🇵🇦',
        'COSTA RICA': '🇨🇷',
        'CR': '🇨🇷',
        'BOLIVIA': '🇧🇴',
        'BO': '🇧🇴'
    };

    return flagMap[normalized] || '🏳️';
};

export interface SearchSuggestion {
    companyName: string;
    country: string;
    recordCount?: number;
    searchType?: 'certificate' | 'company';
    [key: string]: any;
}

interface SearchSuggestionsProps {
    suggestions: SearchSuggestion[];
    onSelectSuggestion: (suggestion: SearchSuggestion) => void;
    isLoading?: boolean;
    hasQuery?: boolean;
    customStyle?: React.CSSProperties;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSelectSuggestion, isLoading, hasQuery = false, customStyle }) => {
    if (isLoading) {
        return (
            <div className="AdvancedSearchInput_single-search__suggestions-container__17hBW AdvancedSearchInput_single-search__suggestions-container--focused__1znH4" id="react-autowhatever-1" role="listbox" style={customStyle}>
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Buscando...</span>
                    </div>
                    <p className="mt-2">Buscando sugerencias...</p>
                </div>
            </div>
        );
    }

    if (!suggestions || suggestions.length === 0) {
        return (
            <div className="AdvancedSearchInput_single-search__suggestions-container__17hBW AdvancedSearchInput_single-search__suggestions-container--focused__1znH4" id="react-autowhatever-1" role="listbox" style={customStyle}>
                <div className="text-center my-4">
                    {hasQuery ? "No se encontraron resultados para su búsqueda" : "Escriba al menos 1 carácter para ver sugerencias"}
                </div>
            </div>
        );
    }

    return (
        <div className="AdvancedSearchInput_single-search__suggestions-container__17hBW AdvancedSearchInput_single-search__suggestions-container--focused__1znH4" id="react-autowhatever-1" role="listbox" style={customStyle}>
            {suggestions.map((suggestion, index) => (
                <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => onSelectSuggestion(suggestion)}
                    style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px',
                        transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    {/* Flag Icon */}
                    <div
                        className="country-flag-emoji"
                        style={{
                            fontSize: '20px',
                            flexShrink: 0,
                            marginTop: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '28px',
                            height: '20px'
                        }}
                    >
                        {getCountryFlag(suggestion.country)}
                    </div>

                    {/* Company Info */}
                    <div className="suggestion-content" style={{ flex: 1 }}>
                        <div
                            className="company-name"
                            style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#1f2937',
                                marginBottom: '8px',
                                lineHeight: '1.3'
                            }}
                        >
                            {suggestion.companyName}
                        </div>
                        <div
                            className="result-count"
                            style={{
                                color: '#2563eb',
                                fontSize: '15px',
                                fontWeight: '500',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            {suggestion.searchType === 'certificate'
                                ? 'Código de certificado único'
                                : `${suggestion.recordCount} registro${suggestion.recordCount !== 1 ? 's' : ''} encontrado${suggestion.recordCount !== 1 ? 's' : ''}, ver más resultados aquí`
                            }
                        </div>
                    </div>
                </div>
            ))}

            {/* Login Prompt */}
            <div
                className="login-prompt"
                style={{
                    textAlign: 'center',
                    padding: '20px 24px',
                    background: '#f9fafb',
                    borderRadius: '0 0 32px 32px',
                    borderTop: '1px solid #e5e7eb',
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: '500'
                }}
            >
                Inicie sesión o regístrese para ver más resultados.
            </div>
        </div>
    );
};

export default SearchSuggestions;
