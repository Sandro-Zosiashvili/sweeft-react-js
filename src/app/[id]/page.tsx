"use client"
import styles from './page.module.scss';
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {usePhotoSearch} from "../logics/photoCashe";
import {UseInfiniteScroll} from '@/app/logics/infinite-scroll-logic';
import {PhotoPreview, UnsplashPhoto} from "@/app/logics/type";
import Modal from "@/app/components/Modal/Modal";
import SearchBar from "@/app/components/Searchbar/Searchbar";

const SearchId = () => {
    const params = useParams();
    const {photos, loadPhotos, clearPhotos} = usePhotoSearch();
    const [photoData, setPhotoData] = useState<PhotoPreview | null>(null);


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

    );
};

export default SearchId;