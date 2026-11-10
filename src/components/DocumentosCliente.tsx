import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import './DocumentosCliente.css';

// Interfaces
interface Documento {
    id: number;
    nombre: string;
    extension: string;
    tamanio: string;
    fecha_subida: string;
    subido_por_trabajador: boolean;
    notas?: string;
    url?: string;
}

interface DocumentoEstado {
    tipo: string;
    nombre: string;
    es_obligatorio: boolean;
    subido: boolean;
    validado: boolean;
    documento?: Documento;
}

interface DocumentosResponse {
    total_documentos: number;
    documentos_subidos: number;
    documentos_faltantes: number;
    obligatorios_completos: boolean;
    documentos: DocumentoEstado[];
}

interface DocumentosClienteProps {
    certificationRequestId: string | number;
    rucEmpresa: string;
    readonly?: boolean;
}

/**
 * Componente para visualizar y gestionar documentos de una certificación
 * Usado en Dashboard por trabajadores para revisar y subir documentos faltantes
 */
const DocumentosCliente: React.FC<DocumentosClienteProps> = ({
    certificationRequestId,
    rucEmpresa,
    readonly = false
}) => {
    const [documentos, setDocumentos] = useState<DocumentosResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
    const [previewDoc, setPreviewDoc] = useState<Documento | null>(null);
    const [nota, setNota] = useState('');
    const [showNotaModal, setShowNotaModal] = useState<Documento | null>(null);

    useEffect(() => {
        if (certificationRequestId) {
            cargarDocumentos();
        }
    }, [certificationRequestId]);

    const cargarDocumentos = async () => {
        setLoading(true);
        try {
            const response = await api.get<DocumentosResponse>(
                `/documentos/certificacion/${certificationRequestId}/`
            );
            setDocumentos(response.data);
            setError(null);
        } catch (err) {
            console.error('Error cargando documentos:', err);
            setError('Error cargando documentos');
        } finally {
            setLoading(false);
        }
    };

    const handleUploadDocumento = async (tipoDocumento: string, file: File) => {
        if (!file) return;

        setUploadingDoc(tipoDocumento);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tipo_documento', tipoDocumento);
        formData.append('ruc_empresa', rucEmpresa);
        formData.append('certification_request_id', String(certificationRequestId));

        try {
            await api.post('/documentos/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            await cargarDocumentos(); // Recargar documentos
            alert('Documento subido exitosamente');
        } catch (err: any) {
            console.error('Error subiendo documento:', err);
            const errorMessage = err.response?.data?.error || 'Error subiendo documento';
            alert(`Error: ${errorMessage}`);
        } finally {
            setUploadingDoc(null);
        }
    };

    const handlePreview = async (documento: Documento) => {
        try {
            const response = await api.get<{ url: string }>(
                `/documentos/${documento.id}/url/?action=preview`
            );
            setPreviewDoc({
                ...documento,
                url: response.data.url
            });
        } catch (err) {
            console.error('Error obteniendo preview:', err);
            alert('Error obteniendo URL de preview');
        }
    };

    const handleDownload = async (documento: Documento) => {
        try {
            const response = await api.get<{ url: string }>(
                `/documentos/${documento.id}/url/?action=download`
            );
            window.open(response.data.url, '_blank');
        } catch (err) {
            console.error('Error obteniendo descarga:', err);
            alert('Error obteniendo URL de descarga');
        }
    };

    const handleValidar = async (documentoId: number) => {
        try {
            await api.post(`/documentos/${documentoId}/validar/`, {
                notas: nota || null
            });

            await cargarDocumentos();
            alert('Documento validado exitosamente');
            setShowNotaModal(null);
            setNota('');
        } catch (err) {
            console.error('Error validando documento:', err);
            alert('Error validando documento');
        }
    };

    const getIconoDocumento = (extension?: string) => {
        const iconos: Record<string, string> = {
            'pdf': 'ri-file-pdf-line',
            'doc': 'ri-file-word-line',
            'docx': 'ri-file-word-line',
            'png': 'ri-image-line',
            'jpg': 'ri-image-line',
            'jpeg': 'ri-image-line',
        };
        return iconos[extension?.toLowerCase() || ''] || 'ri-file-line';
    };

    const puedePreview = (extension?: string) => {
        return ['pdf', 'png', 'jpg', 'jpeg'].includes(extension?.toLowerCase() || '');
    };

    if (loading) {
        return (
            <div className="documentos-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="documentos-error">
                <i className="ri-error-warning-line"></i>
                <p>{error}</p>
                <button onClick={cargarDocumentos} className="btn-retry">
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="documentos-cliente-container">
            {/* Resumen */}
            <div className="documentos-resumen">
                <div className="resumen-card">
                    <div className="resumen-icon total">
                        <i className="ri-file-list-line"></i>
                    </div>
                    <div className="resumen-info">
                        <div className="resumen-valor">{documentos?.total_documentos || 0}</div>
                        <div className="resumen-label">Total</div>
                    </div>
                </div>
                <div className="resumen-card">
                    <div className="resumen-icon subidos">
                        <i className="ri-file-check-line"></i>
                    </div>
                    <div className="resumen-info">
                        <div className="resumen-valor">{documentos?.documentos_subidos || 0}</div>
                        <div className="resumen-label">Subidos</div>
                    </div>
                </div>
                <div className="resumen-card">
                    <div className="resumen-icon faltantes">
                        <i className="ri-file-warning-line"></i>
                    </div>
                    <div className="resumen-info">
                        <div className="resumen-valor">{documentos?.documentos_faltantes || 0}</div>
                        <div className="resumen-label">Faltantes</div>
                    </div>
                </div>
                <div className="resumen-card">
                    <div className={`resumen-icon ${documentos?.obligatorios_completos ? 'validados' : 'pendientes'}`}>
                        <i className={documentos?.obligatorios_completos ? 'ri-checkbox-circle-line' : 'ri-alert-line'}></i>
                    </div>
                    <div className="resumen-info">
                        <div className="resumen-label">
                            {documentos?.obligatorios_completos ? 'Completo' : 'Incompleto'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Documentos */}
            <div className="documentos-lista">
                {documentos?.documentos?.map((doc) => (
                    <div
                        key={doc.tipo}
                        className={`documento-card ${doc.es_obligatorio ? 'obligatorio' : 'opcional'} ${!doc.subido ? 'faltante' : ''}`}
                    >
                        <div className="documento-header">
                            <div className="documento-titulo">
                                <i className={doc.subido ? getIconoDocumento(doc.documento?.extension) : 'ri-file-line'}></i>
                                <span>{doc.nombre}</span>
                                {doc.es_obligatorio && <span className="badge-obligatorio">Obligatorio</span>}
                            </div>
                            {doc.subido && (
                                <div className="documento-estado">
                                    {doc.validado ? (
                                        <span className="badge-validado">
                                            <i className="ri-checkbox-circle-line"></i> Validado
                                        </span>
                                    ) : (
                                        <span className="badge-pendiente">
                                            <i className="ri-time-line"></i> Pendiente
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {doc.subido && doc.documento ? (
                            <div className="documento-info">
                                <div className="info-grid">
                                    <div className="info-item">
                                        <i className="ri-file-line"></i>
                                        <span>{doc.documento.nombre}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="ri-database-line"></i>
                                        <span>{doc.documento.tamanio}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="ri-calendar-line"></i>
                                        <span>{new Date(doc.documento.fecha_subida).toLocaleDateString()}</span>
                                    </div>
                                    {doc.documento.subido_por_trabajador && (
                                        <div className="info-item">
                                            <i className="ri-user-star-line"></i>
                                            <span>Subido por trabajador</span>
                                        </div>
                                    )}
                                </div>

                                <div className="documento-acciones">
                                    {puedePreview(doc.documento.extension) ? (
                                        <button
                                            onClick={() => doc.documento && handlePreview(doc.documento)}
                                            className="btn-accion preview"
                                            title="Ver documento"
                                        >
                                            <i className="ri-eye-line"></i> Ver
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => doc.documento && handleDownload(doc.documento)}
                                            className="btn-accion download"
                                            title="Descargar documento"
                                        >
                                            <i className="ri-download-line"></i> Descargar
                                        </button>
                                    )}

                                    {!readonly && !doc.validado && (
                                        <button
                                            onClick={() => setShowNotaModal(doc.documento || null)}
                                            className="btn-accion validar"
                                            title="Validar documento"
                                        >
                                            <i className="ri-checkbox-circle-line"></i> Validar
                                        </button>
                                    )}

                                    {doc.documento.notas && (
                                        <button
                                            onClick={() => alert(doc.documento?.notas)}
                                            className="btn-accion notas"
                                            title="Ver notas"
                                        >
                                            <i className="ri-sticky-note-line"></i> Notas
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="documento-faltante">
                                <p className="texto-faltante">
                                    <i className="ri-information-line"></i>
                                    Este documento no ha sido subido
                                </p>
                                {!readonly && (
                                    <div className="upload-container">
                                        <input
                                            type="file"
                                            id={`upload-${doc.tipo}`}
                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    handleUploadDocumento(doc.tipo, e.target.files[0]);
                                                }
                                            }}
                                            disabled={uploadingDoc === doc.tipo}
                                            style={{ display: 'none' }}
                                        />
                                        <label
                                            htmlFor={`upload-${doc.tipo}`}
                                            className={`btn-upload ${uploadingDoc === doc.tipo ? 'uploading' : ''}`}
                                        >
                                            {uploadingDoc === doc.tipo ? (
                                                <>
                                                    <div className="spinner-small"></div>
                                                    Subiendo...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="ri-upload-cloud-line"></i>
                                                    Subir Documento
                                                </>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal de Preview */}
            {previewDoc && (
                <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
                    <div className="modal-content preview-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <i className={getIconoDocumento(previewDoc.extension)}></i>
                                {previewDoc.nombre}
                            </h3>
                            <button onClick={() => setPreviewDoc(null)} className="btn-close">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            {previewDoc.extension === 'pdf' ? (
                                <iframe
                                    src={previewDoc.url}
                                    title="Preview PDF"
                                    className="preview-iframe"
                                />
                            ) : (
                                <img
                                    src={previewDoc.url}
                                    alt="Preview"
                                    className="preview-image"
                                />
                            )}
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => handleDownload(previewDoc)} className="btn-download-modal">
                                <i className="ri-download-line"></i> Descargar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Validación */}
            {showNotaModal && (
                <div className="modal-overlay" onClick={() => setShowNotaModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Validar Documento</h3>
                            <button onClick={() => setShowNotaModal(null)} className="btn-close">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>¿Deseas agregar alguna observación sobre este documento?</p>
                            <textarea
                                value={nota}
                                onChange={(e) => setNota(e.target.value)}
                                placeholder="Observaciones (opcional)"
                                rows={4}
                                className="nota-textarea"
                            />
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setShowNotaModal(null)} className="btn-cancelar">
                                Cancelar
                            </button>
                            <button onClick={() => handleValidar(showNotaModal.id)} className="btn-validar-confirm">
                                <i className="ri-checkbox-circle-line"></i> Validar Documento
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentosCliente;
