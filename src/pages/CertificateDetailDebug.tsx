import { useParams } from 'react-router-dom';

const CertificateDetailDebug = () => {
    const { certificateId } = useParams<{ certificateId: string }>();

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
            <h1>Debug Certificate Detail</h1>
            <p>Certificate ID: {certificateId}</p>
            <p>URL: {window.location.href}</p>
            <p>Timestamp: {new Date().toISOString()}</p>
        </div>
    );
};

export default CertificateDetailDebug;
