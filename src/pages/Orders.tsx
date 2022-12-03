import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Spinner from "../components/layout/Spinner";
import OrderTable from "../components/tables/OrderTable";
import { getAllOrders } from "../context/order/OrderActions";
import { OrderContext } from "../context/order/OrderContext";

export function Orders() {
    const { setOrders, ordersLoading, setOrdersLoading } =
        useContext(OrderContext);

    useEffect(() => {
        const loadOrders = async () => {
            const response = await getAllOrders();
            setOrders(response);
            setOrdersLoading(false);
        };
        loadOrders();
    }, []);

    return (
        <>
            {ordersLoading ? (
                <Spinner />
            ) : (
                <Container>
                    <OrderTable />
                </Container>
            )}
        </>
    );
}
