import axios from "axios";
import { Order } from "../../types";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

//https://mighty-spire-02089.herokuapp.com/
const backend = axios.create({
    baseURL: BACKEND_URL,
    responseType: "json",
});

export const getAllOrders = async (): Promise<Order[]> => {
    const response = await backend.get("/order")
    return response.data;
}

export const placeOrder = async (order:
    {
        customerEmail: string,
        orderedAtTimestamp: number,
        orderItems:
        {
            amount: number,
            itemID: number
        }[]
    }) => {
    await backend.post("/order", order);
}