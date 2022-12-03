import { createContext, ReactNode, useState } from "react";
import { Order } from "../../types";

type OrderProviderProps = {
    children: ReactNode;
};

interface OrderContextType {
    orders: Order[];
    setOrders: (orders: Order[]) => void;
    ordersLoading: boolean;
    setOrdersLoading: (ordersLoading: boolean) => void;
}

export const OrderContext = createContext({} as OrderContextType);

export function OrderProvider({ children }: OrderProviderProps): JSX.Element {
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState<boolean>(true);

    return (
        <OrderContext.Provider
            value={{
                orders,
                setOrders,
                ordersLoading,
                setOrdersLoading,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
