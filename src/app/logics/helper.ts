import {UnsplashPhoto} from "./type"
import axios from "axios";

export const getPopularPhotos = async (page: number): Promise<UnsplashPhoto[]> => {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos?page=${page}&per_page=20&order_by=popular&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: UnsplashPhoto[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
};

export const search = async (query: string, page: number) => {
    const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`, {
        headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        }
    });
    return response.data;
};

