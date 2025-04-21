import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormModal = ({ title, onSave, data,  ...props} ) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        realeseYear: ''
    });
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = () => {
        onSave(formData);
        props.onHide(false);
        setFormData({
            title: '',
            genre: '',
            realeseYear: ''
        });
    };
    return (
        <Modal {...props} centered>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='title'>
                        <Form.Label>Título</Form.Label>
                        <Form.Control type='text' name='title' value={formData.title} onChange={handleChange} placeholder='Título' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='genre'>
                        <Form.Label>Género</Form.Label>
                        <Form.Control type='text' name='genre' value={formData.genre} onChange={handleChange} placeholder='Género' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='realeseYear'>
                        <Form.Label>Año de lanzamiento</Form.Label>
                        <Form.Control type='number' name='realeseYear' value={formData.realeseYear} onChange={handleChange} placeholder='Año de lanzamiento' />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => props.onHide(false)}>
                    Cancelar
                </Button>
                <Button variant='primary' onClick={handleSubmit}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FormModal;