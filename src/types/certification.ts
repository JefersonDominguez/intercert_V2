/**
 * Certification Types
 * 
 * Types for certification management
 */

import type { BaseEntity, Address, ContactInfo } from './common';

export interface Certificate extends BaseEntity {
    certificate_number: string;
    company: Company;
    iso_standard: ISOStandard;
    issue_date: string;
    expiry_date: string;
    status: CertificateStatus;
    scope?: string;
    auditor?: string;
    notes?: string;
    file_url?: string;
    qr_code?: string;
}

export type CertificateStatus =
    | 'active'
    | 'expired'
    | 'suspended'
    | 'revoked'
    | 'pending'
    | 'ACTIVE'
    | 'EXPIRED'
    | 'SUSPENDED'
    | 'REVOKED';

export interface Company extends BaseEntity {
    name: string;
    ruc: string;
    address?: Address;
    contact?: ContactInfo;
    sector?: Sector;
    website?: string;
    logo?: string;
    description?: string;
    certifications?: Certificate[];
    is_active: boolean;
}

export interface ISOStandard extends BaseEntity {
    code: string;
    name: string;
    description?: string;
    version?: string;
    is_active: boolean;
    category?: string;
}

export interface Sector extends BaseEntity {
    name: string;
    code: string;
    description?: string;
    is_active: boolean;
}

export interface CertificateFormData {
    company_id?: number | string;
    company_name?: string;
    company_ruc?: string;
    tax_id?: string;
    iso_standard_id: number | string;
    issue_date: string | null;
    expiry_date: string | null;
    validity_date?: string | null;
    initial_certification_date?: string | null;
    recertification_date?: string | null;
    scope?: string;
    auditor?: string;
    notes?: string;
    address?: string;
    addresses?: string[];
    country?: string;
    city?: string;
    sector?: string;
    sector_id?: number | string;
    status?: string;
    email?: string;
    phone?: string;
    register_number?: string;
}

export interface CertificateVerification {
    certificate_number: string;
    is_valid: boolean;
    certificate?: Certificate;
    message?: string;
}

export interface CompanySearchParams {
    search?: string;
    sector?: string;
    has_certifications?: boolean;
    limit?: number;
    offset?: number;
}

export interface CertificationStats {
    total_certificates: number;
    active_certificates: number;
    expired_certificates: number;
    total_companies: number;
    by_standard: Record<string, number>;
    by_sector: Record<string, number>;
}
export interface CertificationDisplayData {
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
