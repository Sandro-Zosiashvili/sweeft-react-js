import { useEffect, useRef } from "react";

export const useSearchHistory = (inputValue: string) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (inputValue.trim() === "") return;

        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
            if (!history.includes(inputValue)) {
                localStorage.setItem("searchHistory", JSON.stringify([...history, inputValue]));
            }
        }, 2000);

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [inputValue]);
};
