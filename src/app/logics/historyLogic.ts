import { useEffect, useRef } from "react";

// ცოტა რთულად მივუდექი მგონი ამ ისტორიის საკითხს მაგრამ
// რადგან წერის თანავე უნდა განახლებულიყო ფოტოები უკეთესი რამე ვერ მოვიფიქრე
export const useSearchHistory = (inputValue: string) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const value = inputValue.trim();

        // ძირითადი ვალიდაცია
        if (value.length < 3) return; // 3 სიმბოლო მინიმუმ (car, bus, etc)
        if (!/[aeiou]/i.test(value)) return; // მინიმუმ 1 ხმოვანი
        if (/(.)\1{2,}/.test(value)) return; // არაუმეტეს 2 იდენტური სიმბოლო
        if (/^[qwerty]+$|^[asdfgh]+$|^[zxcvbn]+$/i.test(value)) return; // კლავიატურის რიგები

        // დამთავრებული სიტყვის დეტექტორი - მხოლოდ არასრული სიტყვებისთვის
        if (isIncompleteWord(value)) return;

        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
            if (!history.includes(value)) {
                const updated = [...history, value].slice(-15);
                localStorage.setItem("searchHistory", JSON.stringify(updated));
            }
        }, 2000);

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [inputValue]);

    const isIncompleteWord = (word: string): boolean => {
        // მხოლოდ 4-5 სიმბოლოიანი სიტყვები, რომლებიც მთავრულდება ხმოვანზე
        // და არ არის ცნობილი სრული სიტყვები
        if (word.length >= 4 && word.length <= 5) {
            if (/[aeiou]$/i.test(word)) {
                // ცნობილი არასრული სიტყვების ჩამონათვალი
                const incompleteWords = ['wate', 'hom', 'ca', 'appl', 'comput', 'televis'];
                return incompleteWords.includes(word.toLowerCase());
            }
        }
        return false;
    };
};