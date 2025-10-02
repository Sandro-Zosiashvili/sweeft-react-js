export interface UnsplashPhoto {
    id: string;
    urls: { regular: string };
    alt_description: string | null;
    user: {
        first_name: string;
        last_name: string;
        profile_image: { large: string };
        username: string
    }
}

export interface PhotoPreview {
    id: string;
    url: string;
    alt: string | null;
    user: {
        first_name: string;
        last_name: string;
        profile_image: string;
        username: string
    }
}

export interface PhotoStats {
    likes: string;
    downloads: string;
    views: string;

}