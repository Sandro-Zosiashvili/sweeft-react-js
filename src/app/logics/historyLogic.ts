import { useEffect, useRef } from "react";

// Saves and manages search history in localStorage
export const useSearchHistory = (inputValue: string) => {
    const timer = useRef<NodeJS.Timeout | null>(null);
    const lastSavedValue = useRef<string>("");

    useEffect(() => {
        const value = inputValue.trim();
        if (value.length < 1 || value.length > 50) return; // ignore invalid input
        if (value === lastSavedValue.current) return; // skip if already saved
        if (timer.current) clearTimeout(timer.current); // reset timer

        // Save search term after 2s delay
        timer.current = setTimeout(() => {
            const currentValue = inputValue.trim();
            if (currentValue.length < 1 || currentValue.length > 50) return;

            const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
            const filteredHistory = history.filter((item: string) => item !== currentValue);
            const updated = [currentValue, ...filteredHistory].slice(0, 15);

            localStorage.setItem("searchHistory", JSON.stringify(updated));
            lastSavedValue.current = currentValue; // update last saved value
        }, 2000);

        return () => {
            if (timer.current) clearTimeout(timer.current); // clear timer on unmount
        };
    }, [inputValue]);

    // Clears all saved search history
    const clearHistory = () => {
        localStorage.setItem("searchHistory", JSON.stringify([]));
        lastSavedValue.current = "";
    };

    return { clearHistory };
};
