"use client";
import {useEffect, useState} from "react";
import styles from "./PopularImages.module.scss";
import {getPopularPhotos} from "@/app/logics/helper";
import {UnsplashPhoto} from "../../logics/type"

const PopularImages = () => {
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        const loadPhotos = async () => {
            const photosData = await getPopularPhotos();
            setPhotos(photosData);
        };
        loadPhotos();
    }, []);

    const onClickImg = () => {
        setActive(true);

    }

    // ფოტოებს სამ სვეტად ვანაწილებ გრიდისთვის
    const columns = [0, 1, 2].map(col =>
        photos.filter((_, i) => i % 3 === col)
    );
    return (
        <div className={styles.row}>
            {
                active &&
                <div className={styles.popup}>
                    fdcsxa
                </div>
            }
            {columns.map((col, i) => (
                <div key={i} className={styles.column}>
                    {col.map((photo) => (
                        <img
                            key={photo.id}
                            onClick={() => console.log(photo, "=>>>>>>")}
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