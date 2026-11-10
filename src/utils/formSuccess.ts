import { toast } from 'react-toastify';
import type { NavigateFunction } from 'react-router-dom';

/** Slug de confirmación de envío (sin prefijo de país). */
export const FORM_SUCCESS_PATH = '/form-successfully-received';

const SUCCESS_MESSAGE =
    '¡Formulario enviado correctamente! Nos pondremos en contacto contigo pronto.';

/**
 * Confirma el envío con toast (esquina superior derecha) y actualiza la URL
 * a /{país}/form-successfully-received sin montar una página dedicada.
 */
export function announceFormSuccess(
    navigate: NavigateFunction,
    buildCountryUrl: (path: string) => string,
    message: string = SUCCESS_MESSAGE,
): void {
    toast.success(message, {
        position: 'top-right',
        autoClose: 6000,
    });
    navigate(buildCountryUrl(FORM_SUCCESS_PATH));
}
