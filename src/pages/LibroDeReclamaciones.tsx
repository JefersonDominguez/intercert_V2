import { useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSeoMetadata } from '../hooks/useSeoMetadata';
import './LibroDeReclamaciones.css';

type Relacion = 'cliente' | 'cliente_certificado' | 'solicitante' | 'otra_parte' | '';
type TipoComunicacion = 'queja' | 'apelacion' | '';

interface FormData {
    nombre: string;
    organizacion: string;
    cargo: string;
    email: string;
    telefono: string;
    relacion: Relacion;
    tipo: TipoComunicacion;
    empresaServicio: string;
    normas: string[];
    normaOtro: string;
    numeroCertificado: string;
    fechaHecho: string;
    auditor: string;
    descripcion: string;
    solicitud: string;
    evidencias: string[];
    evidenciasOtros: string;
    descripcionAdjuntos: string;
    declaracion: boolean;
    nombreDeclaracion: string;
    fechaDeclaracion: string;
}

const RELACIONES: { value: Exclude<Relacion, ''>; label: string }[] = [
    { value: 'cliente', label: 'Cliente' },
    { value: 'cliente_certificado', label: 'Cliente certificado' },
    { value: 'solicitante', label: 'Solicitante' },
    { value: 'otra_parte', label: 'Otra parte interesada' },
];

const NORMAS = [
    { value: 'iso9001', label: 'ISO 9001' },
    { value: 'iso14001', label: 'ISO 14001' },
    { value: 'iso45001', label: 'ISO 45001' },
    { value: 'iso37001', label: 'ISO 37001' },
    { value: 'otro', label: 'Otro' },
];

