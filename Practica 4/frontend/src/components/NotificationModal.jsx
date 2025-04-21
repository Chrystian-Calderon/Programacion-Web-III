import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from "react-icons/md";

const NotificationModal = ({ title, message, action, confirm, ...props }) => {
    let icon;

    const handleConfirm = () => {
        confirm(true);
    }

    if (action === 'success') {
        icon = <FaCheckCircle style={{ fontSize: '64px', color: '#28a745' }} />;
    } else {
        icon = <MdError style={{ fontSize: '64px', color: '#dc3545' }} />;
    }
    return (
        <Modal {...props} centered size='sm'>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column align-items-center gap-2">
                    {icon}
                    <span className="ms-2">{message}</span>
                </div>
            </Modal.Body>
            {action === 'delete' && (
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onHide(false)}>
                    {'Cancelar'}
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    {'Eliminar'}
                </Button>
            </Modal.Footer>
            )}
        </Modal>
    );
};

export default NotificationModal;