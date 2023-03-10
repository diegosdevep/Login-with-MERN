import React, { useEffect, useState } from 'react';
import Label from './Auth/Label';
import Input from './Auth/Input';
import BotonForm from './Auth/BotonForm';
import useProject from '../hooks/useProject';
import Alerta from './Alert/Alerta';
import { useParams } from 'react-router-dom';

const FormProject = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [description, setDescription] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');
  const params = useParams();

  const { setAlerta, alerta, submitProject, proyecto } = useProject();

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescription(proyecto.description);
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0] || '');
      setCliente(proyecto.cliente);
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, description, fechaEntrega, cliente].includes('')) {
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);

      return;
    }
    await submitProject({ id, nombre, description, fechaEntrega, cliente });
    setId(null);
    setNombre('');
    setDescription('');
    setFechaEntrega('');
    setCliente('');
  };

  const { msg } = alerta;

  return (
    <form
      className='bg-white py-7 px-5 rounded-lg w-full md:w-4/5 shadow'
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className='mb-4'>
        <Label htmlFor='nombre' title='Nombre del Proyecto' />
        <Input
          type='text'
          id='nombre'
          placeholder='Nombre del Proyecto'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='description' title='Descripcion del Proyecto' />
        <textarea
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50 text-sm'
          id='description'
          placeholder='Descripcion del Proyecto'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='fecha-entrega' title='Fecha de Entrega' />
        <Input
          type='date'
          id='fecha-entrega'
          placeholder='Fecha de Entrega'
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='cliente' title='Nombre del Cliente' />
        <Input
          type='text'
          id='cliente'
          placeholder='Nombre del Cliente'
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <BotonForm
        type='submit'
        title={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
      />
    </form>
  );
};

export default FormProject;
