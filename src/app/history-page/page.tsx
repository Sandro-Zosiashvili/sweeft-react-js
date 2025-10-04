"use client";
import styles from './page.module.scss';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import SearchId from "@/app/[id]/page";

const HistoryPage = () => {
    const [history, setHistory] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("searchHistory");
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    return (
        <div className={styles.container}>
            <h2>Recent Searches</h2>
            {history.length === 0 && <p>No history yet</p>}
            <div className={styles.recentSsearchs}>
                {
                    history.map((word, i) => (
                        <div className={styles.searchedWord} key={i}
                             onClick={() => router.push(`/history-page/${word}`)}>
                            {word}
                        </div>

                    ))}
            </div>

        </div>
    )
}

export default HistoryPage;
