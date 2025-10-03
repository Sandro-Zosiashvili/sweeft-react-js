"use client"
import styles from './SearchBar.module.scss'
import Image from 'next/image'
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useSearchHistory} from "@/app/logics/historyLogic";

const SearchBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    // Gets the search term from the URL so it persists after refresh
    const initialValue = pathname === "/" ? "" : pathname.slice(1);
    const [inputValue, setInputValue] = useState<string>(initialValue);
    useSearchHistory(inputValue);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

    };

    useEffect(() => {
        if (inputValue.trim() === "") {
            router.push("/")   // Redirects to the main page when the input is empty
        } else {
            router.push(`/${inputValue}`)  // Immediately sends the request
        }
    }, [inputValue, router])

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <div>
                    <Image src={"../icons/black-search.svg"} width="32" height="32" alt="Search-logo"/>
                </div>
                <input
                    value={inputValue}
                    onChange={onInputChange}
                    className={styles.search} type='text'
                    placeholder='Search'
                />
            </div>

        </div>
    )
}

export default SearchBar;