"use client"
import styles from './page.module.scss'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {search} from "@/app/logics/helper";
import { UseInfiniteScroll } from '@/app/logics/infinite-scroll-logic'
import {UnsplashPhoto} from "@/app/logics/type";

const SearchId = () => {
    const params = useParams();
    const [searchData, setSearchData] = useState<UnsplashPhoto[]>([]); // ცარიელი მასივი


    const loadPhotos = async (page: number) => {
        if (!params.id) return;

        const data = await search(params.id as string, page);
        if (data.results) {
            setSearchData(prev => page === 1 ? data.results : [...prev, ...data.results]);
        }

        // მნიშვნელოვანი: ჩატვირთვის დასრულება
        scrollLogic.onLoadComplete();
    };

    const scrollLogic = UseInfiniteScroll(loadPhotos);

    useEffect(() => {
        loadPhotos(1);
    }, [params.id]);

    const columns = [0, 1, 2].map(col =>
        searchData.filter((_, i) => i % 3 === col)
    );

    console.log(searchData);

    return (
        <div className={styles.row}>
            {columns.map((col, i) => (
                <div key={i} className={styles.column}>
                    {col.map((photo, index) => (
                        <img
                            key={`${photo.id}-${i}-${index}`}
                            src={photo.urls.regular}
                            alt={photo.alt_description || "Unsplash Photo"}
                            width={'416px'}
                            height={'auto'}
                            className={styles.photo}

                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SearchId;