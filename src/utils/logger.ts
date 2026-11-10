/**
 * Utilidad para logging en producción
 * Deshabilita console.log/warn/info en producción, mantiene console.error para errores críticos
 */

const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';

// Guardar las funciones originales
const originalConsole = {
    log: console.log,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
    error: console.error,
};

// Deshabilitar logs en producción
if (isProduction) {
    // Reemplazar console.log, warn, info, debug con funciones vacías
    console.log = () => { };
    console.warn = () => { };
    console.info = () => { };
    console.debug = () => { };

    // Mantener console.error pero filtrar mensajes de extensiones y Cloudflare
    console.error = (...args: any[]) => {
        const message = args.join(' ');

        // Filtrar mensajes de extensiones del navegador
        if (
            message.includes('content.bundle.js') ||
            message.includes('Content script') ||
            message.includes('消息发送成功') ||
            message.includes('Find processing started') ||
            message.includes('Duplicate script ID') ||
            message.includes('fido2-page-script') ||
            message.includes('runtime.lastError') ||
            message.includes('extension port is moved') ||
            message.includes('background.js') ||
            // Filtrar mensajes de Cloudflare (más exhaustivo)
            message.includes('cdn-cgi') ||
            message.includes('rocket-loader') ||
            message.includes('challenge-platform') ||
            message.includes('XHR finished loading') ||
            message.includes('Fetch finished loading') ||
            message.includes('sendObjectBeacon') ||
            message.includes('rum?') ||
            message.includes('oneshot') ||
            message.includes('jsd/') ||
            (message.includes('VM') && message.includes('main.js')) ||
            (message.includes('VM') && message.includes('vcd15cbe')) ||
            (message.includes('VM') && message.includes('intercertlatam.com'))
        ) {
            return; // Suprimir estos mensajes
        }

        // Mostrar otros errores
        originalConsole.error.apply(console, args);
    };
}

// Exportar función de logging condicional para uso en el código
export const logger = {
    log: (...args: any[]) => {
        if (!isProduction) {
            originalConsole.log.apply(console, args);
        }
    },
    warn: (...args: any[]) => {
        if (!isProduction) {
            originalConsole.warn.apply(console, args);
        }
    },
    info: (...args: any[]) => {
        if (!isProduction) {
            originalConsole.info.apply(console, args);
        }
    },
    debug: (...args: any[]) => {
        if (!isProduction) {
            originalConsole.debug.apply(console, args);
        }
    },
    error: (...args: any[]) => {
        // Siempre mostrar errores, pero filtrar los de extensiones
        const message = args.join(' ');
        if (
            !message.includes('content.bundle.js') &&
            !message.includes('Content script') &&
            !message.includes('cdn-cgi') &&
            !message.includes('rocket-loader')
        ) {
            originalConsole.error.apply(console, args);
        }
    },
};

// Interceptar y suprimir logs de extensiones y Cloudflare en producción
if (isProduction && typeof window !== 'undefined') {
    // Función para verificar si un mensaje debe ser suprimido
    const shouldSuppress = (message: any) => {
        const msg = typeof message === 'string' ? message : JSON.stringify(message);
        return (
            msg.includes('content.bundle.js') ||
            msg.includes('Content script') ||
            msg.includes('消息发送成功') ||
            msg.includes('Find processing started') ||
            msg.includes('cdn-cgi') ||
            msg.includes('challenge-platform') ||
            msg.includes('rocket-loader') ||
            msg.includes('XHR finished loading') ||
            msg.includes('Fetch finished loading') ||
            msg.includes('rum?') ||
            msg.includes('oneshot') ||
            msg.includes('jsd/') ||
            (msg.includes('VM') && msg.includes('main.js')) ||
            (msg.includes('VM') && msg.includes('vcd15cbe')) ||
            (msg.includes('VM') && msg.includes('intercertlatam.com')) ||
            msg.includes('sendObjectBeacon') ||
            msg.includes('rocket-loader.min.js')
        );
    };

    // Interceptar console.log - ya está deshabilitado arriba, pero agregar filtro adicional
    console.log = function () {
        // No mostrar nada en producción
    };

    // Interceptar console.warn
    console.warn = function () {
        // No mostrar nada en producción
    };

    // Interceptar console.info
    console.info = function () {
        // No mostrar nada en producción
    };

    // Interceptar console.debug
    console.debug = function () {
        // No mostrar nada en producción
    };

    // Mejorar el filtro de console.error
    const originalError = console.error;
    console.error = function (...args: any[]) {
        const message = args.join(' ');
        if (shouldSuppress(message)) {
            return; // Suprimir estos mensajes
        }
        // Mostrar otros errores
        originalError.apply(console, args);
    };

    // Interceptar eventos de red para suprimir logs de Cloudflare
    // Esto no puede suprimir completamente los logs del navegador, pero ayuda
    if (window.performance && window.performance.getEntriesByType) {
        const originalGetEntries = window.performance.getEntriesByType;
        window.performance.getEntriesByType = function (type: string) {
            const entries = originalGetEntries.call(this, type);
            if (type === 'resource') {
                return entries.filter(entry => {
                    const name = entry.name || '';
                    return !name.includes('cdn-cgi') &&
                        !name.includes('challenge-platform') &&
                        !name.includes('rocket-loader');
                });
            }
            return entries;
        };
    }
}

export default logger;
