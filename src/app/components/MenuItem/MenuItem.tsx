'use client'

import styles from './Menuitem.module.scss'
import {useRouter} from 'next/navigation';
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";


type MenuitemType = {
    title: String;
    path: String;
    // key: String
}


const MenuItem = () => {
    const router = useRouter()
    const path = usePathname()
    const [active, setActive] = useState<number>(0);

    useEffect(() => {
        if ("/historyHjE" !== path) {
            setActive(0)
        }
    },[path])

    const data = [
        {
            id: 1,
            title: 'Home',
            path: '/',

        },
        {
            id: 2,
            title: 'History',
            path: './history-page',
        }

    ]
    return (
        <div className={styles.container}>

            {
                data.map((item: MenuitemType, index) => (
                    <div onClick={() => {
                        router.push(`${item.path}`)
                        setActive(index)
                    }} className={active == index ? styles.active : styles.menuItem} key={index}>
                        {item.title}
                    </div>
                ))
            }
        </div>

    )


}

export default MenuItem