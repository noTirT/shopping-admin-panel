import { Button, Modal } from "react-bootstrap";
import { ConfirmDeleteModalProps } from "../../types";

export function ConfirmDeleteModal({
    show,
    onConfirm,
    onCancel,
}: ConfirmDeleteModalProps) {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Bestätigung</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Wollen sie wirklich alle ausgewählten Items löschen?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        onConfirm();
                    }}
                >
                    Bestätigen
                </Button>
                <Button
                    onClick={() => {
                        onCancel();
                    }}
                >
                    Abbrechen
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
