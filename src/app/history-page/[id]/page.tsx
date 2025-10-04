"use client"
import styles from './page.module.scss';
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {photoCache} from "../../logics/photoCache";
import {UseInfiniteScroll} from '@/app/logics/infinite-scroll-logic';
import {PhotoPreview, UnsplashPhoto} from "@/app/logics/type";
import Modal from "@/app/components/Modal/Modal";
import SearchBar from "@/app/components/Searchbar/Searchbar";

const historyPage = () => {
    const params = useParams();
    const {photos, loadPhotos, clearPhotos} = photoCache();
    const [photoData, setPhotoData] = useState<PhotoPreview | null>(null);

    const [history, setHistory] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("searchHistory");
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);


    const scrollLogic = UseInfiniteScroll((page: number) => {
        if (!params.id) return;
        const query = Array.isArray(params.id) ? params.id[0] : params.id;
        loadPhotos(query, page, () => scrollLogic.onLoadComplete());
    });

    useEffect(() => {
        clearPhotos();
        if (params.id) {
            const query = Array.isArray(params.id) ? params.id[0] : params.id;
            loadPhotos(query, 1, () => scrollLogic.onLoadComplete());
        }
    }, [params.id]);

    const onClickImg = (photo: UnsplashPhoto) => {
        setPhotoData({
            id: photo.id,
            url: photo.urls.regular,
            alt: photo.alt_description || null,
            user: {
                first_name: photo.user.first_name,
                last_name: photo.user.last_name,
                profile_image: photo.user.profile_image.large,
                username: photo.user.username,
            }
        });
    };

    // 3-Column Layout
    const columns = [0, 1, 2].map(col =>
        photos.filter((_, index) => index % 3 === col)
    );

    return (
        <>
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
            <div className={styles.row}>
                {photoData && <Modal onClose={() => setPhotoData(null)} photo={photoData}/>}
                {columns.map((col, i) => (
                    <div key={i} className={styles.column}>
                        {col.map((photo, index) => (
                            <img
                                key={`${photo.id}-${i}-${index}`}
                                onClick={() => onClickImg(photo)}
                                src={photo.urls.regular}
                                alt={photo.alt_description || "Unsplash Photo"}
                                width={'416'}
                                height={'auto'}
                                className={styles.photo}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>


    );
};

export default historyPage;