const PDF_URL = '/certificates/leed-green-associate-henrry-william-ramos-altamirano-2.pdf';
const PDF_URL_ES = '/certificates/leed-green-associate-henrry-william-ramos-altamirano-es.pdf';
const PDF_URL_FRANKLIN = '/certificates/franklin-atonio-meza-marcatona.pdf';
const QR_URL = '/certificates/qr-henrry.jpg';
const QR_URL_ES = '/certificates/qr-henrry-es.png';
const QR_URL_FRANKLIN = '/certificates/qr-franklin.png';

const HENRRY = {
    company_id: 1,
    company: 'HENRRY WILLIAM RAMOS ALTAMIRANO',
    company_name: 'HENRRY WILLIAM RAMOS ALTAMIRANO',
    company_country: 'Perú',
    company_address: 'Perú',
    company_addresses: [] as string[],
    company_token: '4f3c2a10-8b21-4d5e-9a77-1c0e6b8a2512',
};

const FRANKLIN = {
    company_id: 2,
    company: 'FRANKLIN ATONIO MEZA MARCATONA',
    company_name: 'FRANKLIN ATONIO MEZA MARCATONA',
    company_country: 'Perú',
    company_address: 'Perú',
    company_addresses: [] as string[],
    company_token: '7c2a9e14-5b68-4d3f-a1e0-6f8b2c4d9a17',
};

const RUIZ = {
    company_id: 3,
    company: 'RUIZ ARCE LUIS ALEX',
    company_name: 'RUIZ ARCE LUIS ALEX',
    company_country: 'Perú',
    company_address: 'Perú',
    company_addresses: [] as string[],
    company_token: '3f8c2a61-7b40-4e95-a2d1-6c9e0b4f8a17',
};

export const DEMO_CERTIFICATE = {
    id: 1,
    number: 'ICA-LGA-2512104',
    registration_number: 'ICA-LGA-2512104',
    public_token: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    ...HENRRY,
    status: 'Activo',
    issue_date: '2025-12-04',
    initial_certification_date: '2025-12-04',
    standard_code: 'LEED Green Associate',
    iso_standard_code: 'LEED Green Associate',
    standard_name: 'LEED GREEN ASSOCIATE',
    iso_standard_name: 'LEED GREEN ASSOCIATE',
    scope: 'Ha completado el curso LEED Green Associate (100 horas), demostrando conocimiento en prácticas de construcción sostenible y principios LEED. Certificado emitido por INTERCERT con aprobación de Exemplar Global. Referencia TP-06587.',
    file_url: PDF_URL,
    qr_image_url: QR_URL,
};

export const DEMO_CERTIFICATE_ES = {
    id: 2,
    number: 'ICA-LGA-2512104',
    registration_number: 'ICA-LGA-2512104',
    public_token: 'c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f',
    ...HENRRY,
    status: 'Activo',
    issue_date: '2025-12-04',
    initial_certification_date: '2025-12-04',
    standard_code: 'LEED Green Associate',
    iso_standard_code: 'LEED Green Associate',
    standard_name: 'LEED GREEN ASSOCIATE (ESPAÑOL)',
    iso_standard_name: 'LEED GREEN ASSOCIATE (ESPAÑOL)',
    scope: 'Ha completado satisfactoriamente el curso LEED Green Associate (100 horas), demostrando experiencia en prácticas de construcción sostenible y en los principios LEED (Liderazgo en Energía y Diseño Ambiental). Certificado emitido por INTERCERT y aprobado por Exemplar Global.',
    file_url: PDF_URL_ES,
    qr_image_url: QR_URL_ES,
};

export const DEMO_CERTIFICATE_FRANKLIN = {
    id: 3,
    number: 'ICA-SAM-2611020',
    registration_number: 'ICA-SAM-2611020',
    public_token: 'e4b7c1d8-2a90-4f63-8b15-0c6d7e8f9a21',
    ...FRANKLIN,
    status: 'Activo',
    issue_date: '2026-11-20',
    initial_certification_date: '2026-11-20',
    standard_code: 'Sostenibilidad Ambiental',
    iso_standard_code: 'Sostenibilidad Ambiental',
    standard_name: 'SOSTENIBILIDAD AMBIENTAL',
    iso_standard_name: 'SOSTENIBILIDAD AMBIENTAL',
    scope: 'Ha aprobado satisfactoriamente el curso de Sostenibilidad Ambiental (120 horas), habiendo desarrollado conocimientos y competencias en sostenibilidad ambiental, gestión responsable de los recursos naturales, protección del medio ambiente, desarrollo sostenible y buenas prácticas ambientales, bajo la norma ISO 14001:201. Certificado emitido por INTERCERT.',
    file_url: PDF_URL_FRANKLIN,
    qr_image_url: QR_URL_FRANKLIN,
};

const PROFILES = [
    { ...HENRRY, certificates: [DEMO_CERTIFICATE, DEMO_CERTIFICATE_ES] },
    { ...FRANKLIN, certificates: [DEMO_CERTIFICATE_FRANKLIN] },
    { ...RUIZ, certificates: [] as Array<typeof DEMO_CERTIFICATE> },
];

const PROFILE_TERMS: Record<number, string[]> = {
    3: ['RUIZ', 'ARCE', 'LUIS', 'ALEX'],
};

export const DEMO_CERTIFICATES = PROFILES.flatMap((profile) => profile.certificates);

