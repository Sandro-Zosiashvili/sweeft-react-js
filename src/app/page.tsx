import Image from "next/image";
import styles from "./page.module.css";
import Menu from "@/app/components/Menu/Menu";
import SearchBar from "@/app/components/Searchbar/Searchbar";
import PopularImages from "@/app/components/PopularImages/PopularImages";

export default function Home() {
    return (
        <div className={styles.page}>
            <PopularImages />
        </div>
    );
}
