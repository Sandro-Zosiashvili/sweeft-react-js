import styles from "./page.module.css";
import PopularImages from "@/app/components/PopularImages/PopularImages";

export default function Home() {
    return (
        <div className={styles.page}>
            <h2 className={styles.mostPopularHeader}>
                Most Popular
            </h2>
            <PopularImages/>
        </div>
    );
}
