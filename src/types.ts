export enum SortingField {
    ID,
    NAME,
    PRICE,
    CATEGORY,
}

export type ArtItemUpload = {
    name: string;
    price: number;
    imageURLs: string[];
    description: string;
    categoryName: string;
}

export type ArtItem = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: Category[];
    imagelinks: ImageLink[];
}

export type ArtItemSimplified = {
    id: number;
    name: string;
    price: string;
    description: string;
    category: string;
}

export type ImageLink = {
    id: number,
    link: string,
}

export type Category = {
    id: number,
    categoryName: string,
}

export type EditItemModalProps = {
    item: any | undefined;
    show: boolean;
    onClose: () => void;
};

export type ConfirmDeleteModalProps = {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export type TableData<T> = {
    data: T,
    checked: boolean,
}

export type Order = {
    id: number,
    customerEmail: string,
    completed: boolean,
    dateOrderedAt: number,
    total: number,
    orderItems: OrderItem[],
}

export type OrderSimplified = {
    id: number,
    customerEmail: string,
    completed: boolean,
    dateOrderedAt: string,
    total: string,
    orderItems: string
}

export type OrderItem = {
    id: number,
    artPieceResponse: ArtItem,
    amount: number,
}

export type ManagementTableFooterProps<T> = {
    isDeleting: boolean;
    editingItem: boolean;
    setEditingItem: (editingItem: boolean) => void;
    setIsDeleting: (isDeleting: boolean) => void;
    tableData: TableData<T>[];
    editItemId: number;
    setEditItemId: (editItemId: number) => void;
    deleteSelection: () => void;
}