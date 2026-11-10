export interface BlogPostContent {
    intro: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    quote: string;
}

export interface BlogPost {
    id: number;
    title: string;
    category: string;
    date: string;
    readTime: string;
    comments: number;
    author: string;
    image: string;
    hero: string;
    gallery: string[];
    excerpt: string;
    tags: string[];
    content: BlogPostContent;
}
