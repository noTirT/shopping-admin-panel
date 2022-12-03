import { useContext, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ManagementContext } from "../../context/management/ManagementContext";
import { ArtItemUpload, Category } from "../../types";
import {
    uploadImage,
    uploadItem,
} from "../../context/management/ManagementActions";
import CurrencyInput from "react-currency-input-field";

function initialArtItemState(categorieList: Category[]) {
    return {
        name: "",
        price: 0,
        imageURLs: [""],
        description: "",
        categoryName:
            categorieList.length > 0
                ? categorieList[0].categoryName
                : "Default",
    };
}

function CreateItemModal({
    show,
    setShow,
}: {
    show: boolean;
    setShow: (show: boolean) => void;
}) {
    const { categories } = useContext(ManagementContext);
    const [readerResults, setReaderResults] = useState([""]);
    const [isUploading, setIsUploading] = useState(false);

    const [artItem, setArtItem] = useState<ArtItemUpload>({
        ...initialArtItemState(categories),
    });

    const [categoriesList, setCategoriesList] = useState<Category[]>(() => {
        return categories.length > 0
            ? [...categories]
            : [{ id: 0, categoryName: "Default" }];
    });

    function handleChange(event: any) {
        for (let file of event.target.files) {
            let reader = new FileReader();
            reader.onload = function () {
                if (reader.result != null && reader.result != undefined) {
                    let tempReaderResults = readerResults;
                    let base64Imagedata = reader.result
                        .toString()
                        .split(",")
                        .pop();
                    if (base64Imagedata != undefined) {
                        tempReaderResults.push(base64Imagedata);
                        setReaderResults(tempReaderResults);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }

    async function uploadAllImages() {
        for (let base64data of readerResults) {
            if (base64data !== "" && base64data !== undefined) {
                setIsUploading(true);
                const response = await uploadImage(base64data);
                setArtItem((item) => ({
                    ...item,
                    imageURLs: [...item.imageURLs, response.data.url],
                }));
                setIsUploading(false);
                /*await uploadImage(base64data).then((res: any) => {
                    let tempImageUrls = artItem.imageURLs;
                    tempImageUrls.push(res.data.url);
                    setArtItem((item: any) => ({
                        ...item,
                        imageURLs: tempImageUrls,
                    }));
                    setIsUploading(false);
                });*/
            }
        }
    }

    async function uploadNewItems() {
        await uploadItem({ ...artItem });
    }

    async function handleSubmit() {
        await uploadAllImages();
        await uploadNewItems();
        setArtItem({
            ...initialArtItemState(categories),
        });
        setShow(false);
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header>
                <Modal.Title>Neues Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <fieldset disabled={isUploading}>
                        <Row>
                            <Col lg={6}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formName"
                                >
                                    <Form.Label>Name des Items</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Namen eingeben"
                                        value={artItem.name}
                                        onChange={(e) =>
                                            setArtItem((item) => ({
                                                ...item,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className="mb-1"
                                    controlId="formPrice"
                                >
                                    <Form.Label>Preis</Form.Label>
                                    <CurrencyInput
                                        suffix={"€"}
                                        allowNegativeValue={false}
                                        onValueChange={(value) =>
                                            setArtItem((item) => ({
                                                ...item,
                                                price: Number(value),
                                            }))
                                        }
                                        step={10}
                                        decimalSeparator=","
                                        groupSeparator="."
                                        value={artItem.price}
                                        style={{
                                            border: "1px solid #ced4da",
                                            borderRadius: "0.25rem",
                                            width: "100%",
                                            fontSize: "1rem",
                                            lineHeight: "1.5",
                                            display: "block",
                                            padding: ".375rem 0.75rem",
                                            appearance: "none",
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formCategory"
                                >
                                    <Form.Label>Kategorie</Form.Label>
                                    <Form.Select
                                        value={artItem.categoryName}
                                        onChange={(e) =>
                                            setArtItem((item) => ({
                                                ...item,
                                                categoryName: e.target.value,
                                            }))
                                        }
                                    >
                                        {categoriesList.map(
                                            (category, index) => (
                                                <option key={index}>
                                                    {category.categoryName}
                                                </option>
                                            )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formFiles" className="mb-3">
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e: any) => handleChange(e)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formDescription"
                        >
                            <Form.Label>Beschreibung des Items</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={artItem.description}
                                onChange={(e) =>
                                    setArtItem((item) => ({
                                        ...item,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Button
                                        className="mb-3"
                                        variant="primary"
                                        onClick={async () => {
                                            await handleSubmit();
                                        }}
                                    >
                                        Abschicken
                                    </Button>
                                    <Button
                                        className="mb-3 ms-3"
                                        variant="danger"
                                        onClick={() => {
                                            setArtItem({
                                                ...initialArtItemState(
                                                    categories
                                                ),
                                            });
                                            setShow(false);
                                        }}
                                    >
                                        Abbrechen
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </fieldset>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CreateItemModal;
