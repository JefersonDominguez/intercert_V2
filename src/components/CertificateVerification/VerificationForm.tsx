import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SearchSuggestions, { SearchSuggestion } from './SearchSuggestions';
import { certificacionesCleanApi } from '../../services/certificacionesCleanApi';

// Esquema de validación
const verifyCertificationSchema = z.object({
    registrationNumber: z.string()
        .min(1, "El campo de búsqueda no puede estar en blanco")
        .max(100, "La búsqueda no puede exceder 100 caracteres")
});

type VerifyCertificationFormData = z.infer<typeof verifyCertificationSchema>;

interface VerificationFormProps {
    checkCertification: (data: VerifyCertificationFormData) => Promise<void>;
    buttonLoading?: boolean;
    placeholder?: string;
    enableSuggestions?: boolean;
}

// Interface matching the actual API response structure for public search
interface PublicCertificate {
    company: string; // Field returned by the API
    company_name?: string; // Backward compatibility
    number: string;
    public_token?: string;
    company_country?: string;
    company_id: number;
    company_token?: string;
    [key: string]: any;
}

const sanitizeInput = (value: string) => {
    if (!value) return '';
    let cleaned = value.replace(/[<>]/g, '');
    cleaned = cleaned.replace(/['"`]/g, '');
    cleaned = cleaned.replace(/(--|;|\/\*|\*\/)/g, ' ');
    cleaned = cleaned.replace(/\s+/g, ' ');
    return cleaned.slice(0, 120);
};

const VerificationForm: React.FC<VerificationFormProps> = ({
    checkCertification,
    buttonLoading = false,
    placeholder = "Ingrese la empresa por nombre o número de certificación",
    enableSuggestions = true
}) => {
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<VerifyCertificationFormData>({
        resolver: zodResolver(verifyCertificationSchema),
        defaultValues: {
            registrationNumber: ""
        }
    });

    const searchValue = watch('registrationNumber');

    // Función para buscar sugerencias
    const searchSuggestions = useCallback(async (query: string) => {
        const safeQuery = sanitizeInput(query || '');
        // Permitir búsquedas desde 1 carácter para mostrar siempre sugerencias
        if (!safeQuery || safeQuery.length < 1) {
            setSuggestions([]);
            return;
        }

        setIsLoadingSuggestions(true);

        try {
            const newSuggestions: SearchSuggestion[] = [];

            // Determinar si es búsqueda por código de certificado
            // Acepta: IC-QM-2511191, IC-AB-25100313, etc.
            const isCertificateCode = /^[A-Z]{1,4}-[A-Z0-9]{2,8}-\d+$/i.test(safeQuery);

            // Usar servicio centralizado de Arquitectura Limpia
            const searchResult = await certificacionesCleanApi.search(safeQuery) as unknown as { results: PublicCertificate[] };

            // Procesar resultados
            if (searchResult?.results && searchResult.results.length > 0) {

                if (isCertificateCode) {
                    // BÚSQUEDA POR CÓDIGO: Mostrar solo certificados individuales
                    searchResult.results.forEach(cert => {
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
                    // BÚSQUEDA POR NOMBRE: Agrupar por empresa
                    const companiesMap: Record<number, SearchSuggestion> = {};

                    searchResult.results.forEach(cert => {
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

                    // Agregar solo sugerencias de empresas agrupadas
                    newSuggestions.push(...Object.values(companiesMap));
                }
            }

            setSuggestions(newSuggestions);
        } catch (error: any) {
            console.error('Error al buscar sugerencias:', error);
            // Si el error es porque la respuesta no es JSON, mostrar un mensaje más claro
            if (error.message && error.message.includes('no es JSON')) {
                console.error('El servidor devolvió HTML en lugar de JSON. Verifica que el backend esté funcionando correctamente.');
            }
            setSuggestions([]);
        } finally {
            setIsLoadingSuggestions(false);
        }
    }, []);

    // Debounce para evitar muchas llamadas a la API
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (enableSuggestions && searchValue && searchValue.length >= 1) {
                searchSuggestions(searchValue);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchValue, searchSuggestions, enableSuggestions]);

    // Mostrar dropdown cuando el usuario haga click en el input
    const handleInputFocus = () => {
        if (enableSuggestions) setShowSuggestions(true);
    };

    // Cerrar dropdown cuando se hace click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        if (showSuggestions) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSuggestions]);

    // Función para seleccionar una sugerencia
    const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
        if (suggestion.searchType === 'company') {
            // Si es una empresa, navegar con token (seguro) o ID (legacy)
            const param = suggestion.companyToken ? 'token' : 'id';
            const identifier = suggestion.companyToken || suggestion.companyId;
            window.location.href = `/company-results?${param}=${identifier}&name=${encodeURIComponent(suggestion.companyName)}`;
        } else {
            // Si es un certificado, navegar con token (seguro) o código (legacy)
            setValue('registrationNumber', suggestion.registrationNumber);
            setShowSuggestions(false);
            setSuggestions([]);
            const param = suggestion.certificateToken ? 'token' : 'code';
            const identifier = suggestion.certificateToken || suggestion.registrationNumber;
            window.location.href = `/certificate?${param}=${identifier}`;
        }
    };

    const onSubmit = async (data: VerifyCertificationFormData) => {
        try {
            await checkCertification(data);
            // No resetear el formulario automáticamente para mantener el número ingresado
        } catch (error) {
            console.error('Error al verificar certificado:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div ref={dropdownRef} role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded={showSuggestions} className="AdvancedSearchInput_single-search__input-container__1RZZb">
                <div className="d-flex align-items-center bg-white w-100" style={{
                    borderRadius: showSuggestions ? '24px 24px 0 0' : '50px',
                    border: '2px solid #1a237e',
                    borderBottom: showSuggestions ? 'none' : '2px solid #1a237e',
                    padding: '2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    position: 'relative',
                    zIndex: 1001
                }}>
                    <div className="flex-grow-1 position-relative">
                        <input
                            {...register('registrationNumber')}
                            placeholder={placeholder}
                            autoComplete="off"
                            aria-autocomplete="list"
                            aria-controls="react-autowhatever-1"
                            id="single-search-input"
                            type="text"
                            className={`form-control border-0 shadow-none bg-transparent ${errors.registrationNumber ? 'is-invalid' : ''}`}
                            disabled={buttonLoading}
                            maxLength={100}
                            style={{ fontSize: '16px', paddingLeft: '10px', color: '#495057', paddingRight: '30px' }}
                            onFocus={handleInputFocus}
                        />
                        {watch('registrationNumber') && (
                            <button
                                type="button"
                                onClick={() => setValue('registrationNumber', '')}
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#6b7280',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    transition: 'all 0.2s ease',
                                    zIndex: 1002
                                }}
                            >
                                <i className="ri-close-line"></i>
                            </button>
                        )}
                    </div>
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
                            transition: 'none',
                            marginRight: '-1px' // Ajuste fino para alineación
                        }}
                    >
                        <i className="ri-search-line mr-2"></i>
                        <span>
                            {buttonLoading ? 'Buscando...' : 'Buscar'}
                        </span>
                    </button>
                </div>
                {enableSuggestions && showSuggestions && (
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

            {errors.registrationNumber && (
                <div className="invalid-feedback d-block mt-2" style={{ color: '#dc3545', fontSize: '0.9rem' }}>
                    <i className="ri-error-warning-line me-1"></i>
                    {errors.registrationNumber.message}
                </div>
            )}
        </form>
    );
};

export default VerificationForm;
