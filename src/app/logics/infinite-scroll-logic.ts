import {useEffect, useState} from "react";

export const UseInfiniteScroll = (loadMore: (page: number) => void) => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            // Do nothing if content is already loading
            if (isLoading) return;

            // Trigger loading when near the bottom (500px before)
            const nearBottom = window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 500;

            if (nearBottom) {
                setIsLoading(true);
                const nextPage = page + 1;
                setPage(nextPage);
                // Load more photos
                loadMore(nextPage);
            }
        };

        // Check scroll position every 100ms
        const throttledCheck = () => {
            setTimeout(checkScroll, 100);
        };

        window.addEventListener('scroll', throttledCheck);
        return () => window.removeEventListener('scroll', throttledCheck);
    }, [page, loadMore, isLoading]);

    // Called when photo loading is finished
    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return {page, isLoading: isLoading, onLoadComplete: handleLoadComplete};
};
