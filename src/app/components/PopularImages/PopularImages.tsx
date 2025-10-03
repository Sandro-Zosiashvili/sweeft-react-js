"use client";
import {useEffect, useState} from "react";
import styles from "./PopularImages.module.scss";
import {getPopularPhotos} from "@/app/logics/helper";
import {PhotoPreview, UnsplashPhoto} from "../../logics/type"
import Modal from "@/app/components/Modal/Modal";
import {UseInfiniteScroll} from "@/app/logics/infinite-scroll-logic";
import {createBalancedColumns} from "@/app/logics/balancedColumns";

const PopularImages = () => {
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [photoData, setPhotoData] = useState<PhotoPreview | null>(null);

    // const scrollLogic = UseInfiniteScroll((page: number) => {
    //     loadPhotos(page);
    // });

    const loadPhotos = async (page: number) => {
        const photosData = await getPopularPhotos(page);
        setPhotos(prev => page === 1 ? photosData : [...prev, ...photosData]);
        // scrollLogic.onLoadComplete();
    };

    useEffect(() => {
        loadPhotos(1);
    }, []);

    const onClickImg = (data: UnsplashPhoto) => {
        const preview: PhotoPreview = {
            id: data.id,
            url: data.urls.regular,
            alt: data.alt_description || null,
            user: {
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                profile_image: data.user.profile_image.large,
                username: data.user.username,
            }
        };
        setPhotoData(preview);
    }

    // const columns = [0, 2, 1].map(col =>
    //     photos.filter((_, i) => i % 3 === col)
    // );

    const columns = createBalancedColumns(photos, 3);

    return (
        <div className={styles.row}>
            {photoData && <Modal onClose={() => setPhotoData(null)} photo={photoData} />}
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

export default PopularImages;