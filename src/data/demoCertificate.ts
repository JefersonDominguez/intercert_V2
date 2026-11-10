const PDF_URL = '/certificates/leed-green-associate-henrry-william-ramos-altamirano-1.pdf';

export const DEMO_CERTIFICATE = {
    id: 1,
    number: 'ICA-LGA-2512104',
    registration_number: 'ICA-LGA-2512104',
    public_token: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    company_id: 1,
    company: 'HENRRY WILLIAM RAMOS ALTAMIRANO',
    company_name: 'HENRRY WILLIAM RAMOS ALTAMIRANO',
    company_country: 'Perú',
    company_address: 'Perú',
    company_addresses: [] as string[],
    company_token: '4f3c2a10-8b21-4d5e-9a77-1c0e6b8a2512',
    status: 'Activo',
    issue_date: '2025-12-04',
    initial_certification_date: '2025-12-04',
    standard_code: 'LEED Green Associate',
    iso_standard_code: 'LEED Green Associate',
    standard_name: 'LEED GREEN ASSOCIATE',
    iso_standard_name: 'LEED GREEN ASSOCIATE',
    scope: 'Ha completado el curso LEED Green Associate (100 horas), demostrando conocimiento en prácticas de construcción sostenible y principios LEED. Certificado emitido por INTERCERT con aprobación de Exemplar Global. Referencia TP-06587.',
    file_url: PDF_URL,
};

const HAYSTACK = [
    DEMO_CERTIFICATE.company_name,
    DEMO_CERTIFICATE.number,
    'LEED',
    'GREEN ASSOCIATE',
    'LEED GREEN ASSOCIATE',
    'TP-06587',
    'Exemplar Global',
    'HENRRY',
    'WILLIAM',
    'RAMOS',
    'ALTAMIRANO',
].join(' ').toLowerCase();

const normalize = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

export const matchesDemoCertificate = (query: string) => {
    const needle = normalize(query);
    if (!needle) return false;
    if (
        needle === DEMO_CERTIFICATE.company_token ||
        needle === DEMO_CERTIFICATE.public_token ||
        needle === String(DEMO_CERTIFICATE.company_id)
    ) {
        return true;
    }
    if (needle.length < 2) return false;
    return HAYSTACK.includes(needle);
};

export const demoSearchResponse = () => ({
    count: 1,
    results: [DEMO_CERTIFICATE],
    next: null,
    previous: null,
});

export const demoVerifyResponse = () => ({
    valid: true,
    certificate: { ...DEMO_CERTIFICATE },
});

export const demoCompanyCertificates = () => ({
    certificates: [
        {
            id: DEMO_CERTIFICATE.id,
            iso_standard_name: DEMO_CERTIFICATE.iso_standard_name,
            iso_standard_code: DEMO_CERTIFICATE.iso_standard_code,
            registration_number: DEMO_CERTIFICATE.number,
            number: DEMO_CERTIFICATE.number,
            public_token: DEMO_CERTIFICATE.public_token,
            status: DEMO_CERTIFICATE.status,
            issue_date: DEMO_CERTIFICATE.issue_date,
            company: DEMO_CERTIFICATE.company_name,
            company_id: DEMO_CERTIFICATE.company_id,
            file_url: DEMO_CERTIFICATE.file_url,
        },
    ],
    total_count: 1,
    returned_count: 1,
    company: {
        id: DEMO_CERTIFICATE.company_id,
        name: DEMO_CERTIFICATE.company_name,
        country: DEMO_CERTIFICATE.company_country,
    },
});
