"use client"
import styles from './Modal.module.scss'
import {PhotoPreview, PhotoStats, UnsplashPhoto} from "@/app/logics/type";
import Image from "next/image";
import {useEffect, useState} from "react";

import {getPhotoById} from '../../logics/getPhotoById'

interface ModalProps {
    photo: PhotoPreview;
    onClose: () => void;
}

const Modal = ({photo, onClose}: ModalProps) => {
    const [stats, setStats] = useState<PhotoStats | null>(null);

    useEffect(() => {
        // Scroll lock
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.classList.add('modal-open');

        return () => {
            // Scroll unlock
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.classList.remove('modal-open');
            window.scrollTo(0, scrollY);
        };
    }, []);


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsData = await getPhotoById(photo.id);
                setStats(statsData);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [photo.id]);


    return (
        <div className={styles.modalOverlay}> {/* <-- დაამატე overlay div */}

            <div className={styles.container}>
                <div className={styles.scroll}>
                    <div className={styles.header}>
                        <div className={styles.user}>
                            <img
                                src={`${photo.user.profile_image}`}
                                loading="lazy"
                                className={styles.userImg}
                                width={'32px'} height={'32px'}
                                alt={photo.user.first_name}
                            />
                            <div>
                                <div className={styles.userName}>
                                    {photo.user.first_name} {photo.user.last_name}
                                </div>
                                <div className={styles.name}>
                                    {photo.user.username}
                                </div>
                            </div>
                        </div>
                        <div onClick={onClose} className={styles.closeButton}>
                            <Image src={'../icons/close.svg'} width={30} height={30} alt={"Close"}/>
                        </div>
                    </div>

                    <div>
                        <img className={styles.img}
                             src={photo.url}
                             alt={`${photo.alt}`}
                             width={"auto"} height={"auto"}
                        />
                    </div>
                    <div className={styles.stats}>
                        <div className={styles.statsItems}>
                            <div className={styles.grayHeadline}>Views</div>
                            <div className={styles.resultStats}>{stats?.views.toLocaleString()}</div>
                        </div>
                        <div className={styles.statsItems}>
                            <div className={styles.grayHeadline}>Likes</div>
                            <div className={styles.resultStats}>{stats?.likes.toLocaleString()}</div>
                        </div>
                        <div className={styles.statsItems}>
                            <div className={styles.grayHeadline}>Downloads</div>
                            <div className={styles.resultStats}>{stats?.downloads.toLocaleString()}</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


export default Modal;



