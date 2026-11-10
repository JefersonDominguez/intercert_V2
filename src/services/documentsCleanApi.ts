import { api } from './api';

export interface Document {
    id: number;
    title: string;
    filename: string;
    type: string;
    size_bytes: number;
    url: string;
    created_at: string;
    description: string;
    uploaded_by?: number;
}

export interface ListDocumentsResponse {
    status: string;
    count: number;
    documents: Document[];
}

export interface DocumentResponse {
    status: string;
    document: Document;
}

const documentsCleanApi = {
    list: async (params?: { type?: string; limit?: number; offset?: number }) => {
        const response = await api.get<ListDocumentsResponse>('/documents/', { params });
        return response.data;
    },

    get: async (id: number) => {
        const response = await api.get<DocumentResponse>(`/documents/${id}/`);
        return response.data;
    },

    upload: async (formData: FormData) => {
        const response = await api.post<DocumentResponse>('/documents/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete<{ status: string; message: string }>(`/documents/${id}/`);
        return response.data;
    },
};

export default documentsCleanApi;
