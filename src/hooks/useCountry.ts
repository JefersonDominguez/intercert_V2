/**
 * useCountry Hook
 * 
 * Hook personalizado para manejar la lógica del país del usuario
 */

import { useState, useEffect } from 'react';
import { getSavedCountry, handleCountryRedirection } from '@/services/countryDetection';
import { getCurrentCountry } from '@/config/countries';
import type { CountryConfig } from '@/types/config';

export const useCountry = (options: { autoRedirect?: boolean } = {}) => {
    const { autoRedirect = false } = options;
    const [country, setCountry] = useState<CountryConfig>(getCurrentCountry());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeCountry = async () => {
            setIsLoading(true);

            // Si autoRedirect está activado, manejar la redirección automática
            if (autoRedirect) {
                await handleCountryRedirection();
            }

            // Actualizar el estado del país actual
            const currentCountry = getCurrentCountry();
            setCountry(currentCountry);
            setIsLoading(false);
        };

        initializeCountry();
    }, [autoRedirect]);

    return {
        country,
        isLoading,
        savedCountry: getSavedCountry(),
    };
};

export default useCountry;