const EVIDENCIAS = [
    { value: 'correos', label: 'Correos electrónicos' },
    { value: 'informe', label: 'Informe de auditoría' },
    { value: 'fotografias', label: 'Fotografías' },
    { value: 'documentos', label: 'Documentos' },
    { value: 'otros', label: 'Otros' },
    { value: 'ninguna', label: 'No adjunta evidencias' },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

const initialForm: FormData = {
    nombre: '',
    organizacion: '',
    cargo: '',
    email: '',
    telefono: '',
    relacion: '',
    tipo: '',
    empresaServicio: '',
    normas: [],
    normaOtro: '',
    numeroCertificado: '',
    fechaHecho: '',
    auditor: '',
    descripcion: '',
    solicitud: '',
    evidencias: [],
    evidenciasOtros: '',
    descripcionAdjuntos: '',
    declaracion: false,
    nombreDeclaracion: '',
    fechaDeclaracion: todayIso(),
};

const fieldProps = {
    autoCapitalize: 'off' as const,
    autoCorrect: 'off',
    spellCheck: false,
};

const LibroDeReclamaciones = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [location.key]);
    const [formData, setFormData] = useState<FormData>(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const helmet = useSeoMetadata({
        title: 'Formulario de Quejas y Apelaciones | INTERCERT LATAM',
        description:
            'Presenta una queja o apelación ante INTERCERT LATAM. Formato FO-SIG-028-INT.',
        canonical: 'https://intercertlatam.com/libro-de-reclamaciones',
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleList = (key: 'normas' | 'evidencias', value: string) => {
        setFormData((prev) => {
            const current = prev[key];
            let next = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            if (key === 'evidencias' && value === 'ninguna' && !current.includes('ninguna')) {
                next = ['ninguna'];
            }
            if (key === 'evidencias' && value !== 'ninguna') {
                next = next.filter((item) => item !== 'ninguna');
            }
            return { ...prev, [key]: next };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.relacion || !formData.tipo) {
            alert('Seleccione la relación con INTERCERT y el tipo de comunicación.');
            return;
        }
        if (formData.normas.length === 0) {
            alert('Seleccione al menos una norma o esquema.');
            return;
        }
        if (formData.normas.includes('otro') && !formData.normaOtro.trim()) {
            alert('Especifique la norma o esquema en "Otro".');
            return;
        }
        if (formData.evidencias.includes('otros') && !formData.evidenciasOtros.trim()) {
            alert('Especifique las otras evidencias.');
            return;
        }
        if (!formData.declaracion) {
            alert('Debe aceptar la declaración para enviar el formulario.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/forms/libro-reclamaciones/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: formData.nombre.trim(),
                    organizacion: formData.organizacion.trim(),
                    cargo: formData.cargo.trim(),
                    email: formData.email.trim(),
                    telefono: formData.telefono.trim(),
                    relacion: formData.relacion,
                    tipo: formData.tipo,
                    empresa_servicio: formData.empresaServicio.trim(),
                    normas: formData.normas,
                    norma_otro: formData.normaOtro.trim(),
                    numero_certificado: formData.numeroCertificado.trim(),
                    fecha_hecho: formData.fechaHecho,
                    auditor: formData.auditor.trim(),
                    descripcion: formData.descripcion.trim(),
                    solicitud: formData.solicitud.trim(),
                    evidencias: formData.evidencias,
                    evidencias_otros: formData.evidenciasOtros.trim(),
                    descripcion_adjuntos: formData.descripcionAdjuntos.trim(),
                    declaracion: formData.declaracion,
                    nombre_declaracion: formData.nombreDeclaracion.trim(),
                    fecha_declaracion: formData.fechaDeclaracion,
                }),
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data.success) {
                throw new Error(data.error || data.message || 'Error al enviar');
            }

            setIsSuccess(true);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Hubo un error al enviar: ${message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const tipoLabel = formData.tipo === 'apelacion' ? 'apelación' : 'queja';

    if (isSuccess) {
        return (
            <div className="libro-reclamaciones-page">
                {helmet}
                <div className="ldr-container">
                    <div className="ldr-success">
                        <i className="ri-checkbox-circle-fill" aria-hidden />
                        <h2>Comunicación enviada</h2>
                        <p>
                            Registramos su {tipoLabel}. El área SIG la evaluará y responderá a{' '}
                            <strong>{formData.email}</strong>.
                        </p>
                        <button type="button" className="ldr-submit" onClick={() => navigate('/')}>
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="libro-reclamaciones-page">
            {helmet}
            <div className="ldr-container">
                <button type="button" className="ldr-back" onClick={() => navigate(-1)}>
                    <i className="ri-arrow-left-line" aria-hidden />
                    Regresar
                </button>

                <div className="ldr-card-header">
                    <p className="ldr-code">FO-SIG-028-INT · Versión 1 · 10/09/2026</p>
                    <h1>Formulario de Quejas y Apelaciones</h1>
                    <p>Los campos marcados con (*) son obligatorios.</p>
                </div>

                <div className="ldr-card-body">
                    <form onSubmit={handleSubmit} className="ldr-form">
                        <section>
                            <div className="ldr-section-title">
                                <div className="ldr-section-icon">
                                    <i className="ri-user-line" aria-hidden />
                                </div>
                                <h2>1. Datos de quien presenta la comunicación</h2>
                            </div>
                            <div className="ldr-grid">
                                <div className="ldr-span-2">
                                    <label htmlFor="nombre">Nombres y apellidos / Razón social *</label>
                                    <input
                                        required
                                        id="nombre"
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        {...fieldProps}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="organizacion">Organización</label>
                                    <input
                                        id="organizacion"
                                        type="text"
                                        name="organizacion"
                                        value={formData.organizacion}
                                        onChange={handleInputChange}
                                        {...fieldProps}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cargo">Cargo (si corresponde)</label>
                                    <input
                                        id="cargo"
                                        type="text"
                                        name="cargo"
                                        value={formData.cargo}
                                        onChange={handleInputChange}
                                        {...fieldProps}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Correo electrónico *</label>
                                    <input
                                        required
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        spellCheck={false}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telefono">Teléfono *</label>
                                    <input
                                        required
                                        id="telefono"
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        {...fieldProps}
                                    />
                                </div>
                                <div className="ldr-span-2">
                                    <span className="ldr-label">Relación con INTERCERT *</span>
                                    <div className="ldr-options">
                                        {RELACIONES.map((item) => (
                                            <label key={item.value} className="ldr-option">
                                                <input
                                                    type="radio"
                                                    name="relacion"
                                                    required
                                                    checked={formData.relacion === item.value}
                                                    onChange={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            relacion: item.value,
                                                        }))
                                                    }
                                                />
                                                {item.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="ldr-section-title">
                                <div className="ldr-section-icon">
                                    <i className="ri-chat-3-line" aria-hidden />
                                </div>
                                <h2>2. Tipo de comunicación</h2>
                            </div>
                            <div className="ldr-options ldr-options-stack">
                                <label className="ldr-option">
                                    <input
                                        type="radio"
                                        name="tipo"
                                        required
                                        checked={formData.tipo === 'queja'}
                                        onChange={() =>
                                            setFormData((prev) => ({ ...prev, tipo: 'queja' }))
                                        }
                                    />
                                    <span>
                                        <strong>Queja.</strong> Expresión de insatisfacción respecto de un
                                        servicio, actividad o actuación relacionada con INTERCERT.
                                    </span>
                                </label>
                                <label className="ldr-option">
                                    <input
                                        type="radio"
                                        name="tipo"
                                        checked={formData.tipo === 'apelacion'}
                                        onChange={() =>
                                            setFormData((prev) => ({ ...prev, tipo: 'apelacion' }))
                                        }
                                    />
                                    <span>
                                        <strong>Apelación.</strong> Solicitud para reconsiderar una decisión
                                        de certificación adoptada por INTERCERT que afecta al apelante.
                                    </span>
                                </label>
                            </div>
                        </section>

                        <section>
                            <div className="ldr-section-title">
                                <div className="ldr-section-icon">
                                    <i className="ri-briefcase-line" aria-hidden />
                                </div>
                                <h2>3. Información del servicio</h2>
                            </div>
                            <div className="ldr-grid">
                                <div className="ldr-span-2">
                                    <label htmlFor="empresaServicio">
                                        Empresa relacionada con el servicio *
                                    </label>
                                    <input
                                        required
                                        id="empresaServicio"
                                        type="text"
                                        name="empresaServicio"
                                        value={formData.empresaServicio}
                                        onChange={handleInputChange}
                                        {...fieldProps}
                                    />
                                </div>
                                <div className="ldr-span-2">
                                    <span className="ldr-label">Norma / esquema *</span>
                                    <div className="ldr-options">
                                        {NORMAS.map((item) => (
                                            <label key={item.value} className="ldr-option">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.normas.includes(item.value)}
                                                    onChange={() => toggleList('normas', item.value)}
                                                />
                                                {item.label}
                                            </label>
                                        ))}
                                    </div>
                                    {formData.normas.includes('otro') && (
                                        <input
                                            className="ldr-inline-input"
                                            type="text"
                                            name="normaOtro"
                                            value={formData.normaOtro}
                                            onChange={handleInputChange}
                                            placeholder="Especificar"
                                            required
                                            {...fieldProps}
                                        />
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="numeroCertificado">
                                        N.º de certificado o expediente (si aplica)
                                    </label>
                                    <input
                                        id="numeroCertificado"
                                        type="text"
                                        name="numeroCertificado"
                                        value={formData.numeroCertificado}
                                        onChange={handleInputChange}
                                        {...fieldProps}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fechaHecho">Fecha aproximada del hecho</label>
                                    <input
                                        id="fechaHecho"
                                        type="date"
                                        name="fechaHecho"
                                        value={formData.fechaHecho}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="ldr-span-2">
                                    <label htmlFor="auditor">
                                        Auditor / personal involucrado, si lo conoce
                                    </label>
                                    <input
                                        id="auditor"
                                        type="text"
                                        name="auditor"
                                        value={formData.auditor}
                                        onChange={handleInputChange}
                                        {...fieldProps}
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="ldr-section-title">
                                <div className="ldr-section-icon">
                                    <i className="ri-file-text-line" aria-hidden />
                                </div>
                                <h2>4. Descripción de la queja o apelación</h2>
                            </div>
                            <label htmlFor="descripcion">
                                Describa de manera clara lo ocurrido o, en caso de apelación, la decisión
                                que solicita reconsiderar *
                            </label>
                            <textarea
                                required
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                rows={6}
                                {...fieldProps}
                            />
                        </section>

                        <section>
                            <div className="ldr-section-title">
                                <div className="ldr-section-icon">
                                    <i className="ri-question-answer-line" aria-hidden />
                                </div>
                                <h2>5. ¿Qué solicita a INTERCERT?</h2>
                            </div>
                            <label htmlFor="solicitud" className="ldr-sr">
                                Solicitud *
                            </label>
                            <textarea
                                required
                                id="solicitud"
                                name="solicitud"
                                value={formData.solicitud}
                                onChange={handleInputChange}
                                rows={4}
                                {...fieldProps}
                            />
                        </section>

                        <section>
                            <div className="ldr-section-title">
                                <div className="ldr-section-icon">
                                    <i className="ri-attachment-2" aria-hidden />
                                </div>
                                <h2>6. Evidencias</h2>
                            </div>
                            <p className="ldr-hint">
                                Indique qué tipo de evidencias acompañan esta comunicación. El envío de
                                archivos se coordina por el correo de respuesta.
                            </p>
                            <div className="ldr-options">
                                {EVIDENCIAS.map((item) => (
                                    <label key={item.value} className="ldr-option">
                                        <input
                                            type="checkbox"
                                            checked={formData.evidencias.includes(item.value)}
                                            onChange={() => toggleList('evidencias', item.value)}
                                        />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                            {formData.evidencias.includes('otros') && (
                                <input
                                    className="ldr-inline-input"
                                    type="text"
                                    name="evidenciasOtros"
                                    value={formData.evidenciasOtros}
                                    onChange={handleInputChange}
                                    placeholder="Especificar otros"
                                    required
                                    {...fieldProps}
                                />
                            )}
                            <label htmlFor="descripcionAdjuntos">
                                Descripción de los documentos
                            </label>
                            <textarea
                                id="descripcionAdjuntos"
                                name="descripcionAdjuntos"
                                value={formData.descripcionAdjuntos}
                                onChange={handleInputChange}
                                rows={3}
                                {...fieldProps}
                            />
                        </section>

                        <section>
                            <div className="ldr-section-title">
                                <div className="ldr-section-icon">
                                    <i className="ri-shield-check-line" aria-hidden />
                                </div>
                                <h2>7. Declaración</h2>
                            </div>
                            <label className="ldr-option ldr-declaration">
                                <input
                                    type="checkbox"
                                    checked={formData.declaracion}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            declaracion: e.target.checked,
                                        }))
                                    }
                                    required
                                />
                                <span>
                                    Declaro que la información proporcionada corresponde a los hechos que
                                    conozco y autorizo su utilización por INTERCERT LATAM S.A.C.
                                    exclusivamente para la evaluación y tratamiento de la presente queja o
                                    apelación, de acuerdo con sus disposiciones de confidencialidad y
                                    protección de la información. *
                                </span>
                            </label>
                            <div className="ldr-grid">
                                <div>
                                    <label htmlFor="nombreDeclaracion">Nombre *</label>
                                    <input
                                        required
                                        id="nombreDeclaracion"
                                        type="text"
                                        name="nombreDeclaracion"
                                        value={formData.nombreDeclaracion}
                                        onChange={handleInputChange}
                                        {...fieldProps}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fechaDeclaracion">Fecha *</label>
                                    <input
                                        required
                                        id="fechaDeclaracion"
                                        type="date"
                                        name="fechaDeclaracion"
                                        value={formData.fechaDeclaracion}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="ldr-submit-wrap">
                            <button type="submit" className="ldr-submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LibroDeReclamaciones;
