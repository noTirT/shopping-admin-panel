import { createContext, useState } from "react";
import { ArtItem, Category } from "../../types";

type ManagementProviderProps = {
    children: React.ReactNode;
};

type ItemsAndCategories = {
    items: ArtItem[];
    categories: Category[];
};

interface ManagementContextType {
    categories: Category[];
    artItems: ArtItem[];
    loading: boolean;
    setCategories: (categories: Category[]) => void;
    setArtItems: (items: ArtItem[]) => void;
    setItemsAndCategories: ({ items, categories }: ItemsAndCategories) => void;
}

export const ManagementContext = createContext({} as ManagementContextType);

export function ManagementProvider({
    children,
}: ManagementProviderProps): JSX.Element {
    const [artItems, setArtItems] = useState<ArtItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const setItemsAndCategories = ({
        items,
        categories,
    }: ItemsAndCategories) => {
        setArtItems(items);
        setCategories(categories);
        setLoading(false);
    };

    return (
        <ManagementContext.Provider
            value={{
                categories,
                artItems,
                loading,
                setArtItems,
                setCategories,
                setItemsAndCategories,
            }}
        >
            {children}
        </ManagementContext.Provider>
    );
}
