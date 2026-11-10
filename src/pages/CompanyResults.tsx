import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// @ts-ignore
import VerificationForm from '../components/CertificateVerification/VerificationForm';
import QRCode from 'qrcode';
import { certificacionesCleanApi } from '../services/certificacionesCleanApi';
import '../assets/css/iaf-certsearch-exact.css';

interface CompanyData {
    id: string | null;
    token: string | null;
    companyName: string;
    country: string;
    certificates: number;
}

interface Certificate {
    id: string | number;
    iso_standard_name: string;
    iso_standard_code: string;
    registration_number: string;
    public_token?: string;
    file_url?: string;
    status?: string;
    issue_date?: string;
    expiry_date?: string;
    company?: string;
    company_id?: string;
    number?: string; // For search results mapping
}

interface LocationState {
    searchQuery?: string;
    searchResults?: any[];
    searchType?: string;
}

interface SearchResult {
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

const CompanyResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const state = location.state as LocationState || {};
    const { searchResults: initialSearchResults, searchType } = state;

    const [company, setCompany] = useState<CompanyData | null>(null);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Validación de seguridad
    const validateToken = (tokenStr: string | null) => {
        if (!tokenStr) return false;
        const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
        return uuidRegex.test(tokenStr);
    };

    const validateId = (idStr: string | null) => {
        if (!idStr) return false;
        // Solo números, máximo 10 dígitos
        return /^[0-9]{1,10}$/.test(idStr);
    };

    useEffect(() => {
        // Obtener parámetros de URL (nuevos: token, name | legacy: companyId, companyName)
        const token = searchParams.get('token');
        const id = searchParams.get('id') || searchParams.get('companyId');
        const name = searchParams.get('name') || searchParams.get('companyName');

        // Validar token o ID
        const isValidToken = token && validateToken(token);
        const isValidId = id && validateId(id);

        if ((isValidToken || isValidId) && name) {
            const companyData: CompanyData = {
                id: id || null,
                token: token || null,
                companyName: decodeURIComponent(name),
                country: 'PE', // Valor por defecto, se actualizará desde la API
                certificates: 0
            };
            setCompany(companyData);
            // Llamar a fetchCompanyCertificates después de establecer el estado inicial
            // para asegurar que se actualice con los datos de la API
            setTimeout(() => {
                fetchCompanyCertificates(id || token, isValidToken ? 'token' : 'id');
            }, 0);
        } else if (token || id) {
            // Detectar intento de payload malicioso
            console.warn('Security: Invalid company identifier', { token, id });
            setError('Formato de identificador inválido');
            setLoading(false);
        } else if (initialSearchResults && initialSearchResults.length > 0) {
            // Si es búsqueda por empresa, tomar el primer resultado
            if (searchType === 'company') {
                const selectedCompany = initialSearchResults[0];
                setCompany(selectedCompany);
                fetchCompanyCertificates(selectedCompany.id || selectedCompany.token, selectedCompany.token ? 'token' : 'id');
            }
        }
    }, [searchParams, initialSearchResults, searchType]);

    useEffect(() => {
        if (company) {
            generateQRCode();
        }
    }, [company]);

