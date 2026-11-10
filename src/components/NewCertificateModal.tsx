import React, { useState, useEffect, useRef } from 'react';
import { ALL_COUNTRIES } from '../config/countries';
import { certificacionesCleanApi } from '../services/certificacionesCleanApi';


// Interfaces
interface Sector {
    id: number | string;
    name: string;
}

interface IsoStandard {
    id: number | string;
    iso_code: string;
    name: string;
    description?: string;
    version?: string;
    is_active?: boolean;
}

interface Company {
    id: number | string;
    name: string;
    tax_code: string;
    sector_id?: string;
    sector?: string;
    address?: string;
    city?: string;
    country?: string;
    email?: string;
    phone?: string;
    // Propiedades adicionales que pueden venir de la API
    main_address?: string;
    main_country?: string;
    main_email?: string;
    main_phone?: string;
    last_scope?: string;
    addresses?: string[];
}

interface NewCertificateFormData {
    // Empresa
    company_id: string;
    company_name: string;
    tax_code: string;
    sector_id: string;
    sector: string;
    main_address: string;
    main_country: string;
    main_email: string;
    main_phone: string;
    // Certificado
    register_number: string;
    iso_standard_id: string;
    scope: string;
    status: string;
    // Fechas
    initial_certification_date: string;
    issue_date: string;
    recertification_date: string;
    validity_date: string;
}

