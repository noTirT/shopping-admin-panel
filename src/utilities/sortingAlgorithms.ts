import { ArtItem, Order, TableData } from "../types";

export function sortByNumber(data: TableData<any>[], reversed: boolean, key: string) {
    const dataToSort = [...data]
    if (dataToSort.some((data) => Number.isNaN(Number(data.data[key]))))
        throw new Error("Trying to sort non-number with number-method");

    dataToSort.sort((a, b) => {
        if (a.data[key] > b.data[key])
            return reversed ? 1 : -1;
        if (b.data[key] > a.data[key])
            return reversed ? -1 : 1
        return 0
    })
    return dataToSort;
}

export function sortByString(data: TableData<any>[], reversed: boolean, key: string) {
    const dataToSort = [...data]

    dataToSort.sort((a, b) => {
        const compare = ("" + a.data[key]).localeCompare(
            b.data[key] + ""
        );
        return reversed ? compare : -1 * compare;
    })
    return dataToSort
}

export function sortByBoolean(data: TableData<any>[], reversed: boolean, key: string) {
    const dataToSort = [...data]

    dataToSort.sort((a, b) => {
        if (reversed)
            return (a.data[key] === b.data[key]) ? 0 : a.data[key] ? 1 : -1
        else
            return (a.data[key] === b.data[key]) ? 0 : a.data[key] ? -1 : 1
    })
    return dataToSort
}

export function sortByCategory(data: TableData<ArtItem>[], reversed: boolean) {
    const dataToSort = [...data];
    dataToSort.sort((a, b) => {
        const compare = ("" + a.data.category[0].categoryName).localeCompare(
            b.data.category[0].categoryName
        );
        return reversed ? compare : -1 * compare;
    });
    return dataToSort;
}
