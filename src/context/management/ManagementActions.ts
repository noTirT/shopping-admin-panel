import axios from "axios";
import { ArtItem, ArtItemUpload, Category } from "../../types";

const IMGBB_API_KEY = import.meta.env.VITE_REACT_APP_IMGBB_API_KEY;
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

//https://mighty-spire-02089.herokuapp.com/
const backend = axios.create({
    baseURL: BACKEND_URL,
    responseType: "json",
});

const imageApi = axios.create({
    baseURL: "https://api.imgbb.com/1/upload",
})

export const getAllCategories = async () => {
    const response = await backend.get("/category")
    return response.data;
}

export const getAllItems = async () => {
    const response = await backend.get("/art")
    return response.data;
}

export const uploadItem = async ({ name, price, imageURLs, description, categoryName }: ArtItemUpload) => {
    imageURLs = imageURLs.filter((link) => link !== "")
    await backend.post("/art", {
        name, price, imageURLs, description, categoryName
    });
}

export const getItemsAndCategories = async (): Promise<{ items: ArtItem[], categories: Category[] }> => {
    const [items, categories] = await Promise.all([
        backend.get("/art"),
        backend.get("/category"),
    ]);

    return { items: items.data, categories: categories.data };
}

export const deleteItem = async (id: number) => {
    await backend.delete(`/art/${id}`);
}

export const uploadImage = async (base64Image: string) => {
    const formData = new FormData();
    formData.set("key", IMGBB_API_KEY)
    formData.append("image", base64Image)
    const response = await imageApi.post("", formData);
    return response.data;
}