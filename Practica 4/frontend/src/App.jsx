import { useState, useEffect } from 'react';
import { getMovies, getMovie, create, update, remove } from './api/movies.api';
import FormModal from './components/FormModal';
import NotificationModal from './components/NotificationModal';
import TableData from './components/TableData';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [titleModal, setTitleModal] = useState('Agregar');
  const [dataNotification, setDataNotification] = useState({
    title: '',
    message: '',
    action: ''
  });
  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    realeseYear: ''
  });

  const handleSave = async (data) => {
    if (titleModal === 'Agregar') {
      const response = await create(data);
      if (!response.error) {
        setDataNotification({
          title: 'Éxito',
          message: response.message,
          action: 'success'
        });
        setShowNotification(true);
        const movies = await getMovies();
        setData(movies);
      } else {
        setDataNotification({
          title: 'Error',
          message: response.error,
          action: 'error'
        });
        setShowNotification(true);
      }
    } else {
      const { id_movie, ...movie} = data;
      const response = await update(id_movie, movie);
      if (!response.error) {
        setDataNotification({
          title: 'Éxito',
          message: response.message,
          action: 'success'
        });
        setShowNotification(true);
        const movies = await getMovies();
        setData(movies);
      } else {
        setDataNotification({
          title: 'Error',
          message: response.error,
          action: 'error'
        });
        setShowNotification(true);
      }
    }
  }

  const handleAdd = () => {
    setTitleModal('Agregar');
    setShowModal(true);
  }

  const handleEdit = (data) => {
    setTitleModal('Editar');
    setShowModal(true);
    setMovie(data);
  }

  const [idRemove, setIdRemove] = useState(null);
  const handleConfirm = (id) => {
    setDataNotification({
      title: 'Eliminar',
      message: '¿Está seguro de eliminar?',
      action: 'delete',
    });
    setIdRemove(id);
    setShowNotification(true);
  }

  const handleDelete = async (confirm) => {
    if (confirm) {
      const response = await remove(idRemove);
      if (!response.error) {
        setDataNotification({
          title: 'Éxito',
          message: response.message,
          action: 'success'
        });
        setShowNotification(true);
        const movies = await getMovies();
        setData(movies);
      } else {
        setDataNotification({
          title: 'Error',
          message: response.error,
          action: 'error'
        });
        setShowNotification(true);
      }
    }
  }

  useEffect(() => {
    (async () => {
      const movies = await getMovies();
      setData(movies);
      }
    )();
  }, []);

  return (
    <Container>
      <h1>Peliculas</h1>
      <div className='d-flex mb-2'>
        <Button onClick={handleAdd}>
          {'Agregar'}
        </Button>
      </div>
      <TableData data={data} onEdit={handleEdit} onDelete={handleConfirm} />
      <FormModal show={showModal} onHide={setShowModal} title={titleModal} onSave={handleSave} data={movie} />
      <NotificationModal show={showNotification} onHide={setShowNotification} title={dataNotification.title} message={dataNotification.message} action={dataNotification.action} confirm={handleDelete} />
    </Container>
  );
}

export default App