const EXTRA_TERMS: Record<number, string[]> = {
    1: ['TP-06587', 'Exemplar Global', 'LEED', 'GREEN ASSOCIATE', 'LEED GREEN ASSOCIATE', 'HENRRY', 'WILLIAM', 'RAMOS', 'ALTAMIRANO'],
    2: [
        'LEED',
        'GREEN ASSOCIATE',
        'LEED GREEN ASSOCIATE',
        'Certificado de Capacitacion',
        'sostenibilidad',
        'Liderazgo en Energia',
        'Exemplar Global',
        'espanol',
        'HENRRY',
        'WILLIAM',
        'RAMOS',
        'ALTAMIRANO',
    ],
    3: [
        'SOSTENIBILIDAD AMBIENTAL',
        'Sostenibilidad Ambiental',
        'ISO 14001:201',
        'ICA-SAM-2611020',
        'FRANKLIN',
        'ATONIO',
        'MEZA',
        'MARCATONA',
    ],
};

const normalize = (value: string) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

const haystackFor = (cert: (typeof DEMO_CERTIFICATES)[number]) =>
    [
        cert.company_name,
        cert.number,
        cert.standard_name,
        cert.standard_code,
        cert.scope,
        ...(EXTRA_TERMS[cert.id] || []),
    ]
        .join(' ')
        .toLowerCase();

const HAYSTACKS = new Map(DEMO_CERTIFICATES.map((cert) => [cert.id, normalize(haystackFor(cert))]));

const profileFor = (identifier: string) => {
    const needle = normalize(identifier);
    return PROFILES.find(
        (profile) => needle === String(profile.company_id) || needle === normalize(profile.company_token)
    );
};

const profileHaystack = (profile: (typeof PROFILES)[number]) =>
    normalize([profile.company_name, ...(PROFILE_TERMS[profile.company_id] || [])].join(' '));

const findProfilesByName = (query: string) => {
    const needle = normalize(query);
    if (needle.length < 2) return [];
    return PROFILES.filter((profile) => profileHaystack(profile).includes(needle));
};

export const findDemoCertificates = (query: string) => {
    const needle = normalize(query);
    if (!needle) return [];

    const byIdentity = DEMO_CERTIFICATES.filter(
        (cert) =>
            needle === normalize(cert.public_token) ||
            needle === normalize(cert.number) ||
            needle === normalize(cert.registration_number)
    );
    if (byIdentity.length > 0) return byIdentity;

    const profile = profileFor(needle);
    if (profile) return profile.certificates;

    if (needle.length < 2) return [];

    return DEMO_CERTIFICATES.filter((cert) => HAYSTACKS.get(cert.id)?.includes(needle));
};

export const findDemoCertificate = (identifier: string) => {
    const needle = normalize(identifier);
    const byToken = DEMO_CERTIFICATES.find((cert) => needle === normalize(cert.public_token));
    if (byToken) return byToken;

    const byNumber = DEMO_CERTIFICATES.find(
        (cert) => needle === normalize(cert.number) || needle === normalize(cert.registration_number)
    );
    if (byNumber) return byNumber;

    return findDemoCertificates(identifier)[0] ?? null;
};

export const matchesDemoCertificate = (query: string) => findDemoCertificates(query).length > 0;

export const demoSearchResponse = (query = '') => {
    const certificates = query ? findDemoCertificates(query) : DEMO_CERTIFICATES;
    const coveredCompanies = new Set(certificates.map((cert) => cert.company_id));
    const profiles = query
        ? findProfilesByName(query)
            .filter((profile) => !coveredCompanies.has(profile.company_id))
            .map((profile) => ({
                id: `profile-${profile.company_id}`,
                profile_only: true,
                company_id: profile.company_id,
                company: profile.company_name,
                company_name: profile.company_name,
                company_token: profile.company_token,
                company_country: profile.company_country,
            }))
        : [];
    const results = [...certificates, ...profiles];
    return {
        count: results.length,
        results,
        next: null,
        previous: null,
    };
};

export const demoVerifyResponse = (identifier?: string) => {
    const certificate = identifier ? findDemoCertificate(identifier) : DEMO_CERTIFICATE;
    return {
        valid: Boolean(certificate),
        certificate: certificate ? { ...certificate } : null,
    };
};

const toCompanyCertificate = (cert: (typeof DEMO_CERTIFICATES)[number]) => ({
    id: cert.id,
    iso_standard_name: cert.iso_standard_name,
    iso_standard_code: cert.iso_standard_code,
    standard_name: cert.standard_name,
    standard_code: cert.standard_code,
    registration_number: cert.number,
    number: cert.number,
    public_token: cert.public_token,
    status: cert.status,
    issue_date: cert.issue_date,
    company: cert.company_name,
    company_id: cert.company_id,
    file_url: cert.file_url,
});

export const demoCompanyCertificates = (identifier?: string | number) => {
    const profile = profileFor(String(identifier ?? ''));
    if (!profile) {
        return {
            certificates: [],
            total_count: 0,
            returned_count: 0,
            company: null,
        };
    }

    return {
        certificates: profile.certificates.map(toCompanyCertificate),
        total_count: profile.certificates.length,
        returned_count: profile.certificates.length,
        company: {
            id: profile.company_id,
            name: profile.company_name,
            country: profile.company_country,
        },
    };
};
