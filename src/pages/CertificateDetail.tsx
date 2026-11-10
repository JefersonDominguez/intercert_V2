import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import QRCode from 'qrcode';
import { Launch } from '@mui/icons-material';
import { certificacionesCleanApi } from '../services/certificacionesCleanApi';
// @ts-ignore
import VerificationForm from '../components/CertificateVerification/VerificationForm';
import SearchSuggestions, { SearchSuggestion } from '../components/CertificateVerification/SearchSuggestions';
import '../assets/css/iaf-certsearch-exact.css';

// Interfaces
interface Certificate {
    id: number;
    company_id: number;
    company_name: string;
    company_country?: string;
    company_address?: string;
    company_addresses?: string[];
    number: string;
    registration_number?: string;
    certificate_number?: string;
    standard_name: string;
    standard_code?: string;
    iso_standard_code?: string;
    iso_standard_name?: string;
    status: string;
    issue_date: string;
    expiry_date: string;
    initial_certification_date?: string;
    recertification_date?: string;
    scope?: string;
    public_token?: string;
    company_token?: string;
    iaf_code?: string;
    nace_code?: string;
    accreditation_body_logo?: string;
    certification_body_logo?: string;
    file_url?: string;
}

const COUNTRY_LABELS: { [key: string]: string } = {
    'PERU': 'Perú', 'PERÚ': 'Perú', 'PE': 'Perú',
    'MEXICO': 'México', 'MÉXICO': 'México', 'MX': 'México',
    'COLOMBIA': 'Colombia', 'CO': 'Colombia',
    'CHILE': 'Chile', 'CL': 'Chile',
    'ARGENTINA': 'Argentina', 'AR': 'Argentina',
    'ECUADOR': 'Ecuador', 'EC': 'Ecuador',
    'PANAMA': 'Panamá', 'PANAMÁ': 'Panamá', 'PA': 'Panamá',
    'COSTA RICA': 'Costa Rica', 'CR': 'Costa Rica',
    'BOLIVIA': 'Bolivia', 'BO': 'Bolivia',
    'UNITED STATES': 'Estados Unidos', 'US': 'Estados Unidos', 'USA': 'Estados Unidos',
};

const formatCountryName = (country: string | undefined) => {
    if (!country) return 'N/A';
    const normalized = country.toString().trim().toUpperCase();
    return COUNTRY_LABELS[normalized] || country;
};

