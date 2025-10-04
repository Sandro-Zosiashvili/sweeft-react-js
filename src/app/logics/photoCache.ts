// app/logics/usePhotoSearch.ts
import { useState, useCallback } from "react";
import { search } from "@/app/logics/helper";
import { UnsplashPhoto } from "@/app/logics/type";

const cache = new Map<string, UnsplashPhoto[]>();

export const photoCache = () => {
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);

    const loadPhotos = useCallback(async (query: string, page: number, onLoadComplete: () => void) => {
        const cacheKey = `${query}-${page}`;

        // Load from cache if available
        if (cache.has(cacheKey)) {
            console.log("Loaded from cache:", cacheKey); // ამ ლოგებს დაგიტოვებთ კონსოლში რომ მარტივად ნახოთ <3

            const cachedPhotos = cache.get(cacheKey)!;
            setPhotos(prev => page === 1 ? cachedPhotos : [...prev, ...cachedPhotos]);
            onLoadComplete();
            return;
        }

        // Fetch from API if not cached
        const data = await search(query, page);
        if (data.results) {
            console.log("Fetched from API and cached:", cacheKey); // ამ ლოგებს დაგიტოვებთ კონსოლში რომ მარტივად ნახოთ <3

            // Save to cache
            cache.set(cacheKey, data.results);

            setPhotos(prev => page === 1 ? data.results : [...prev, ...data.results]);
        }

        onLoadComplete();
    }, []);

    // Clears all loaded photos
    const clearPhotos = useCallback(() => {
        setPhotos([]);
    }, []);

    return { photos, loadPhotos, clearPhotos };
};
