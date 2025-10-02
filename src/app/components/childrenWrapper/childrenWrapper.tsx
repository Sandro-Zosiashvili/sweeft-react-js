"use client";

import Menu from "@/app/components/Menu/Menu";
import SearchBar from "@/app/components/Searchbar/Searchbar";
import {usePathname} from "next/navigation";

interface Props {
    children: React.ReactNode;
}


const ChildrenWrapper = ({children}: Props) => {
    const hideSearch = usePathname().startsWith("/history-page");


    return (
        <div>
            <Menu/>
            {
                !hideSearch &&  <SearchBar/>
            }
            {children}
        </div>
    );
};

export default ChildrenWrapper;
