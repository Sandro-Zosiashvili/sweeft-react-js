// app/logics/usePhotoSearch.ts
import { useState, useCallback } from "react";
import { search } from "@/app/logics/helper";
import { UnsplashPhoto } from "@/app/logics/type";

const cache = new Map<string, UnsplashPhoto[]>();

export const usePhotoSearch = () => {
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);

    const loadPhotos = useCallback(async (query: string, page: number, onLoadComplete: () => void) => {
        const cacheKey = `${query}-${page}`;

        // ქეშიდან წამოღება
        if (cache.has(cacheKey)) {
            console.log("ქეშიდან მოდიიიის", cacheKey);

            const cachedPhotos = cache.get(cacheKey)!;
            setPhotos(prev => page === 1 ? cachedPhotos : [...prev, ...cachedPhotos]);
            onLoadComplete();
            return;
        }

        // API-დან წამოღება
        const data = await search(query, page);
        if (data.results) {
            console.log("API-დან წამოიღო და ჩაიწერა ქეშშიიიიი", cacheKey);

            // ქეშში შენახვა
            cache.set(cacheKey, data.results);

            setPhotos(prev => page === 1 ? data.results : [...prev, ...data.results]);
        }

        onLoadComplete();
    }, []);

    const clearPhotos = useCallback(() => {
        setPhotos([]);
    }, []);

    return { photos, loadPhotos, clearPhotos };
};