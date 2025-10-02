import {useEffect, useState} from "react";



export const UseInfiniteScroll = (loadMore: (page: number) => void) => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            // თუ უკვე იტვირთება, არაფერს ვაკეთებ
            if (isLoading) return;

            // ბოლოდან 500px-ით ადრე ვამოწმებ რომ მოვფეჩო
            const nearBottom = window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 500;

            if (nearBottom) {
                setIsLoading(true);
                const nextPage = page + 1;
                setPage(nextPage);
                // ფოტოების ჩატვირთვა
                loadMore(nextPage);
            }
        };
        // ყოველ 100ms-ში ერთხელ ვამოწმებ
        const throttledCheck = () => {
            setTimeout(checkScroll, 100);
        };

        window.addEventListener('scroll', throttledCheck);
        return () => window.removeEventListener('scroll', throttledCheck);
    }, [page, loadMore, isLoading]);

    // ფოტოების ჩატვირთვის დასრულების შემდეგ
    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return {page, isLoading: isLoading, onLoadComplete: handleLoadComplete};
};