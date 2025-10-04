import {UnsplashPhoto} from "./type"
import axios from "axios";

export const getPopularPhotos = async (page: number = 1): Promise<UnsplashPhoto[]> => {
    try {
        const response = await axios.get(`https://api.unsplash.com/photos`, {
            params: {
                page,
                per_page: 20,
                order_by: "popular",
            },
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            },
        });

        return response.data as UnsplashPhoto[];
    } catch (error) {
        console.error("Error fetching popular photos:", error);
        throw error;
    }
};

export const search = async (query: string, page: number) => {
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`, {
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            }
        });

        return {results: response.data.results};
    } catch (err) {
        return {results: [], error: "Failed to fetch photos"};
    }
};

