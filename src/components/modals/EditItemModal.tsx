import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ManagementContext } from "../../context/management/ManagementContext";
import { EditItemModalProps } from "../../types";

export function EditItemModal({ item, show, onClose }: EditItemModalProps) {
    if (item === undefined) return <></>;
    const [currentItem, setCurrentItem] = useState({ ...item });
    const { categories } = useContext(ManagementContext);
    return (
        <>
            {item !== undefined && (
                <Modal show={show} centered onHide={onClose}>
                    <Modal.Header closeButton>Item bearbeiten</Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="form.input1"
                            >
                                <Form.Label>Item Titel</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentItem.name}
                                    onChange={(e) =>
                                        setCurrentItem({
                                            ...currentItem,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="form.input2"
                            >
                                <Form.Label>Preis</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={currentItem.price}
                                    onChange={(e) =>
                                        setCurrentItem({
                                            ...currentItem,
                                            price: parseFloat(e.target.value),
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="form.input3"
                            >
                                <Form.Label>Kategorie</Form.Label>
                                <Form.Select
                                    value={currentItem.category.id}
                                    onChange={(e) =>
                                        setCurrentItem({
                                            ...currentItem,
                                            category: {
                                                id: parseInt(e.target.value),
                                                categoryName:
                                                    currentItem.category
                                                        .categoryName,
                                            },
                                        })
                                    }
                                >
                                    {categories.map((category, index) => (
                                        <option key={index}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="form.input4"
                            >
                                <Form.Label>Item Beschreibung</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={currentItem.description}
                                    onChange={(e) =>
                                        setCurrentItem({
                                            ...currentItem,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => console.log(currentItem)}>
                            Bestätigen
                        </Button>
                        <Button
                            onClick={() => {
                                onClose();
                                setCurrentItem(item);
                            }}
                        >
                            Abbrechen
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
