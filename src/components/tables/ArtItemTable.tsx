import { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteItem } from "../../context/management/ManagementActions";
import { ManagementContext } from "../../context/management/ManagementContext";
import { ArtItem, TableData } from "../../types";
import { formatCurrency } from "../../utilities/formatCurrency";
import {
    sortByCategory,
    sortByNumber,
    sortByString,
} from "../../utilities/sortingAlgorithms";
import { ConfirmDeleteModal } from "../modals/ConfirmDeleteModal";
import CreateItemModal from "../modals/CreateItemModal";
import { EditItemModal } from "../modals/EditItemModal";

function ArtItemTable() {
    const { artItems } = useContext(ManagementContext);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [creatingItem, setCreatingItem] = useState<boolean>(false);
    const [editDetails, setEditDetails] = useState({
        editing: false,
        itemId: -1,
    });
    const [orderReversed, setOrderReversed] = useState<boolean>(false);

    const [tableData, setTableData] = useState<TableData<ArtItem>[]>(() =>
        artItems.map((item) => {
            return {
                data: { ...item },
                checked: false,
            };
        })
    );

    const allSelected = tableData.every((item) => item.checked);

    const handleAllSelect = () => {
        setTableData(
            tableData.map((entry) => {
                return { data: { ...entry.data }, checked: !allSelected };
            })
        );
    };

    const deleteSelection = async () => {
        setIsDeleting(true);
        for (let tableItem of tableData) {
            if (tableItem.checked) {
                await deleteItem(Number(tableItem.data.id));
            }
        }
        setTableData(tableData.filter((tableEntry) => !tableEntry.checked));
        setIsDeleting(false);
    };

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

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="justify-content-center justify-center text-center">
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
                                    sortByString(data, orderReversed, "name")
                                );
                                setOrderReversed(!orderReversed);
                            }}
                        >
                            Name
                        </th>
                        <th
                            className="text-center"
                            onClick={() => {
                                setTableData((data) =>
                                    sortByNumber(data, orderReversed, "price")
                                );
                                setOrderReversed(!orderReversed);
                            }}
                        >
                            Preis
                        </th>
                        <th
                            className="text-center"
                            onClick={() => {
                                setTableData((data) =>
                                    sortByCategory(data, orderReversed)
                                );
                                setOrderReversed(!orderReversed);
                            }}
                        >
                            Categorie(n)
                        </th>
                        <th className="text-center">Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((tableItem, index) => (
                        <tr key={index}>
                            <td className="text-center justify-center justify-content-center">
                                <input
                                    type="checkbox"
                                    checked={tableItem.checked}
                                    onChange={() =>
                                        selectItem(tableItem.data.id)
                                    }
                                />
                            </td>
                            <td onClick={() => selectItem(tableItem.data.id)}>
                                {tableItem.data.id}
                            </td>
                            <td onClick={() => selectItem(tableItem.data.id)}>
                                {tableItem.data.name}
                            </td>
                            <td onClick={() => selectItem(tableItem.data.id)}>
                                {formatCurrency(tableItem.data.price)}
                            </td>
                            <td onClick={() => selectItem(tableItem.data.id)}>
                                {tableItem.data.category.reduce(
                                    (subString, item) =>
                                        subString !== ""
                                            ? [
                                                  subString,
                                                  item.categoryName,
                                              ].join(", ")
                                            : item.categoryName,
                                    ""
                                )}
                            </td>
                            <td className="text-center">
                                <Button
                                    className="me-3"
                                    variant="danger"
                                    disabled={isDeleting}
                                    onClick={() => {
                                        setTableData(
                                            tableData.map((entry) => {
                                                return {
                                                    ...entry,
                                                    checked:
                                                        entry.data.id ===
                                                        tableItem.data.id,
                                                };
                                            })
                                        );
                                        setIsDeleting(true);
                                    }}
                                >
                                    <i className="fa fa-trash" />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setEditDetails({
                                            editing: true,
                                            itemId: tableItem.data.id,
                                        });
                                    }}
                                >
                                    <i className="fa fa-edit"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{ display: "flex", gap: "10px" }}>
                <Button
                    variant="danger"
                    disabled={
                        isDeleting || tableData.every((item) => !item.checked)
                    }
                    onClick={() => setIsDeleting(true)}
                >
                    Auswahl löschen
                </Button>
                <Button
                    variant="primary"
                    disabled={isDeleting}
                    onClick={() => setCreatingItem(true)}
                >
                    Neues Item
                </Button>
            </div>
            <ConfirmDeleteModal
                show={isDeleting}
                onCancel={() => setIsDeleting(false)}
                onConfirm={() => {
                    deleteSelection();
                    setIsDeleting(false);
                }}
            />
            <CreateItemModal show={creatingItem} setShow={setCreatingItem} />
            <EditItemModal
                show={editDetails.editing}
                item={artItems.find((value) => value.id === editDetails.itemId)}
                onClose={() => {
                    setEditDetails({
                        editing: false,
                        itemId: -1,
                    });
                }}
            />
        </>
    );
}

export default ArtItemTable;
