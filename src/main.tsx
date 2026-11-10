import './jquery-global'
import 'magnific-popup'
import 'jquery-nice-select'
import 'slick-carousel'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Importar CSS personalizado para botones del header
import './assets/css/custom-header-buttons.css'
// Importar logger para deshabilitar logs en producción
import './utils/logger'

// Importar CSS de librerías
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'magnific-popup/dist/magnific-popup.css'
import 'jquery-nice-select/css/nice-select.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/effect-cards'

// Importar CSS local
import './assets/css/spacing.css'
import './assets/css/main.css'
import './assets/css/accordion-icons.css'
import './assets/css/font-awesome-pro.css'
import './assets/css/custom-animation.css'
import './assets/css/remix-icons-fix.css'

// Manejar errores globales de extensiones del navegador
window.addEventListener('error', (event) => {
    // Suprimir errores conocidos de extensiones del navegador
    if (
        event.message && (
            event.message.includes('bootstrap-autofill-overlay') ||
            event.message.includes('insertBefore') ||
            event.message.includes('The node before which the new node is to be inserted') ||
            event.message.includes('Duplicate script ID') ||
            event.message.includes('fido2-page-script') ||
            event.message.includes('runtime.lastError') ||
            event.message.includes('extension port is moved into back/forward cache')
        )
    ) {
        event.preventDefault();
        return;
    }
});

// Manejar promesas rechazadas no manejadas
window.addEventListener('unhandledrejection', (event) => {
    // Solo suprimir errores conocidos de extensiones del navegador
    // NO suprimir errores de fetch o errores de la aplicación
    const reason = event.reason;
    const reasonStr = reason?.message || reason?.toString() || '';
    const reasonStack = reason?.stack || '';

    // Solo suprimir si es claramente un error de extensión
    if (
        reasonStr.includes('Duplicate script ID') ||
        reasonStr.includes('fido2-page-script') ||
        reasonStr.includes('runtime.lastError') ||
        reasonStr.includes('extension port is moved into back/forward cache') ||
        (reasonStr.includes('Failed to fetch') && reasonStack.includes('background.js') && !reasonStr.includes('/gateway/'))
    ) {
        event.preventDefault();
        return;
    }

    // Permitir que otros errores se propaguen normalmente
});

// Los logs ahora se manejan en utils/logger.js
// Esto se mantiene como respaldo para errores no capturados
const originalConsoleError = console.error;
console.error = (...args) => {
    const message = args.map(arg => {
        try {
            return typeof arg === 'string' ? arg : String(arg);
        } catch (e) {
            return '';
        }
    }).join(' ');
    if (
        message.includes('Duplicate script ID') ||
        message.includes('fido2-page-script') ||
        message.includes('runtime.lastError') ||
        message.includes('extension port is moved into back/forward cache') ||
        message.includes('content.bundle.js') ||
        message.includes('Content script') ||
        message.includes('消息发送成功') ||
        message.includes('cdn-cgi') ||
        message.includes('rocket-loader') ||
        message.includes('XHR finished loading') ||
        message.includes('Failed to fetch dynamically imported module') ||
        message.includes('error loading dynamically imported module') ||
        message.includes('tipo MIME no permitido') ||
        (message.includes('Failed to fetch') && message.includes('background.js'))
    ) {
        // Suprimir estos errores de extensiones y Cloudflare
        return;
    }
    // Mantener otros errores
    originalConsoleError.apply(console, args);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
