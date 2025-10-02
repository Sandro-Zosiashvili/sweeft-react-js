"use client";

import Menu from "@/app/components/Menu/Menu";
import SearchBar from "@/app/components/Searchbar/Searchbar";

interface Props {
    children: React.ReactNode;
}

const ChildrenWrapper = ({ children }: Props) => {
    return (
        <div>
            <Menu />
            <SearchBar />
            {children}
        </div>
    );
};

export default ChildrenWrapper;
