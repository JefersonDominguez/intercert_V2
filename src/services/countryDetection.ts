/**
 * Country Detection and Redirection Service
 * 
 * Detecta automáticamente el país del usuario y lo redirige a la ruta correcta
 */

import { getCountryByCode, getCurrentCountry } from '@/config/countries';

// Mapeo de códigos de país ISO a nuestros códigos
const ISO_TO_COUNTRY_CODE: Record<string, string> = {
    'PE': 'pe',  // Perú
    'CO': 'co',  // Colombia
    'EC': 'ec',  // Ecuador
    'ES': 'es',  // España
    'MX': 'mx',  // México
    'PA': 'pa',  // Panamá
    'CR': 'cr',  // Costa Rica
};

/**
 * Detecta el país del usuario usando múltiples métodos
 */
export const detectUserCountry = async (): Promise<string> => {
    try {
        // Método 1: Usar API de geolocalización (ipapi.co es gratuito)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.country_code) {
            const countryCode = ISO_TO_COUNTRY_CODE[data.country_code];
            if (countryCode) {
                return countryCode;
            }
        }
    } catch (error) {
        // Error silencioso, continuar con otros métodos
    }

    // Método 2: Usar Intl API del navegador
    try {
        const locale = navigator.language || (navigator as any).userLanguage;
        const countryCode = locale.split('-')[1]?.toUpperCase();

        if (countryCode && ISO_TO_COUNTRY_CODE[countryCode]) {
            return ISO_TO_COUNTRY_CODE[countryCode];
        }
    } catch (error) {
        // Error silencioso, continuar con otros métodos
    }

    // Método 3: Usar timezone
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timezoneToCountry: Record<string, string> = {
            'America/Lima': 'pe',
            'America/Bogota': 'co',
            'America/Guayaquil': 'ec',
            'Europe/Madrid': 'es',
            'America/Mexico_City': 'mx',
            'America/Panama': 'pa',
            'America/Costa_Rica': 'cr',
        };

        if (timezoneToCountry[timezone]) {
            return timezoneToCountry[timezone];
        }
    } catch (error) {
        // Error silencioso
    }

    // Por defecto, retornar 'global'
    return 'global';
};

/**
 * Verifica si el usuario ya tiene un país seleccionado en localStorage
 */
export const getSavedCountry = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('selectedCountry');
};

/**
 * Guarda la selección de país del usuario
 */
export const saveCountry = (countryCode: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('selectedCountry', countryCode);
};

/**
 * Redirige al usuario a la ruta correcta del país
 */
export const redirectToCountry = (countryCode: string, currentPath: string = '/'): void => {
    if (typeof window === 'undefined') return;

    const country = getCountryByCode(countryCode);
    const currentCountry = getCurrentCountry();

    // Si ya está en el país correcto, no redirigir
    if (currentCountry.code === country.code) {
        return;
    }

    // Construir nueva URL
    let newPath = currentPath;

    // Remover el prefijo del país actual si existe
    if (currentCountry.code !== 'global') {
        newPath = currentPath.replace(new RegExp(`^/${currentCountry.code}`), '');
    }

    // Agregar el prefijo del nuevo país
    if (country.code !== 'global') {
        newPath = `/${country.code}${newPath.startsWith('/') ? newPath : '/' + newPath}`;
    } else {
        newPath = newPath || '/';
    }

    window.location.href = newPath;
};

/**
 * Hook principal para manejar la redirección automática por país
 */
export const handleCountryRedirection = async (): Promise<void> => {
    if (typeof window === 'undefined') return;

    // 1. Verificar si ya tiene un país guardado
    const savedCountry = getSavedCountry();
    if (savedCountry) {
        const currentCountry = getCurrentCountry();

        // Si el país guardado es diferente al actual, redirigir
        if (savedCountry !== currentCountry.code) {
            redirectToCountry(savedCountry, window.location.pathname);
        }
        return;
    }

    // 2. Detectar país automáticamente
    const detectedCountry = await detectUserCountry();

    // 3. Guardar y redirigir
    saveCountry(detectedCountry);
    redirectToCountry(detectedCountry, window.location.pathname);
};

/**
 * Muestra un modal para que el usuario seleccione su país manualmente
 */
export const showCountrySelector = (): void => {
    // Esta función se implementará en el componente CountrySelector
    const event = new CustomEvent('show-country-selector');
    window.dispatchEvent(event);
};

/**
 * Cambia el país del usuario
 */
export const changeCountry = (countryCode: string): void => {
    saveCountry(countryCode);
    redirectToCountry(countryCode, window.location.pathname);
};

export default {
    detectUserCountry,
    getSavedCountry,
    saveCountry,
    redirectToCountry,
    handleCountryRedirection,
    showCountrySelector,
    changeCountry,
};
