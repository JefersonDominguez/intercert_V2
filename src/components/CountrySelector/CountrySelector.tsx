/**
 * Country Selector Component
 * 
 * Modal para seleccionar el país del usuario
 */

import React, { useState, useEffect } from 'react';
import { COUNTRIES_LIST } from '@/config/countries';
import { changeCountry, getSavedCountry } from '@/services/countryDetection';
import './CountrySelector.css';

interface CountrySelectorProps {
    autoShow?: boolean;
    onClose?: () => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ autoShow = false, onClose }) => {
    const [isOpen, setIsOpen] = useState(autoShow);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    useEffect(() => {
        // Cargar país guardado
        const saved = getSavedCountry();
        setSelectedCountry(saved);

        // Escuchar evento para mostrar el selector
        const handleShow = () => setIsOpen(true);
        window.addEventListener('show-country-selector', handleShow);

        return () => {
            window.removeEventListener('show-country-selector', handleShow);
        };
    }, []);

    const handleSelectCountry = (countryCode: string) => {
        setSelectedCountry(countryCode);
        changeCountry(countryCode);
        setIsOpen(false);
        onClose?.();
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose?.();
    };

    if (!isOpen) return null;

    return (
        <div className="country-selector-overlay" onClick={handleClose}>
            <div className="country-selector-modal" onClick={(e) => e.stopPropagation()}>
                <div className="country-selector-header">
                    <h2>🌎 Selecciona tu país</h2>
                    <p>Elige tu ubicación para ver contenido personalizado</p>
                    <button className="close-button" onClick={handleClose}>
                        ✕
                    </button>
                </div>

                <div className="country-selector-grid">
                    {COUNTRIES_LIST.map((country) => (
                        <button
                            key={country.code}
                            className={`country-card ${selectedCountry === country.code ? 'selected' : ''}`}
                            onClick={() => handleSelectCountry(country.code)}
                        >
                            <div className="country-flag">{country.flag}</div>
                            <div className="country-name">{country.name}</div>
                            {selectedCountry === country.code && (
                                <div className="selected-badge">✓</div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="country-selector-footer">
                    <p className="hint">
                        💡 Puedes cambiar tu país en cualquier momento desde el menú
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CountrySelector;
