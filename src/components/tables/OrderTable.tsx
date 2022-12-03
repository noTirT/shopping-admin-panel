import { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { MdClose, MdDone } from "react-icons/md";
import { OrderContext } from "../../context/order/OrderContext";
import { Order, TableData } from "../../types";
import { formatCurrency } from "../../utilities/formatCurrency";
import {
    sortByBoolean,
    sortByNumber,
    sortByString,
} from "../../utilities/sortingAlgorithms";

function OrderTable() {
    const { orders } = useContext(OrderContext);

    const [orderReversed, setOrderReversed] = useState<boolean>(false);
    const [tableData, setTableData] = useState<TableData<Order>[]>(() =>
        orders.map((order) => {
            return {
                data: { ...order },
                checked: false,
            };
        })
    );

    const allSelected = tableData.every((item) => item.checked);

    const selectItem = (itemId: number) => {
        setTableData(
            tableData.map((item) => {
                return {
                    ...item,
                    checked:
                        item.data.id === itemId ? !item.checked : item.checked,
                };
            })
        );
    };

    const formatDate = (rawDate: number) => {
        const date: Date = new Date(rawDate);
        const dateString = `${
            date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        }.${
            date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1
        }.${date.getFullYear()}`;
        return dateString;
    };

    const handleAllSelect = () => {
        setTableData(
            tableData.map((entry) => {
                return { data: { ...entry.data }, checked: !allSelected };
            })
        );
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="justify-content-center justify-center">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={handleAllSelect}
                            />
                        </th>
                        <th
                            className="text-center"
                            onClick={() => {
                                setTableData((data) =>
                                    sortByNumber(data, orderReversed, "id")
                                );
                                setOrderReversed(!orderReversed);
                            }}
                        >
                            ID
                        </th>
                        <th
                            className="text-center"
                            onClick={() => {
                                setTableData((data) =>
                                    sortByString(
                                        data,
                                        orderReversed,
                                        "customerEmail"
                                    )
                                );
                                setOrderReversed(!orderReversed);
                            }}
                        >
                            Email Kunde
                        </th>
                        <th
                            className="text-center"
                            onClick={() => {
                                setTableData((data) =>
                                    sortByNumber(
                                        data,
                                        orderReversed,
                                        "dateOrderedAt"
                                    )
                                );
                                setOrderReversed(!orderReversed);
                            }}
                        >
                            Bestelldatum
                        </th>
                        <th
                            className="text-center"
                            onClick={() => {
                                setTableData((data) =>
                                    sortByNumber(data, orderReversed, "total")
                                );
                                setOrderReversed(!orderReversed);
                            }}
                        >
                            Gesamtpreis
                        </th>
                        <th
                            className="text-center"
                            onClick={() => {
                                setTableData((data) =>
                                    sortByBoolean(
                                        data,
                                        orderReversed,
                                        "completed"
                                    )
                                );
                                setOrderReversed(!orderReversed);
                            }}
                        >
                            Bestellstatus
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((tableItem, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={tableItem.checked}
                                    onChange={() =>
                                        selectItem(tableItem.data.id)
                                    }
                                />
                            </td>
                            <td>{tableItem.data.id}</td>
                            <td>{tableItem.data.customerEmail}</td>
                            <td>{formatDate(tableItem.data.dateOrderedAt)}</td>
                            <td>{formatCurrency(tableItem.data.total)}</td>
                            <td
                                className="text-center"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    setTableData(
                                        tableData.map((item) => {
                                            return {
                                                data: {
                                                    ...item.data,
                                                    completed:
                                                        item.data.id ===
                                                        tableItem.data.id
                                                            ? !item.data
                                                                  .completed
                                                            : item.data
                                                                  .completed,
                                                },
                                                checked: item.checked,
                                            };
                                        })
                                    )
                                }
                            >
                                {tableItem.data.completed ? (
                                    <MdDone size="2rem" color="green" />
                                ) : (
                                    <MdClose size="2rem" color="red" />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default OrderTable;
