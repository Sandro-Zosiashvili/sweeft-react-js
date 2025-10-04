'use client'
import styles from './Menu.module.scss'
import {useRouter} from 'next/navigation'
import MenuItem from "@/app/components/MenuItem/MenuItem";
import Image from 'next/image'


const Menu = () => {

    const router = useRouter()


    return (
        <div className={styles.container}>

            <div onClick={() => router.push('/')} className={styles.logoWrapper}>
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/camera--v2.png" alt="camera--v2"/>
                <h1 className={styles.headername}>
                    Photofy
                </h1>
            </div>
            <MenuItem/>

        </div>

    )
}


export default Menu