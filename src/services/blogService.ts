

const API_URL = '/api/blog/';

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content?: string;
    image: string | null;
    created_at: string;
    published_at: string | null;
    is_published: boolean;
    category: string;
    tags?: string;
    author_name?: string;
    gallery_image_1?: string | null;
    gallery_image_2?: string | null;
}

export const blogService = {
    getAll: async (): Promise<BlogPost[]> => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error fetching blogs');
        const data = await response.json();
        return Array.isArray(data) ? data : (data.results || []);
    },

    getBySlug: async (slug: string): Promise<BlogPost> => {
        const response = await fetch(`${API_URL}${slug}/`);
        if (!response.ok) throw new Error('Error fetching blog post');
        return response.json();
    },

    create: async (data: FormData): Promise<BlogPost> => {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: data, // FormData maneja automáticamente el Content-Type multipart/form-data
            // No establecemos Content-Type header manualmente para permitir boundary
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error creating blog post');
        }
        return response.json();
    },

    update: async (slug: string, data: FormData): Promise<BlogPost> => {
        const response = await fetch(`${API_URL}${slug}/`, {
            method: 'PUT', // O PATCH según preferencia
            body: data,
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error updating blog post');
        }
        return response.json();
    },

    delete: async (slug: string): Promise<void> => {
        const response = await fetch(`${API_URL}${slug}/`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error deleting blog post');
    }
};