    const generateQRCode = async () => {
        try {
            // URL que redirigirá a la misma vista de resultados de empresa
            const companyId = searchParams.get('id');
            const companyName = searchParams.get('name');
            const qrUrl = `${window.location.origin}/company-results?id=${companyId}&name=${encodeURIComponent(companyName || '')}`;
            const qrDataUrl = await QRCode.toDataURL(qrUrl, {
                width: 100,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            setQrCodeDataUrl(qrDataUrl);
        } catch (error) {
            console.error('Error generando QR code:', error);
        }
    };

    const fetchCompanyCertificates = async (identifier: string | null, type = 'id') => {
        try {
            setLoading(true);
            // Usar servicio centralizado que oculta las rutas de la API
            // const { getOtherCertificates } = await import('../services/api');
            const companyId = type === 'token' ? null : identifier;
            const companyToken = type === 'token' ? identifier : null;

            try {
                // Si tenemos token, necesitamos obtener el company_id primero
                let finalCompanyId: string | number | null = companyId;
                if (companyToken) {
                    // Buscar empresa por token (esto requiere una búsqueda adicional)
                    const searchData = await certificacionesCleanApi.search(companyToken, 1);
                    if (searchData.results && searchData.results.length > 0) {
                        finalCompanyId = (searchData.results[0] as any).company_id;
                    }
                }

                if (finalCompanyId) {
                    const data = await certificacionesCleanApi.getCompanyCertificates(finalCompanyId);
                    setCertificates(data.certificates || []);

                    // Actualizar información de la empresa si viene en la respuesta
                    if (data.company) {
                        setCompany(prev => {
                            // Siempre usar los datos de la API cuando estén disponibles
                            const updatedCompany: CompanyData = {
                                id: data.company ? String(data.company.id) : (finalCompanyId ? String(finalCompanyId) : null),
                                token: prev?.token || null,
                                companyName: data.company?.name || prev?.companyName || '',
                                country: data.company?.country || prev?.country || 'PE',
                                certificates: data.total_count || prev?.certificates || 0
                            };
                            // Log para debugging
                            console.log('Actualizando información de empresa:', {
                                prev,
                                apiData: data.company,
                                updated: updatedCompany
                            });
                            return updatedCompany;
                        });
                    }

                    // Log informativo si hay más certificados
                    if (data.total_count > data.returned_count) {
                        console.log(`Mostrando ${data.returned_count} de ${data.total_count} certificados de la empresa.`);
                    }
                } else {
                    setCertificates([]);
                }
            } catch (error) {
                console.error('Error fetching company certificates:', error);
                setCertificates([]);
                setError('Error al cargar los certificados de la empresa');
            }
        } catch (error) {
            console.error('Error fetching company certificates:', error);
            setCertificates([]);
            setError('Error al cargar los certificados de la empresa');
        } finally {
            setLoading(false);
        }
    };

    const checkCertification = async (values: any) => {
        setButtonLoading(true);

        try {
            const query = values.registrationNumber.trim();

            // Determinar si es búsqueda por código de certificado o nombre de empresa
            // Acepta: IC-QM-2511191, IC-UNE20-2511001, IC-UNE58-2511001, etc.
            const isCertificateCode = /^[A-Z]{1,2}-[A-Z0-9]{2,6}-\d+$/.test(query);

            let newSearchResults: SearchResult[] = [];

            // Usar servicio centralizado que oculta las rutas de la API
            // const { search } = await import('../services/api');
            const searchResult = await certificacionesCleanApi.search(query);

            const results = searchResult.results || [];

            if (isCertificateCode && results.length > 0) {
                // Resultado único de certificado (o el primero que coincida con el código)
                const cert = results[0];
                if (cert) {
                    newSearchResults = [{
                        id: cert.id,
                        companyName: typeof cert.company === 'string' ? cert.company : (cert.company as any)?.name || '',
                        country: 'PE',
                        certificates: 1,
                        standards: 1,
                        locations: 1,
                        registrationNumber: (cert as any).number || (cert as any).registration_number || '',
                        status: cert.status || 'ACTIVE',
                        issueDate: cert.issue_date || '',
                        expiryDate: cert.expiry_date || ''
                    }];
                }
            } else if (results.length > 0) {
                // Búsqueda por nombre de empresa (agrupar resultados por empresa)
                const companiesMap: { [key: string]: SearchResult } = {};
                results.forEach((cert: any) => {
                    const companyId = cert.company_id || (cert.company as any)?.id;
                    if (companyId && !companiesMap[companyId]) {
                        companiesMap[companyId] = {
                            id: companyId,
                            companyName: typeof cert.company === 'string' ? cert.company : (cert.company as any)?.name || '',
                            country: 'PE',
                            certificates: 0,
                            standards: 0,
                            locations: 1,
                            lastCertificationDate: cert.issue_date
                        };
                    }
                    if (companyId) {
                        const companyEntry = companiesMap[companyId];
                        if (companyEntry) {
                            companyEntry.certificates++;
                        }
                    }
                });
                newSearchResults = Object.values(companiesMap);
            }

            // Navegar a la vista de resultados con los datos
            navigate('/search-results', {
                state: {
                    searchQuery: query,
                    searchResults: newSearchResults,
                    searchType: isCertificateCode ? 'certificate' : 'company'
                }
            });

            if (newSearchResults.length > 0) {
                toast.success(`Operación exitosa: ${newSearchResults.length} resultado(s) encontrado(s)`);
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

    const handleViewCertificate = (certificate: Certificate) => {
        if (certificate.registration_number) {
            // Usar token UUID si está disponible (seguro), sino código (legacy)
            if (certificate.public_token) {
                navigate(`/certificate?token=${certificate.public_token}`);
            } else {
                navigate(`/certificate?code=${certificate.registration_number}`);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/verify-certificate')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Volver a búsqueda
                    </button>
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Empresa no encontrada</h1>
                    <p className="text-gray-600 mb-4">La empresa solicitada no existe</p>
                    <button
                        onClick={() => navigate('/verify-certificate')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Volver a búsqueda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid px-0">
            {/* Search Input Only */}
            <div className="bg-white border-b border-gray-200 py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="HeroSearch_search__3jwd7">
                                <VerificationForm
                                    checkCertification={checkCertification}
                                    buttonLoading={buttonLoading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container py-5">
                {/* Certified Entity Section */}
                <div className="row mb-5">
                    <div className="col-12">
                        <h2 className="fw-bold mb-4">Entidad Certificada</h2>
                        <div className="d-flex align-items-center">
                            <div className="bg-light border rounded me-4 d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                                <span className="text-muted fw-bold text-center">ENTIDAD CERTIFICADA</span>
                            </div>
                            <div className="flex-grow-1">
                                <h3 className="fw-bold mb-2">{company.companyName}</h3>
                                <div className="d-flex align-items-center">
                                    <span className="me-2" style={{ fontSize: '20px' }}>
                                        {(() => {
                                            const country = (company.country || '').toUpperCase();
                                            const countryOriginal = company.country || '';
                                            // Códigos ISO de 2 letras y variantes
                                            if (country === 'PE' || country === 'PER' ||
                                                countryOriginal === 'Peru' || countryOriginal === 'Perú' ||
                                                countryOriginal === 'PERU' || countryOriginal === 'PERÚ' ||
                                                countryOriginal === 'peru' || countryOriginal === 'perú') return '🇵🇪';
                                            if (country === 'CL' || country === 'CHL' || company.country === 'Chile') return '🇨🇱';
                                            if (country === 'CO' || country === 'COL' || company.country === 'Colombia') return '🇨🇴';
                                            if (country === 'EC' || country === 'ECU' || company.country === 'Ecuador') return '🇪🇨';
                                            if (country === 'MX' || country === 'MEX' || company.country === 'México' || company.country === 'Mexico' || company.country === 'MEXICO') return '🇲🇽';
                                            if (country === 'PA' || country === 'PAN' || company.country === 'Panamá' || company.country === 'Panama') return '🇵🇦';
                                            if (country === 'CR' || country === 'CRI' || company.country === 'Costa Rica') return '🇨🇷';
                                            if (country === 'ES' || country === 'ESP' || company.country === 'España' || company.country === 'Espana') return '🇪🇸';
                                            if (country === 'AR' || country === 'ARG' || company.country === 'Argentina') return '🇦🇷';
                                            if (country === 'BR' || country === 'BRA' || company.country === 'Brasil' || company.country === 'Brazil') return '🇧🇷';
                                            if (country === 'BO' || country === 'BOL' || company.country === 'Bolivia') return '🇧🇴';
                                            if (country === 'PY' || country === 'PRY' || company.country === 'Paraguay') return '🇵🇾';
                                            if (country === 'UY' || country === 'URY' || company.country === 'Uruguay') return '🇺🇾';
                                            if (country === 'VE' || country === 'VEN' || company.country === 'Venezuela') return '🇻🇪';
                                            if (country === 'GT' || country === 'GTM' || company.country === 'Guatemala') return '🇬🇹';
                                            if (country === 'HN' || country === 'HND' || company.country === 'Honduras') return '🇭🇳';
                                            if (country === 'NI' || country === 'NIC' || company.country === 'Nicaragua') return '🇳🇮';
                                            if (country === 'SV' || country === 'SLV' || company.country === 'El Salvador') return '🇸🇻';
                                            if (country === 'DO' || country === 'DOM' || company.country === 'República Dominicana' || company.country === 'Dominicana') return '🇩🇴';
                                            return '🏳️';
                                        })()}
                                    </span>
                                    <span className="text-muted">
                                        {(() => {
                                            const country = (company.country || '').toUpperCase();
                                            const countryOriginal = company.country || '';
                                            // Códigos ISO de 2 letras y variantes
                                            if (country === 'PE' || country === 'PER' ||
                                                countryOriginal === 'Peru' || countryOriginal === 'Perú' ||
                                                countryOriginal === 'PERU' || countryOriginal === 'PERÚ' ||
                                                countryOriginal === 'peru' || countryOriginal === 'perú') return 'Perú';
                                            if (country === 'CL' || country === 'CHL' || company.country === 'Chile') return 'Chile';
                                            if (country === 'CO' || country === 'COL' || company.country === 'Colombia') return 'Colombia';
                                            if (country === 'EC' || country === 'ECU' || company.country === 'Ecuador') return 'Ecuador';
                                            if (country === 'MX' || country === 'MEX' || company.country === 'México' || company.country === 'Mexico' || company.country === 'MEXICO') return 'México';
                                            if (country === 'PA' || country === 'PAN' || company.country === 'Panamá' || company.country === 'Panama') return 'Panamá';
                                            if (country === 'CR' || country === 'CRI' || company.country === 'Costa Rica') return 'Costa Rica';
                                            if (country === 'ES' || country === 'ESP' || company.country === 'España' || company.country === 'Espana') return 'España';
                                            if (country === 'AR' || country === 'ARG' || company.country === 'Argentina') return 'Argentina';
                                            if (country === 'BR' || country === 'BRA' || company.country === 'Brasil' || company.country === 'Brazil') return 'Brasil';
                                            if (country === 'BO' || country === 'BOL' || company.country === 'Bolivia') return 'Bolivia';
                                            if (country === 'PY' || country === 'PRY' || company.country === 'Paraguay') return 'Paraguay';
                                            if (country === 'UY' || country === 'URY' || company.country === 'Uruguay') return 'Uruguay';
                                            if (country === 'VE' || country === 'VEN' || company.country === 'Venezuela') return 'Venezuela';
                                            if (country === 'GT' || country === 'GTM' || company.country === 'Guatemala') return 'Guatemala';
                                            if (country === 'HN' || country === 'HND' || company.country === 'Honduras') return 'Honduras';
                                            if (country === 'NI' || country === 'NIC' || company.country === 'Nicaragua') return 'Nicaragua';
                                            if (country === 'SV' || country === 'SLV' || company.country === 'El Salvador') return 'El Salvador';
                                            if (country === 'DO' || country === 'DOM' || company.country === 'República Dominicana' || company.country === 'Dominicana') return 'República Dominicana';
                                            return company.country || 'N/A';
                                        })()}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-white border rounded mb-2 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                                    {qrCodeDataUrl ? (
                                        <img
                                            src={qrCodeDataUrl}
                                            alt="QR Code para verificar certificados de empresa"
                                            style={{
                                                width: '90px',
                                                height: '90px',
                                                border: '1px solid #dee2e6'
                                            }}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center h-100">
                                        </div>
                                    )}
                                </div>
                                <small className="text-muted">Escanear QR</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="row">
                    <div className="col-12">
                        <hr style={{
                            borderTop: '2px solid #dee2e6',
                            margin: '2rem 0',
                            opacity: 0.8
                        }} />
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 className="fw-bold mb-1">Certificaciones</h2>
                                <p className="text-muted mb-0">Explora sus credenciales</p>
                            </div>
                        </div>

                        {certificates.length > 0 ? (
                            <div className="row">
                                {certificates.map((cert, index) => (
                                    <div key={cert.id || index} className="col-lg-3 col-md-6 mb-4">
                                        <div className="card h-100" style={{
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0px 32px 0px 32px',
                                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                            transition: 'all 0.2s ease'
                                        }}>
                                            <div className="card-body p-4">
                                                {/* Nombre de la Norma */}
                                                <div className="mb-3">
                                                    <span className="badge" style={{
                                                        backgroundColor: '#f3f4f6',
                                                        color: '#6b7280',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500',
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        display: 'inline-block',
                                                        maxWidth: '100%',
                                                        whiteSpace: 'normal',
                                                        wordBreak: 'break-word',
                                                        lineHeight: 1.3
                                                    }}>
                                                        {cert.iso_standard_name || 'Estándar no disponible'}
                                                    </span>
                                                </div>
                                                {/* Código ISO */}
                                                <h5 className="card-title fw-bold mb-4" style={{
                                                    color: '#159dbc',
                                                    fontSize: '1.1rem',
                                                    lineHeight: '1.3'
                                                }}>
                                                    {cert.iso_standard_code ? cert.iso_standard_code.replace(/:(\d{4}):\1$/, ':$1') : 'Código no disponible'}
                                                </h5>
                                                {/* Número de Certificado */}
                                                <div className="mb-3">
                                                    <small className="text-muted" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                                                        Código de Certificado:
                                                    </small>
                                                    <div className="fw-normal mt-1" style={{
                                                        fontSize: '0.9rem',
                                                        color: '#374151',
                                                        fontWeight: '500'
                                                    }}>
                                                        {cert.registration_number ?
                                                            `****${cert.registration_number.slice(-4)}` :
                                                            'No disponible'
                                                        }
                                                    </div>
                                                </div>

                                                {/* Organismo de Certificación */}
                                                <div className="mb-4">
                                                    <small className="text-muted" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                                                        Organismo de Certificación:
                                                    </small>
                                                    <div className="fw-normal mt-1" style={{
                                                        fontSize: '0.9rem',
                                                        color: '#374151',
                                                        fontWeight: '500',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        INTERCERT LATAM.
                                                    </div>
                                                </div>
                                                {/* Botón Ver Certificado */}
                                                <button
                                                    className="btn w-100"
                                                    style={{
                                                        background: 'linear-gradient(135deg, #159dbc 0%)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        padding: '12px 16px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                                                        (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(21, 157, 188, 0.3)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        (e.target as HTMLElement).style.transform = 'translateY(0)';
                                                        (e.target as HTMLElement).style.boxShadow = 'none';
                                                    }}
                                                    onClick={() => handleViewCertificate(cert)}
                                                >
                                                    Ver Certificado
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <div className="text-muted">
                                    <i className="ri-file-list-3-line" style={{ fontSize: '3rem' }}></i>
                                    <p className="mt-3">No se encontraron certificaciones para esta empresa.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyResults;