const CertificateDetail = () => {
    const [isScopeExpanded, setIsScopeExpanded] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const [otherCertificates, setOtherCertificates] = useState<Certificate[]>([]);
    const [loadingOtherCertificates, setLoadingOtherCertificates] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Función para buscar sugerencias
    const searchSuggestions = async (query: string) => {
        if (!query || query.length < 1) {
            setSuggestions([]);
            return;
        }

        setIsLoadingSuggestions(true);

        try {
            const newSuggestions: SearchSuggestion[] = [];
            const isCertificateCode = /^[A-Z]{1,2}-[A-Z0-9]{2,6}-\d+$/i.test(query);
            const searchResult = await certificacionesCleanApi.search(query) as any;

            if (searchResult?.results && searchResult.results.length > 0) {
                if (isCertificateCode) {
                    searchResult.results.forEach((cert: any) => {
                        newSuggestions.push({
                            companyName: cert.company || cert.company_name || 'Empresa desconocida',
                            recordCount: 1,
                            registrationNumber: cert.number,
                            certificateToken: cert.public_token,
                            searchType: 'certificate',
                            country: cert.company_country || 'Perú'
                        });
                    });
                } else {
                    const companiesMap: Record<number, SearchSuggestion> = {};
                    searchResult.results.forEach((cert: any) => {
                        let companyEntry = companiesMap[cert.company_id];
                        if (!companyEntry) {
                            companyEntry = {
                                companyName: cert.company || cert.company_name || 'Empresa desconocida',
                                recordCount: 0,
                                registrationNumber: '',
                                searchType: 'company',
                                country: cert.company_country || 'Perú',
                                companyId: cert.company_id,
                                companyToken: cert.company_token || null
                            };
                            companiesMap[cert.company_id] = companyEntry;
                        }
                        companyEntry.recordCount = (companyEntry.recordCount || 0) + 1;
                    });
                    newSuggestions.push(...Object.values(companiesMap));
                }
            }
            setSuggestions(newSuggestions);
        } catch (error) {
            console.error('Error al buscar sugerencias:', error);
            setSuggestions([]);
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    // Debounce para sugerencias
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue && searchValue.length >= 1) {
                searchSuggestions(searchValue);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
        if (suggestion.searchType === 'company') {
            const param = suggestion.companyToken ? 'token' : 'id';
            const identifier = suggestion.companyToken || suggestion.companyId;
            window.location.href = `/company-results?${param}=${identifier}&name=${encodeURIComponent(suggestion.companyName)}`;
        } else {
            setSearchValue(suggestion.registrationNumber);
            setShowSuggestions(false);
            setSuggestions([]);
            const param = suggestion.certificateToken ? 'token' : 'code';
            const identifier = suggestion.certificateToken || suggestion.registrationNumber;
            window.location.href = `/certificate?${param}=${identifier}`;
        }
    };

    // Obtener identificador
    const token = searchParams.get('token');
    const code = searchParams.get('code');

    let identifier: string | null = null;
    let identifierType: 'token' | 'code' | null = null;

    if (token) {
        identifier = token;
        identifierType = 'token';
    } else if (code) {
        identifier = code;
        identifierType = 'code';
    }

    const companyResultsLink = certificate ? (() => {
        const params = new URLSearchParams();
        if (certificate.company_id) params.append('id', certificate.company_id.toString());
        if (certificate.company_name) params.append('name', certificate.company_name);
        return `/company-results?${params.toString()}`;
    })() : null;

    useEffect(() => {
        if (identifier) {
            fetchCertificateDetails();
        } else {
            setLoading(false);
        }
    }, [identifier, token, code]);

    useEffect(() => {
        if (certificate) {
            generateQRCode();
            fetchOtherCertificates();
            if (certificate.file_url) {
                document.getElementById('certificado-pdf')?.scrollIntoView({ block: 'start' });
            }
        }
    }, [certificate]);

    const generateQRCode = async () => {
        try {
            const certToken = certificate?.public_token;
            const qrUrl = certToken
                ? `${window.location.origin}/certificate?token=${certToken}`
                : `${window.location.origin}/certificate?code=${identifier}`;

            const qrDataUrl = await QRCode.toDataURL(qrUrl, {
                width: 150,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            setQrCodeDataUrl(qrDataUrl);
        } catch (err) {
            console.error('Error generating QR code:', err);
        }
    };

    const fetchOtherCertificates = async () => {
        if (!certificate) return;
        try {
            setLoadingOtherCertificates(true);
            const data = await certificacionesCleanApi.getCompanyCertificates(certificate.company_id);
            // @ts-ignore
            const otherCerts = (data.certificates || data || []).filter((c: any) => c.id !== certificate.id);
            setOtherCertificates(otherCerts);
        } catch (error) {
            console.error('Error fetching other certificates:', error);
            setOtherCertificates([]);
        } finally {
            setLoadingOtherCertificates(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchValue.trim()) return;
        setButtonLoading(true);

        try {
            const query = searchValue.trim();
            const isCertificateCode = /^[A-Z]{1,4}-[A-Z0-9]{2,8}-\d+$/i.test(query);
            let searchResults: any[] = [];

            const searchResult = await certificacionesCleanApi.search(query);
            // @ts-ignore
            const results = searchResult.results || searchResult || [];

            if (results.length > 0) {
                if (isCertificateCode && results.length === 1) {
                    const cert = results[0] as any;
                    searchResults = [{
                        id: cert.id,
                        companyName: cert.company_name || cert.company,
                        country: cert.company_country || 'Perú',
                        certificates: 1,
                        standards: 1,
                        locations: 1,
                        registrationNumber: cert.number,
                        status: cert.status,
                        issueDate: cert.issue_date,
                        expiryDate: cert.expiry_date,
                        public_token: cert.public_token
                    }];
                } else {
                    const companiesMap: any = {};
                    results.forEach((cert: any) => {
                        const companyId = cert.company_id || 0;
                        if (!companiesMap[companyId]) {
                            companiesMap[companyId] = {
                                id: companyId,
                                companyName: cert.company_name || cert.company || 'Empresa Desconocida',
                                country: cert.company_country || 'Perú',
                                certificates: 0,
                                standards: new Set(),
                                locations: 1,
                                lastCertificationDate: cert.issue_date,
                                token: cert.company_token
                            };
                        }
                        companiesMap[companyId].certificates++;
                        companiesMap[companyId].standards.add(cert.standard_name || cert.standard || 'ISO');
                        if (new Date(cert.issue_date) > new Date(companiesMap[companyId].lastCertificationDate)) {
                            companiesMap[companyId].lastCertificationDate = cert.issue_date;
                        }
                    });
                    searchResults = Object.values(companiesMap).map((c: any) => ({
                        ...c,
                        standards: c.standards.size
                    }));
                }
            }

            navigate('/search-results', {
                state: {
                    searchQuery: query,
                    searchResults: searchResults,
                    searchType: isCertificateCode ? 'certificate' : 'company'
                }
            });

            if (searchResults.length > 0) {
                toast.success("Operación exitosa", {
                    // @ts-ignore
                    description: `${searchResults.length} resultado(s) encontrado(s)`,
                });
            } else {
                toast.warning("Sin resultados", {
                    // @ts-ignore
                    description: "No se encontraron resultados para la búsqueda",
                });
            }
        } catch (error) {
            console.error('Error al buscar:', error);
            toast.error("Error al realizar la búsqueda");
        } finally {
            setButtonLoading(false);
        }
    };

    const fetchCertificateDetails = async (retryCount = 0) => {
        if (!identifier) return;
        try {
            setLoading(true);
            const data = await certificacionesCleanApi.verify(
                identifier,
                identifierType === 'token' ? 'token' : 'number'
            );

            if (data.certificate) {
                const cert = data.certificate as any;
                cert.registration_number = cert.number;
                setCertificate(cert);
            } else {
                setError('Certificado no encontrado');
            }
        } catch (err: any) {
            if (err.response?.status === 429 && retryCount < 3) {
                setTimeout(() => fetchCertificateDetails(retryCount + 1), 2 ** retryCount * 1000);
                return;
            }
            setError('Certificado no encontrado o error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        
        // Handle ISO date strings (YYYY-MM-DD) without timezone shift
        const isoMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (isoMatch && isoMatch[1] && isoMatch[2] && isoMatch[3]) {
            const year = parseInt(isoMatch[1], 10);
            const month = parseInt(isoMatch[2], 10);
            const day = parseInt(isoMatch[3], 10);
            
            // Create date in local time to avoid UTC shift
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return 'N/A';
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string | undefined) => {
        const s = status?.toLowerCase() || '';
        if (s === 'active' || s === 'valid' || s === 'activo') return 'rgb(0, 133, 42)';
        if (s === 'expired' || s === 'invalid' || s === 'vencido') return '#dc3545';
        if (s === 'pending' || s === 'pendiente') return '#ffc107';
        return '#6c757d';
    };

    const getStatusText = (status: string | undefined) => {
        return status || 'Desconocido';
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    <h4>Error</h4>
                    <p>{error || 'Certificado no encontrado'}</p>
                    <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
                </div>
            </div>
        );
    }

    const countryDisplay = formatCountryName(certificate.company_country);

    return (
        <main className="main-content">
            <div className="container">
                {/* Search Bar */}
                <div className="mt-4 mb-4">
                    <div className="HeroSearch_search__3jwd7">
                        <form onSubmit={handleSearch}>
                            <div role="combobox" aria-haspopup="listbox" aria-expanded="false" className="AdvancedSearchInput_single-search__input-container__1RZZb">
                                <div className="d-flex align-items-center bg-white w-100" style={{
                                    borderRadius: showSuggestions ? '24px 24px 0 0' : '50px',
                                    border: '2px solid #1a237e',
                                    borderBottom: showSuggestions ? 'none' : '2px solid #1a237e',
                                    padding: '2px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    position: 'relative',
                                    zIndex: 1001
                                }}>
                                    <input
                                        placeholder="Ingrese la empresa por nombre o número de certificación"
                                        autoComplete="off"
                                        id="single-search-input"
                                        className="form-control border-0 shadow-none bg-transparent"
                                        maxLength={100}
                                        style={{ fontSize: '16px', paddingLeft: '10px', color: '#495057' }}
                                        type="text"
                                        name="registrationNumber"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary rounded-pill px-4"
                                        disabled={buttonLoading}
                                        style={{
                                            backgroundColor: '#0a1f61',
                                            borderColor: '#0a1f61',
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingTop: '13px',
                                            paddingBottom: '13px',
                                            whiteSpace: 'nowrap',
                                            transition: 'none'
                                        }}
                                    >
                                        <i className="ri-search-line mr-2"></i>
                                        <span>
                                            {buttonLoading ? 'Buscando...' : 'Buscar'}
                                        </span>
                                    </button>
                                </div>
                                {showSuggestions && (
                                    <div style={{ position: 'relative', zIndex: 1000 }}>
                                        <SearchSuggestions
                                            suggestions={suggestions}
                                            onSelectSuggestion={handleSelectSuggestion}
                                            isLoading={isLoadingSuggestions}
                                            hasQuery={!!(searchValue && searchValue.length >= 1)}
                                            customStyle={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                border: '2px solid #1a237e',
                                                borderTop: 'none',
                                                borderRadius: '0 0 24px 24px',
                                                marginTop: '-2px',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                                backgroundColor: 'white',
                                                width: '100%',
                                                maxHeight: '300px',
                                                overflowY: 'auto'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Status Alert */}
                <div className="d-flex mt-5 border-0 alert alert-success fade show" role="alert" style={{ backgroundColor: getStatusColor(certificate.status) }}>
                    <div className="mr-3" style={{ flexShrink: 0 }}>
                        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-q7mezt" focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" style={{ marginTop: '-4px', fontSize: '20px', color: 'white', fill: 'white', width: '24px', height: '24px' }}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"></path>
                        </svg>
                    </div>
                    <div style={{ color: 'white' }}>
                        <b>Estado: {getStatusText(certificate.status)}</b>
                        <p className="m-0">Esta certificación está activa, cumpliendo con todos los estándares actuales establecidos por el organismo certificador.</p>
                    </div>
                </div>

                {/* Header Section */}
                <section className="list-unstyled d-flex align-items-center row">
                    <div className="col-12 col-xl-3 col">
                        <span className="mb-0">
                            <img className="" alt="INTERCERT" draggable="false" style={{ width: '120px', height: 'auto' }} src="/assets/images/logo-white copy.png" />
                        </span>
                    </div>
                    <div className="col-12 col-xl-6 d-flex flex-column justify-content-center align-items-center col">
                        <h1 className="text-uppercase font-weight-bold" style={{ fontSize: '2.5rem', color: 'rgb(51, 51, 51)', whiteSpace: 'nowrap' }}>
                            CONFIRMACIÓN DE CERTIFICADO
                        </h1>
                        <h2 className="font-weight-normal" style={{ fontSize: '1.5rem', color: 'rgb(102, 102, 102)' }}>
                            El Organismo de Certificación de INTERCERT LATAM
                        </h2>
                        <p className="font-weight-normal" style={{ fontSize: '1.2rem', color: 'rgb(102, 102, 102)' }}>
                            por la presente certifica que
                        </p>
                    </div>
                    <div className="col-xl-3 d-xl-flex justify-content-end col"></div>
                </section>

                {certificate.file_url && (
                    <section id="certificado-pdf" className="mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="font-weight-bold mb-0" style={{ fontSize: '1.5rem', color: '#333' }}>
                                Certificado
                            </h3>
                            <a
                                className="btn"
                                href={certificate.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: '#159dbc',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 16px',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                }}
                            >
                                Abrir certificado
                            </a>
                        </div>
                        <iframe
                            title={`Certificado ${certificate.number || certificate.registration_number || ''}`}
                            src={certificate.file_url}
                            style={{
                                width: '100%',
                                height: '820px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                background: '#fff',
                            }}
                        />
                    </section>
                )}

                <hr className="my-4" style={{ borderTop: '2px solid rgb(222, 226, 230)' }} />

                {/* Company & Standard Details */}
                <div className="position-relative">
                    <div
                        className="position-absolute"
                        style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'url("/assets/images/Intercert con R.png")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: '900px',
                            opacity: 0.08,
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />

                    <section className="position-relative" style={{ zIndex: 2 }}>
                        <div>
                            <div className="row justify-content-center">
                                <div className="col-xl-8">
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <h4 className="mb-1">
                                                <a href="#" className="text-decoration-none" style={{ fontSize: '1.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#159dbc' }}>
                                                    {certificate.company_name}
                                                </a>
                                            </h4>
                                            <h5 className="text-muted mb-0" style={{ fontSize: '1.1rem', textTransform: 'uppercase' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {certificate.company_address && certificate.company_address !== 'Dirección no disponible' && (
                                                        <div style={{ whiteSpace: 'pre-line' }}>
                                                            {certificate.company_address.trim()}
                                                        </div>
                                                    )}
                                                    {certificate.company_addresses && Array.isArray(certificate.company_addresses) && certificate.company_addresses.length > 0 && (
                                                        certificate.company_addresses.map((addr, index) => (
                                                            addr && addr.trim() && (
                                                                <div key={index} style={{ whiteSpace: 'pre-line' }}>
                                                                    {addr.trim()}
                                                                </div>
                                                            )
                                                        ))
                                                    )}
                                                    {(!certificate.company_address || certificate.company_address === 'Dirección no disponible') &&
                                                        (!certificate.company_addresses || certificate.company_addresses.length === 0) && (
                                                            <div>{certificate.company_country || 'País no disponible'}</div>
                                                        )}
                                                </div>
                                            </h5>
                                            <div className="text-center" style={{ marginTop: '5rem', marginBottom: '2rem' }}>
                                                <p style={{ fontSize: '1.1rem', color: '#666' }}>
                                                    ha sido evaluado y certificado, cumpliendo los requisitos de
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-3">
                                            <p className="font-weight-bold mb-2" style={{ color: '#666', fontSize: '1rem' }}>Norma ISO</p>
                                        </div>
                                        <div className="col-9">
                                            <h5 className="mb-1 font-weight-bold" style={{ color: '#333', fontSize: '1.3rem' }}>
                                                {(certificate.standard_code || certificate.iso_standard_code || certificate.standard_name || '').replace(/:(\d{4}):\1$/, ':$1')}
                                            </h5>
                                            <p className="text-muted mb-0" style={{ fontSize: '1rem' }}>
                                                {certificate.standard_name || certificate.iso_standard_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <p className="font-weight-bold mb-2" style={{ color: '#666', fontSize: '1rem' }}>Estado</p>
                                        </div>
                                        <div className="col-9">
                                            <div className="mb-2">
                                                <span
                                                    className="badge badge-pill text-white"
                                                    style={{
                                                        backgroundColor: getStatusColor(certificate.status),
                                                        fontSize: '0.9rem',
                                                        padding: '0.5rem 1rem'
                                                    }}
                                                >
                                                    {getStatusText(certificate.status)}
                                                </span>
                                            </div>
                                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                                Aprender más sobre los estados
                                                <a href="#" className="text-info ml-1">
                                                    <Launch style={{ fontSize: '14px' }} />
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <hr className="my-4" style={{ borderTop: '2px solid #dee2e6' }} />

                {/* Certificate Information */}
                <section>
                    <div>
                        <h3 className="font-weight-bold mb-4" style={{ fontSize: '1.5rem', color: '#333' }}>
                            Información del Certificado
                        </h3>
                        <div className="row">
                            <div className="col-xl-3">
                                <p className="font-weight-bold mb-1" style={{ color: '#666' }}>
                                    Número de Certificado
                                </p>
                            </div>
                            <div className="col-xl-9">
                                <span className="font-weight-normal" style={{ color: '#333' }}>
                                    {certificate.number || certificate.registration_number}
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3">
                                <p className="font-weight-bold mb-1" style={{ color: '#666' }}>
                                    País/Economía
                                </p>
                            </div>
                            <div className="col-xl-9">
                                <span className="font-weight-normal" style={{ color: '#333' }}>{countryDisplay}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3">
                                <p className="font-weight-bold mb-1" style={{ color: '#666' }}>
                                    Fecha Inicial
                                </p>
                            </div>
                            <div className="col-xl-9">
                                <p className="font-weight-normal" style={{ color: '#333' }}>
                                    {formatDate(certificate.initial_certification_date || certificate.issue_date)}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3">
                                <p className="font-weight-bold mb-1" style={{ color: '#666' }}>
                                    Fecha de Emisión
                                </p>
                            </div>
                            <div className="col-xl-9">
                                <p className="font-weight-normal" style={{ color: '#333' }}>
                                    {formatDate(certificate.issue_date)}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3">
                                <p className="font-weight-bold mb-1" style={{ color: '#666' }}>
                                    Fecha de Validez
                                </p>
                            </div>
                            <div className="col-xl-9">
                                <p className="font-weight-normal" style={{ color: '#333' }}>
                                    {formatDate(certificate.expiry_date)}
                                </p>
                            </div>
                        </div>
                        {certificate.recertification_date && (
                            <div className="row">
                                <div className="col-xl-3">
                                    <p className="font-weight-bold mb-1" style={{ color: '#666' }}>
                                        Fecha de Recertificación
                                    </p>
                                </div>
                                <div className="col-xl-9">
                                    <p className="font-weight-normal" style={{ color: '#333' }}>
                                        {formatDate(certificate.recertification_date)}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-xl-3">
                                <p className="font-weight-bold mb-1" style={{ color: '#666' }}>
                                    Alcance
                                </p>
                            </div>
                            <div className="col-xl-9">
                                <p className="font-weight-normal" style={{ color: '#333' }}>
                                    {certificate.scope ? (
                                        <>
                                            {isScopeExpanded ? certificate.scope : `${certificate.scope.slice(0, 300)}${certificate.scope.length > 300 ? '...' : ''}`}
                                            {certificate.scope.length > 300 && (
                                                <button
                                                    onClick={() => setIsScopeExpanded(!isScopeExpanded)}
                                                    className="btn btn-link p-0 ml-2"
                                                    style={{ color: 'rgb(21, 157, 188)', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.9rem', verticalAlign: 'baseline' }}
                                                >
                                                    {isScopeExpanded ? 'Ver menos' : 'Ver más'}
                                                </button>
                                            )}
                                        </>
                                    ) : 'Alcance no especificado'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="my-4" style={{ borderTop: '2px solid #dee2e6' }} />

                {/* Sites Section */}
                <section>
                    <h3 className="font-weight-bold mb-4" style={{ fontSize: '1.5rem', color: '#333' }}>
                        Sitios ({(certificate.company_addresses?.length || 0) + (certificate.company_address && certificate.company_address !== 'Dirección no disponible' ? 1 : 0)})
                    </h3>
                    <div className="container">
                        <table className="mb-0 table" style={{ border: '1px solid rgb(222, 226, 230)', borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'rgb(248, 249, 250)' }}>
                                    <th className="font-weight-bold py-3 px-3" style={{ backgroundColor: 'rgb(248, 249, 250)', border: '1px solid rgb(222, 226, 230)', color: 'rgb(102, 102, 102)', fontSize: '0.9rem' }}>
                                        Tipo de Sitio
                                    </th>
                                    <th className="font-weight-bold py-3 px-3" style={{ backgroundColor: 'rgb(248, 249, 250)', border: '1px solid rgb(222, 226, 230)', color: 'rgb(102, 102, 102)', fontSize: '0.9rem' }}>
                                        Ubicación del Sitio
                                    </th>
                                    <th className="font-weight-bold py-3 px-3" style={{ backgroundColor: 'rgb(248, 249, 250)', border: '1px solid rgb(222, 226, 230)', color: 'rgb(102, 102, 102)', fontSize: '0.9rem' }}>
                                        Entidad Certificada
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-3 px-3" style={{ border: '1px solid rgb(222, 226, 230)', color: 'rgb(0, 0, 0)', fontSize: '0.9rem', verticalAlign: 'top' }}>Sitio Principal</td>
                                    <td className="py-3 px-3" style={{ border: '1px solid rgb(222, 226, 230)', color: 'rgb(0, 0, 0)', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {certificate.company_address && certificate.company_address !== 'Dirección no disponible' && (
                                                <div style={{ whiteSpace: 'pre-line' }}>
                                                    {certificate.company_address.trim()}
                                                </div>
                                            )}
                                            {certificate.company_addresses && Array.isArray(certificate.company_addresses) && certificate.company_addresses.length > 0 && (
                                                certificate.company_addresses.map((addr, index) => (
                                                    addr && addr.trim() && (
                                                        <div key={index} style={{ whiteSpace: 'pre-line' }}>
                                                            {addr.trim()}
                                                        </div>
                                                    )
                                                ))
                                            )}
                                            {(!certificate.company_address || certificate.company_address === 'Dirección no disponible') &&
                                                (!certificate.company_addresses || certificate.company_addresses.length === 0) && (
                                                    <div>{certificate.company_country || 'País no disponible'}</div>
                                                )}
                                        </div>
                                    </td>
                                    <td className="py-3 px-3" style={{ border: '1px solid rgb(222, 226, 230)' }}>
                                        <a
                                            href={companyResultsLink || '#'}
                                            className="text-decoration-none"
                                            style={{ fontSize: '0.9rem', color: 'rgb(21, 157, 188)' }}
                                        >
                                            {certificate.company_name}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <hr className="my-4" style={{ borderTop: '2px solid #dee2e6' }} />

                {/* QR Code Section */}
                <section className="mb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="font-weight-bold mb-3" style={{ fontSize: '1.2rem', color: '#333' }}>
                                Código QR
                            </h4>
                            <div className="text-center">
                                <div style={{
                                    display: 'inline-block',
                                    padding: '20px',
                                    border: '1px solid #dee2e6',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff'
                                }}>
                                    {qrCodeDataUrl ? (
                                        <img
                                            src={qrCodeDataUrl}
                                            alt="QR Code para verificar certificado"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                border: '1px solid #dee2e6'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '150px',
                                            height: '150px',
                                            backgroundColor: '#f8f9fa',
                                            border: '1px solid #dee2e6',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '12px',
                                            color: '#666'
                                        }}>
                                            Generando QR...
                                        </div>
                                    )}
                                </div>
                                <p className="mt-2 text-muted" style={{ fontSize: '0.9rem' }}>
                                    Escanea para verificar este certificado
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="my-4" style={{ borderTop: '2px solid #dee2e6' }} />

                {/* Other Certifications Section */}
                <section>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="font-weight-bold mb-0" style={{ fontSize: '1.5rem', color: '#333' }}>
                            Otras Certificaciones de {certificate.company_name}
                        </h3>
                        {companyResultsLink && (
                            <Link to={companyResultsLink} className="text-decoration-none" style={{ fontSize: '1rem', color: '#159dbc' }}>
                                Ver Todas &gt;
                            </Link>
                        )}
                    </div>

                    <div className="row">
                        {loadingOtherCertificates ? (
                            <div className="col-12 text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        ) : otherCertificates.length > 0 ? (
                            otherCertificates.map((cert, index) => (
                                <div key={cert.id || index} className="col-lg-4 col-md-5 mb-3">
                                    <div className="card" style={{ border: '1px solid rgb(229, 231, 235)', borderRadius: '18px 0px 18px 0px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px', transition: '0.2s' }}>
                                        <div className="card-body p-3">
                                            <div className="mb-3">
                                                <span className="badge" style={{ backgroundColor: 'rgb(243, 244, 246)', color: 'rgb(107, 114, 128)', fontSize: '0.75rem', fontWeight: 500, padding: '4px 8px', borderRadius: '4px' }}>
                                                    {cert.standard_name || cert.iso_standard_name || 'Estándar no disponible'}
                                                </span>
                                            </div>
                                            <h5 className="card-title font-weight-bold mb-4" style={{ color: 'rgb(21, 157, 188)', fontSize: '1.1rem', lineHeight: 1.3 }}>
                                                {(cert.standard_code || cert.iso_standard_code || 'Código no disponible').replace(/:(\d{4}):\1$/, ':$1')}
                                            </h5>
                                            <div className="mb-3">
                                                <small className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 500 }}>Número de Certificado:</small>
                                                <div className="font-weight-normal mt-1" style={{ fontSize: '0.9rem', color: 'rgb(55, 65, 81)', fontWeight: 500 }}>
                                                    {'****' + (cert.number || cert.registration_number || cert.certificate_number || '').toString().slice(-4)}
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <small className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 500 }}>Organismo de Certificación:</small>
                                                <div className="font-weight-normal mt-1" style={{ fontSize: '0.9rem', color: 'rgb(55, 65, 81)', fontWeight: 500, textTransform: 'uppercase' }}>
                                                    INTERCERT INC.
                                                </div>
                                            </div>
                                            <button
                                                className="btn w-100"
                                                style={{ background: 'rgb(21, 157, 188)', color: 'white', border: 'medium', borderRadius: '8px', padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', transition: '0.2s', transform: 'translateY(0px)', boxShadow: 'none' }}
                                                onClick={() => navigate(`/certificate?code=${cert.number || cert.registration_number}`)}
                                            >
                                                Ver Certificado
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p className="text-muted">No se encontraron otras certificaciones para esta empresa.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CertificateDetail;
