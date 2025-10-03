import {UnsplashPhoto} from "./type"
import axios from "axios";

export const getPopularPhotos = async (page: number = 1): Promise<UnsplashPhoto[]> => {
    try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query: "Popular", // ძიების სიტყვა
                page,
                per_page: 20, // მხოლოდ 20 ფოტო
            },
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            },
        });

        // search/photos აბრუნებს { results: [] }
        return response.data.results as UnsplashPhoto[];
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