interface NewCertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const NewCertificateModal: React.FC<NewCertificateModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [isoNorms, setIsoNorms] = useState<IsoStandard[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [searchingCompany, setSearchingCompany] = useState(false);
    const [showCompanyResults, setShowCompanyResults] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [customSector, setCustomSector] = useState('');
    const [showCustomSector, setShowCustomSector] = useState(false);
    const [addresses, setAddresses] = useState<string[]>(['']); // Array de direcciones, inicialmente una vacía
    const [showNewIsoModal, setShowNewIsoModal] = useState(false);
    const [newIsoForm, setNewIsoForm] = useState({
        iso_code: '',
        name: '',
        description: '',
        version: ''
    });
    const companySearchTimeout = useRef<NodeJS.Timeout | null>(null);

    const [formData, setFormData] = useState<NewCertificateFormData>({
        // Empresa
        company_id: '',
        company_name: '',
        tax_code: '',
        sector_id: '',
        sector: '',
        main_address: '',
        main_country: '',
        main_email: '',
        main_phone: '',
        // Certificado
        register_number: '',
        iso_standard_id: '',
        scope: '',
        status: 'VALID',
        // Fechas
        initial_certification_date: '',
        issue_date: '',
        recertification_date: '',
        validity_date: ''
    });

    // Cargar datos iniciales cuando se abre el modal (solo una vez)
    const hasLoadedInitialData = useRef(false);

    useEffect(() => {
        if (isOpen && !hasLoadedInitialData.current) {
            loadInitialData();
            hasLoadedInitialData.current = true;

            // Restaurar estado del formulario desde sessionStorage si existe
            const savedFormData = sessionStorage.getItem('newCertificateFormData');
            if (savedFormData) {
                try {
                    const parsed = JSON.parse(savedFormData);
                    setFormData(parsed);
                    const savedAddresses = sessionStorage.getItem('newCertificateAddresses');
                    if (savedAddresses) {
                        setAddresses(JSON.parse(savedAddresses));
                    }
                } catch (error) {
                    console.error('Error restaurando formulario:', error);
                }
            }
        } else if (!isOpen) {
            // Cuando se cierra el modal, resetear el flag
            hasLoadedInitialData.current = false;
        }
    }, [isOpen]);

    // Guardar estado del formulario en sessionStorage cada vez que cambia
    useEffect(() => {
        if (isOpen && formData.company_name) {
            sessionStorage.setItem('newCertificateFormData', JSON.stringify(formData));
            sessionStorage.setItem('newCertificateAddresses', JSON.stringify(addresses));
        }
    }, [formData, addresses, isOpen]);

    useEffect(() => {
        return () => {
            if (companySearchTimeout.current) {
                clearTimeout(companySearchTimeout.current);
            }
        };
    }, []);

    const loadInitialData = async () => {
        try {
            // Cargar sectores
            const sectorsData = await certificacionesCleanApi.getSectors();
            setSectors(Array.isArray(sectorsData) ? sectorsData : []);

            // Cargar normas ISO
            const isoData = await certificacionesCleanApi.getStandards();
            // Asegurarse de que isoData tenga la estructura correcta
            const validIsoData = (Array.isArray(isoData) ? isoData : []).map((iso: any) => ({
                id: iso.id,
                iso_code: iso.iso_code || iso.code || '',
                name: iso.name,
                description: iso.description,
                version: iso.version,
                is_active: iso.is_active
            }));
            setIsoNorms(validIsoData);
        } catch (error) {
            console.error('Error cargando datos iniciales:', error);
            setSectors([]);
            setIsoNorms([]);
        }
    };

    // Búsqueda de empresas
    const searchCompanies = async (query: string) => {
        if (query.length < 2) {
            setCompanies([]);
            setShowCompanyResults(false);
            return;
        }

        try {
            setSearchingCompany(true);
            const data = await certificacionesCleanApi.searchCompanies(query);
            // @ts-ignore: data structure might vary
            setCompanies(data.companies || []);
            setShowCompanyResults(true);
        } catch (error) {
            console.error('Error buscando empresas:', error);
            setCompanies([]);
        } finally {
            setSearchingCompany(false);
        }
    };

    // Seleccionar empresa existente
    const selectCompany = async (company: Company) => {
        try {
            // Cargar datos completos de la empresa incluyendo su último certificado
            const fullCompanyData = await certificacionesCleanApi.getCompanyDetails(company.id) as unknown as Company;

            // Cargar direcciones adicionales si existen
            const additionalAddrs = fullCompanyData.addresses || [];
            if (additionalAddrs.length > 0) {
                setAddresses([fullCompanyData.main_address || fullCompanyData.address || '', ...additionalAddrs]);
            } else {
                setAddresses([fullCompanyData.main_address || fullCompanyData.address || company.address || '']);
            }

            // Auto-completar sector si la empresa ya tiene uno asignado
            let sectorId = fullCompanyData.sector_id || company.sector_id || '';
            let sectorName = fullCompanyData.sector || company.sector || '';

            // Si tenemos sector_id pero no el nombre, buscarlo en la lista de sectores
            if (sectorId && !sectorName && sectors.length > 0) {
                const foundSector = sectors.find(sector => sector.id.toString() === sectorId?.toString());
                if (foundSector) {
                    sectorName = foundSector.name;
                }
            }

            // Normalizar país (mapear nombre a código si es necesario)
            const rawCountry = fullCompanyData.main_country || fullCompanyData.country || company.country || 'PE';
            const countryEntry = ALL_COUNTRIES.find(c => 
                c.name.toLowerCase() === rawCountry.toLowerCase() || 
                c.code.toLowerCase() === rawCountry.toLowerCase()
            );
            const countryCode = countryEntry ? countryEntry.code : 'pe';

            setFormData(prev => ({
                ...prev,
                company_id: String(company.id),
                company_name: company.name,
                tax_code: company.tax_code,
                sector_id: String(sectorId),
                sector: sectorName,
                main_address: fullCompanyData.main_address || fullCompanyData.address || company.address || '',
                main_country: countryCode,
                main_email: fullCompanyData.main_email || fullCompanyData.email || company.email || '',
                main_phone: fullCompanyData.main_phone || fullCompanyData.phone || company.phone || '',
                // Cargar alcance del último certificado si existe
                scope: fullCompanyData.last_scope || ''
            }));
        } catch (error) {
            // Si falla, usar datos básicos de la búsqueda
            const rawCountry = company.country || 'PE';
            const countryEntry = ALL_COUNTRIES.find(c => 
                c.name.toLowerCase() === rawCountry.toLowerCase() || 
                c.code.toLowerCase() === rawCountry.toLowerCase()
            );
            const countryCode = countryEntry ? countryEntry.code : 'pe';

            setFormData(prev => ({
                ...prev,
                company_id: String(company.id),
                company_name: company.name,
                tax_code: company.tax_code,
                sector_id: company.sector_id || '',
                sector: company.sector || '',
                main_address: company.address || '',
                main_country: countryCode,
                main_email: company.email || '',
                main_phone: company.phone || ''
            }));
        }

        setShowCompanyResults(false);
        setCompanies([]);
    };

    // Función para crear nueva norma ISO
    const handleCreateNewIso = async () => {
        try {
            setLoading(true);

            // Usar servicio centralizado Clean Architecture
            // @ts-ignore: Assuming createIsoStandard exists or we need to add it
            const newIso = await certificacionesCleanApi.createIsoStandard({
                // @ts-ignore
                iso_code: newIsoForm.iso_code.trim(),
                name: newIsoForm.name.trim(),
                description: newIsoForm.description.trim(),
                version: newIsoForm.version.trim(),
                is_active: true
            });

            // Actualizar la lista de normas ISO
            // @ts-ignore
            setIsoNorms(prev => [...prev, newIso]);

            // Seleccionar la nueva norma automáticamente
            setFormData(prev => ({ ...prev, iso_standard_id: String(newIso.id) }));

            // Limpiar el formulario y cerrar el modal
            setNewIsoForm({
                iso_code: '',
                name: '',
                description: '',
                version: ''
            });
            setShowNewIsoModal(false);

            setMessage({
                type: 'success',
                // @ts-ignore
                text: `Norma ISO ${newIso.iso_code || newIso.code} creada exitosamente`
            });

            // Limpiar mensaje después de unos segundos
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error: any) {
            console.error('Error creando norma ISO:', error);
            const errorMessage = error.response?.data?.error || 'Error al crear la norma ISO';
            setMessage({
                type: 'error',
                text: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };

    const handleNewIsoFormChange = (field: string, value: string) => {
        setNewIsoForm(prev => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCompanyNameChange = (value: string) => {
        setFormData(prev => ({ ...prev, company_name: value }));
        if (companySearchTimeout.current) {
            clearTimeout(companySearchTimeout.current);
        }
        if (!value || value.trim().length < 2) {
            setCompanies([]);
            setShowCompanyResults(false);
            return;
        }
        companySearchTimeout.current = setTimeout(() => {
            searchCompanies(value);
        }, 400);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const selectedSectorName =
            (formData.sector && formData.sector.trim()) ||
            (sectors.find((s) => s.id.toString() === formData.sector_id)?.name) ||
            (customSector.trim() || '');

        // Combinar todas las direcciones (filtrar vacías y unir con separador)
        const direccionesCompletas = addresses
            .filter(addr => addr.trim() !== '')
            .map(addr => addr.trim());
        const direccionPrincipal = direccionesCompletas.length > 0
            ? direccionesCompletas[0]
            : formData.main_address;
        const direccionesAdicionales = direccionesCompletas.slice(1);

        const payload = {
            company_id: formData.company_id || undefined,
            company_name: formData.company_name,
            tax_id: formData.tax_code,
            sector_id: formData.sector_id || undefined,
            sector: selectedSectorName,
            address: direccionPrincipal,
            addresses: direccionesAdicionales, // Enviar direcciones adicionales como array
            country: formData.main_country,
            email: formData.main_email,
            phone: formData.main_phone,
            register_number: formData.register_number,
            iso_standard_id: formData.iso_standard_id,
            scope: formData.scope,
            status: 'VALID', // Siempre válido para certificados nuevos
            initial_certification_date: formData.initial_certification_date || null,
            issue_date: formData.issue_date || null,
            recertification_date: formData.recertification_date || null,
            validity_date: formData.validity_date || null
        };

        try {
            // @ts-ignore: certificacionesCleanApi types might need update
            const result = await certificacionesCleanApi.createCertificate(payload) as any;

            if (result.status === 'success' || result.certificate_id) {
                setMessage({ type: 'success', text: '¡Certificado creado exitosamente!' });
                setTimeout(() => {
                    onSuccess();
                    onClose();
                    resetForm();
                }, 1500);
            } else {
                setMessage({ type: 'error', text: result.error || result.message || 'Error creando certificado' });
            }
        } catch (error: any) {
            console.error('Error en handleSubmit:', error);
            
            // Manejar error 409 (Certificado duplicado)
            if (error.response?.status === 409) {
                const result = error.response.data;
                if (result.error === 'CERTIFICATE_EXISTS') {
                    const existingCert = result.existing_certificate;
                    const shouldUpdate = window.confirm(
                        `El certificado ${existingCert.register_number} ya existe.\n\n` +
                        `Empresa: ${existingCert.company_name}\n` +
                        `ISO: ${existingCert.iso_standard_id}\n` +
                        `Alcance: ${existingCert.scope || 'N/A'}\n\n` +
                        `¿Deseas actualizar este certificado con los nuevos datos?`
                    );

                    if (shouldUpdate) {
                        try {
                            await certificacionesCleanApi.updateCertificate(Number(existingCert.id), {
                                iso_standard_id: Number(payload.iso_standard_id),
                                scope: payload.scope,
                                status: payload.status,
                                initial_certification_date: payload.initial_certification_date || undefined,
                                issue_date: payload.issue_date || undefined,
                                recertification_date: payload.recertification_date || undefined,
                                validity_date: payload.validity_date || undefined,
                                address: payload.address,
                                addresses: payload.addresses,
                                country: payload.country,
                                sector: payload.sector
                            });

                            setMessage({ type: 'success', text: '¡Certificado actualizado exitosamente!' });
                            setTimeout(() => {
                                onSuccess();
                                onClose();
                                resetForm();
                            }, 1500);
                            return;
                        } catch (updateError: any) {
                            console.error('Error actualizando certificado:', updateError);
                            const msg = updateError.response?.data?.detail || updateError.response?.data?.error || 'Error al actualizar';
                            setMessage({ type: 'error', text: msg });
                            return;
                        }
                    } else {
                        setMessage({ type: 'info', text: 'Operación cancelada' });
                        return;
                    }
                }
            }

            const errorMsg = error.response?.data?.detail || error.response?.data?.error || 'Error de conexión';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    const handleFormKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    };

    const resetForm = () => {
        setFormData({
            company_id: '',
            company_name: '',
            tax_code: '',
            sector_id: '',
            sector: '',
            main_address: '',
            main_country: '',
            main_email: '',
            main_phone: '',
            register_number: '',
            iso_standard_id: '',
            scope: '',
            status: 'VALID',
            initial_certification_date: '',
            issue_date: '',
            recertification_date: '',
            validity_date: ''
        });
        setAddresses(['']); // Resetear a una dirección vacía
        setMessage({ type: '', text: '' });
        // Limpiar sessionStorage cuando se resetea el formulario
        sessionStorage.removeItem('newCertificateFormData');
        sessionStorage.removeItem('newCertificateAddresses');
    };

    const addAddress = () => {
        setAddresses([...addresses, '']);
    };

    const removeAddress = (index: number) => {
        if (addresses.length > 1) {
            setAddresses(addresses.filter((_, i) => i !== index));
        }
    };

    const updateAddress = (index: number, value: string) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
        // Actualizar también main_address si es la primera dirección
        if (index === 0) {
            setFormData(prev => ({ ...prev, main_address: value }));
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '12px',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    background: 'white',
                    zIndex: 1
                }}>
                    <h2 style={{ margin: 0, color: '#0A165E', fontSize: '1.5rem', fontWeight: 700 }}>
                        <i className="ri-add-circle-line" style={{ marginRight: '8px' }}></i>
                        Nuevo Certificado
                    </h2>
                    <button
                        onClick={() => {
                            onClose();
                            resetForm();
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#666',
                            padding: '0',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} style={{ padding: '24px' }}>
                    {/* Mensaje */}
                    {message.text && (
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
                            color: message.type === 'success' ? '#155724' : '#721c24',
                            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                        }}>
                            {message.text}
                        </div>
                    )}

                    {/* Información de la Empresa */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0A165E', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #e5e7eb' }}>
                            Información de la Empresa
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ position: 'relative' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Nombre de la Empresa *
                                </label>
                                <input
                                    type="text"
                                    value={formData.company_name}
                                    onChange={(e) => handleCompanyNameChange(e.target.value)}
                                    placeholder="Buscar o escribir nombre..."
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                                {searchingCompany && (
                                    <div style={{ position: 'absolute', right: '12px', top: '42px', color: '#999' }}>
                                        <i className="ri-loader-4-line" style={{ animation: 'spin 1s linear infinite' }}></i>
                                    </div>
                                )}

                                {/* Resultados de búsqueda */}
                                {showCompanyResults && companies.length > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        background: 'white',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        marginTop: '4px',
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                        zIndex: 10,
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        {companies.map((company) => (
                                            <div
                                                key={company.id}
                                                onClick={() => selectCompany(company)}
                                                style={{
                                                    padding: '10px 12px',
                                                    cursor: 'pointer',
                                                    borderBottom: '1px solid #f3f4f6'
                                                }}
                                                onMouseEnter={(e) => (e.target as HTMLElement).style.background = '#f9fafb'}
                                                onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'white'}
                                            >
                                                <div style={{ fontWeight: 500, color: '#111827' }}>{company.name}</div>
                                                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                                                    RUC: {company.tax_code}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    RUC / Código Fiscal *
                                </label>
                                <input
                                    type="text"
                                    value={formData.tax_code}
                                    onChange={(e) => handleInputChange('tax_code', e.target.value)}
                                    placeholder="20123456789"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Sector *
                                </label>
                                {!showCustomSector ? (
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            value={formData.sector_id}
                                            onChange={(e) => {
                                                if (e.target.value === 'custom') {
                                                    setShowCustomSector(true);
                                                } else {
                                                    const value = e.target.value;
                                                    const selected = sectors.find((sector) => sector.id.toString() === value);
                                                    handleInputChange('sector_id', value);
                                                    handleInputChange('sector', selected?.name || '');
                                                }
                                            }}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '10px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                                background: 'white'
                                            }}
                                        >
                                            <option value="">Seleccionar sector</option>
                                            {sectors.map((sector) => (
                                                <option key={sector.id} value={sector.id}>{sector.name}</option>
                                            ))}
                                            <option value="custom" style={{ fontWeight: 'bold', color: '#159dbc' }}>
                                                + Crear sector nuevo
                                            </option>
                                        </select>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="text"
                                            value={customSector}
                                            onChange={(e) => setCustomSector(e.target.value)}
                                            placeholder="Nombre del nuevo sector..."
                                            required
                                            style={{
                                                flex: 1,
                                                padding: '10px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px'
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (!customSector.trim()) return;

                                                try {
                                                    // Usar servicio centralizado Clean Architecture
                                                    const { certificacionesCleanApi } = await import('../services/certificacionesCleanApi');
                                                    // @ts-ignore: Assuming createSector exists or we need to add it
                                                    const res = await certificacionesCleanApi.createSector({ name: customSector.trim() });

                                                    const newSector = res;
                                                    setSectors(prev => [...prev, newSector]);
                                                    setFormData(prev => ({ ...prev, sector_id: String(newSector.id), sector: newSector.name }));
                                                    setCustomSector('');
                                                    setShowCustomSector(false);
                                                } catch (error) {
                                                    console.error('Error creando sector:', error);
                                                }
                                            }}
                                            style={{
                                                padding: '10px 16px',
                                                background: '#159dbc',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: '14px'
                                            }}
                                        >
                                            ✓
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCustomSector(false);
                                                setCustomSector('');
                                            }}
                                            style={{
                                                padding: '10px 16px',
                                                background: '#f3f4f6',
                                                color: '#374151',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: '14px'
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    País *
                                </label>
                                <select
                                    value={formData.main_country}
                                    onChange={(e) => handleInputChange('main_country', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        background: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="">Seleccionar país</option>
                                    {ALL_COUNTRIES.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.flag} {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ display: 'block', fontWeight: 500, color: '#374151' }}>
                                    Dirección{addresses.length > 1 ? 'es' : ''} *
                                </label>
                                <button
                                    type="button"
                                    onClick={addAddress}
                                    style={{
                                        padding: '6px 12px',
                                        background: '#159dbc',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#117a8b'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#159dbc'}
                                >
                                    <i className="ri-add-line"></i>
                                    + Dirección
                                </button>
                            </div>
                            {addresses.map((address, index) => (
                                <div key={index} style={{ marginBottom: index < addresses.length - 1 ? '12px' : '0', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => updateAddress(index, e.target.value)}
                                        placeholder={`Dirección ${index + 1}${index === 0 ? ' (principal)' : ''}...`}
                                        required={index === 0}
                                        style={{
                                            flex: 1,
                                            padding: '10px 12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '14px'
                                        }}
                                    />
                                    {addresses.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAddress(index)}
                                            style={{
                                                padding: '10px 12px',
                                                background: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minWidth: '40px'
                                            }}
                                            title="Eliminar dirección"
                                        >
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>


                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.main_email}
                                    onChange={(e) => handleInputChange('main_email', e.target.value.toLowerCase())}
                                    placeholder="contacto@empresa.com"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        textTransform: 'none'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    value={formData.main_phone}
                                    onChange={(e) => handleInputChange('main_phone', e.target.value)}
                                    placeholder="+51 999 999 999"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Información del Certificado */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0A165E', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #e5e7eb' }}>
                            Información del Certificado
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Número de Registro *
                                </label>
                                <input
                                    type="text"
                                    value={formData.register_number}
                                    onChange={(e) => handleInputChange('register_number', e.target.value.toUpperCase())}
                                    placeholder="IC-QM-2025001"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        textTransform: 'uppercase'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Norma ISO *
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={formData.iso_standard_id}
                                        onChange={(e) => {
                                            if (e.target.value === 'create_new') {
                                                setShowNewIsoModal(true);
                                            } else {
                                                handleInputChange('iso_standard_id', e.target.value);
                                            }
                                        }}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            background: 'white'
                                        }}
                                    >
                                        <option value="">Seleccionar ISO</option>
                                        {isoNorms.map((iso) => (
                                            <option key={iso.id} value={iso.id}>
                                                {iso.iso_code} - {iso.name}
                                            </option>
                                        ))}
                                        <option value="create_new" style={{ backgroundColor: '#f0f9ff', color: '#0369a1', fontWeight: 'bold' }}>
                                            + Crear nueva Norma ISO
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                Alcance del Certificado *
                            </label>
                            <textarea
                                value={formData.scope}
                                onChange={(e) => handleInputChange('scope', e.target.value)}
                                placeholder="Descripción del alcance del certificado..."
                                required
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                    </div>

                    {/* Fechas */}
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0A165E', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #e5e7eb' }}>
                            Fechas del Certificado
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Fecha Inicial *
                                </label>
                                <input
                                    type="date"
                                    value={formData.initial_certification_date}
                                    onChange={(e) => handleInputChange('initial_certification_date', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Fecha de Emisión *
                                </label>
                                <input
                                    type="date"
                                    value={formData.issue_date}
                                    onChange={(e) => handleInputChange('issue_date', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Fecha de Recertificación *
                                </label>
                                <input
                                    type="date"
                                    value={formData.recertification_date}
                                    onChange={(e) => handleInputChange('recertification_date', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#374151' }}>
                                    Fecha de Validez *
                                </label>
                                <input
                                    type="date"
                                    value={formData.validity_date}
                                    onChange={(e) => handleInputChange('validity_date', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                resetForm();
                            }}
                            disabled={loading}
                            style={{
                                padding: '10px 24px',
                                background: '#f3f4f6',
                                color: '#374151',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '10px 24px',
                                background: loading ? '#9ca3af' : '#159dbc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? (
                                <>
                                    <i className="ri-loader-4-line" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}></i>
                                    Creando...
                                </>
                            ) : (
                                <>
                                    <i className="ri-save-line" style={{ marginRight: '8px' }}></i>
                                    Crear Certificado
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal para Crear Nueva Norma ISO */}
            {showNewIsoModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        boxShadow: '0 25px 35px -5px rgba(0, 0, 0, 0.2)'
                    }}>
                        <div style={{
                            padding: '24px',
                            borderBottom: '1px solid #e5e7eb',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#f8fafc',
                            borderRadius: '12px 12px 0 0'
                        }}>
                            <h3 style={{ margin: 0, color: '#0A165E', fontSize: '1.3rem', fontWeight: 700 }}>
                                <i className="ri-add-box-line" style={{ marginRight: '8px', color: '#159dbc' }}></i>
                                Crear Nueva Norma ISO
                            </h3>
                            <button
                                onClick={() => {
                                    setShowNewIsoModal(false);
                                    setNewIsoForm({ iso_code: '', name: '', description: '', version: '' });
                                }}
                                disabled={loading}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#666',
                                    padding: '0',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div style={{ padding: '24px' }}>
                            <form onSubmit={(e) => { e.preventDefault(); handleCreateNewIso(); }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
                                            Código ISO *
                                        </label>
                                        <input
                                            type="text"
                                            value={newIsoForm.iso_code}
                                            onChange={(e) => handleNewIsoFormChange('iso_code', e.target.value.toUpperCase())}
                                            placeholder="ISO 9001, HACCP, BPM..."
                                            required
                                            disabled={loading}
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '2px solid #e5e7eb',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                textTransform: 'uppercase',
                                                transition: 'border-color 0.2s',
                                                outline: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#159dbc'}
                                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
                                            Versión
                                        </label>
                                        <input
                                            type="text"
                                            value={newIsoForm.version}
                                            onChange={(e) => handleNewIsoFormChange('version', e.target.value)}
                                            placeholder="2015, 2018, 2022..."
                                            disabled={loading}
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '2px solid #e5e7eb',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                transition: 'border-color 0.2s',
                                                outline: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#159dbc'}
                                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
                                        Nombre de la Norma *
                                    </label>
                                    <input
                                        type="text"
                                        value={newIsoForm.name}
                                        onChange={(e) => handleNewIsoFormChange('name', e.target.value)}
                                        placeholder="Sistema de gestión de calidad..."
                                        required
                                        disabled={loading}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '2px solid #e5e7eb',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            transition: 'border-color 0.2s',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#159dbc'}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
                                        Descripción
                                    </label>
                                    <textarea
                                        value={newIsoForm.description}
                                        onChange={(e) => handleNewIsoFormChange('description', e.target.value)}
                                        placeholder="Descripción detallada de la norma ISO..."
                                        rows={4}
                                        disabled={loading}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '2px solid #e5e7eb',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            transition: 'border-color 0.2s',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#159dbc'}
                                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowNewIsoModal(false);
                                            setNewIsoForm({ iso_code: '', name: '', description: '', version: '' });
                                        }}
                                        disabled={loading}
                                        style={{
                                            padding: '12px 24px',
                                            background: '#f3f4f6',
                                            color: '#374151',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#e5e7eb')}
                                        onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#f3f4f6')}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || !newIsoForm.iso_code.trim() || !newIsoForm.name.trim()}
                                        style={{
                                            padding: '12px 24px',
                                            background: loading || !newIsoForm.iso_code.trim() || !newIsoForm.name.trim() ? '#9ca3af' : '#159dbc',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            cursor: loading || !newIsoForm.iso_code.trim() || !newIsoForm.name.trim() ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            transition: 'background-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!loading && newIsoForm.iso_code.trim() && newIsoForm.name.trim()) {
                                                e.currentTarget.style.background = '#117a8b';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!loading && newIsoForm.iso_code.trim() && newIsoForm.name.trim()) {
                                                e.currentTarget.style.background = '#159dbc';
                                            }
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <i className="ri-loader-4-line" style={{ animation: 'spin 1s linear infinite' }}></i>
                                                Creando...
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-add-line"></i>
                                                Crear Norma ISO
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default NewCertificateModal;
