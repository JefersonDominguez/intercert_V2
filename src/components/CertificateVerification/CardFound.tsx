import React from 'react';
// @ts-ignore
import CertificationFoundDisplay from './CertificationFoundDisplay';

export interface CertificationData {
    companyAddress?: string;
    companyName: string;
    initialDate?: string;
    isoCode: string;
    isoName: string;
    issueDate: string;
    recertificationDate?: string;
    registrationNumber: string;
    scope?: string;
    status: string;
    validDate: string;
}

interface CardFoundProps {
    certificationData: CertificationData;
}

const CardFound: React.FC<CardFoundProps> = ({ certificationData }) => {
    return (
        <div className="single-service-item gray-bg border-round wow itfadeUp" data-wow-duration=".9s" data-wow-delay=".3s">
            <div className="service-content">
                <div className="text-center mb-40">
                    <div className="service-icon mb-20">
                        <i className="ri-check-circle-fill" style={{ color: '#28a745' }}></i>
                    </div>
                    <h3 className="service-title mb-10" style={{ color: '#28a745' }}>
                        ¡Certificado Encontrado!
                    </h3>
                    <p className="service-text mb-0">La verificación fue exitosa</p>
                </div>

                <CertificationFoundDisplay
                    companyAddress={certificationData.companyAddress}
                    companyName={certificationData.companyName}
                    initialDate={certificationData.initialDate}
                    isoCode={certificationData.isoCode}
                    isoName={certificationData.isoName}
                    issueDate={certificationData.issueDate}
                    recertificationDate={certificationData.recertificationDate}
                    registrationNumber={certificationData.registrationNumber}
                    scope={certificationData.scope}
                    status={certificationData.status}
                    validDate={certificationData.validDate}
                />
            </div>
        </div>
    );
};

export default CardFound;
