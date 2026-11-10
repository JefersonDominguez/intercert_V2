import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'lg' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10'
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div
                className={`animate-spin rounded-full border-4 border-t-4 border-blue-500 border-opacity-25 ${sizeClasses[size]}`}
                style={{ borderTopColor: '#159dbc' }}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
