import React, { useEffect, useState, useMemo, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
// @ts-ignore
import AnimationInit from '../AnimationInit/AnimationInit';
import { GLOBAL_SEARCH_INDEX, SearchIndexItem } from '../../config/searchIndex';
import { getCurrentCountry } from '../../config/countries';
import { useBuildCountryUrl } from '../../hooks/useBuildCountryUrl';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { buildUrl } = useBuildCountryUrl();
    const [searchQuery, setSearchQuery] = useState('');
    const currentCountry = getCurrentCountry(location.pathname);
    const currentCountryCode = currentCountry.code || 'global';

    useEffect(() => {
        const hidePreloader = () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }
        };
        const timer = setTimeout(hidePreloader, 300);
        return () => clearTimeout(timer);
    }, []);

    const sanitizeInput = (value: string): string => {
        if (!value) return '';
        let cleaned = value.replace(/[<>]/g, '');
        cleaned = cleaned.replace(/['"`]/g, '');
        cleaned = cleaned.replace(/(--|;|\/\*|\*\/)/g, ' ');
        cleaned = cleaned.replace(/\s+/g, ' ');
        return cleaned.slice(0, 120);
    };

    const normalizedQuery = sanitizeInput(searchQuery).toLowerCase();

    const filteredResults = useMemo(() => {
        if (!normalizedQuery) return [];

        const isAllowedCountry = (item: SearchIndexItem) => {
            if (!item.countries || item.countries.length === 0) return true;
            return item.countries.includes(currentCountryCode) || item.countries.includes('global');
        };

        return GLOBAL_SEARCH_INDEX
            .filter((item) => isAllowedCountry(item))
            .filter((item) => {
                const haystack = [item.title, item.description, ...(item.keywords || [])]
                    .join(' ')
                    .toLowerCase();
                return haystack.includes(normalizedQuery);
            })
            .slice(0, 20);
    }, [normalizedQuery, currentCountryCode]);

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!normalizedQuery) return;

        navigate('/search-results', {
            state: {
                searchQuery: searchQuery.trim(),
                searchResults: filteredResults,
                searchType: 'global',
            },
        });

        // Cerrar popup del template si está abierto
        const popup = document.querySelector('.search__popup');
        if (popup && popup.classList.contains('search-opened')) {
            popup.classList.remove('search-opened');
            document.body.classList.remove('search-opened');
        }
    };

    const handleCloseSearchPopup = () => {
        const popup = document.querySelector('.search__popup');
        if (popup && popup.classList.contains('search-opened')) {
            popup.classList.remove('search-opened');
            document.body.classList.remove('search-opened');
        }
        setSearchQuery('');
    };

    const handleSelectSuggestion = (item: SearchIndexItem) => {
        const targetPath = buildUrl(item.path);
        navigate(targetPath);
        handleCloseSearchPopup();
    };

    return (
        <div className="page-wrapper">
            {/* Preloader */}
            <div id="preloader">
                <div className="preloader">
                    <span></span>
                    <span></span>
                </div>
            </div>

            {/* Magic Cursor */}
            <div id="magic-cursor">
                <div id="ball"></div>
            </div>

            {/* Back to Top Button */}
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="ri-arrow-up-double-line"></i>
            </button>

            {/* Search Popup */}
            <div className="search__popup">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="search__popup__content">
                                <form onSubmit={handleSearchSubmit}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="text"
                                            placeholder="Buscar vistas, ISO, sectores..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))}
                                            style={{ flex: 1 }}
                                        />
                                        <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="ri-search-line"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className="search__popup__close"
                                            onClick={handleCloseSearchPopup}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <i className="ri-close-line"></i>
                                        </button>
                                    </div>
                                </form>

                                {filteredResults.length > 0 && (
                                    <div
                                        style={{
                                            marginTop: '12px',
                                            background: '#fff',
                                            borderRadius: '8px',
                                            boxShadow: '0 8px 20px rgba(15,23,42,0.12)',
                                            maxHeight: '260px',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <ul style={{ listStyle: 'none', margin: 0, padding: '4px 0' }}>
                                            {filteredResults.map((item) => (
                                                <li key={item.path}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectSuggestion(item)}
                                                        style={{
                                                            width: '100%',
                                                            padding: '10px 14px',
                                                            border: 'none',
                                                            background: 'transparent',
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
                                                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                                    >
                                                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{item.title}</div>
                                                        {item.description && (
                                                            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                                                                {item.description}
                                                            </div>
                                                        )}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="main-content" style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', width: '100%', maxWidth: 'none' }}>

                <div className="content-wrapper" style={{ flex: 1, minWidth: 0, width: '100%' }}>
                    {children}
                </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Animation Initialization */}
            <AnimationInit />
        </div>
    );
};

export default Layout;
