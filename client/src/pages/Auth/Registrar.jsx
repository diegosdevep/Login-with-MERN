import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../../components/Alert/Alerta';
import BotonForm from '../../components/Auth/BotonForm';
import Input from '../../components/Auth/Input';
import Label from '../../components/Auth/Label';
import clienteAxios from '../../config/clienteAxios';

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los password deben ser iguales',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe tener minimo 6 caracteres',
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear el usuario en la API

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className='text-sky-500 font-black text-3xl capitalize text-center'>
        Crea tu cuenta y administra tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className='my-10 bg-white shadow rounded-lg p-10 py-5'
        onSubmit={handleSubmit}
      >
        <div className='my-5'>
          <Label title='Tu Nombre' htmlFor='nombre' />
          <Input
            id='nombre'
            type='text'
            placeholder='Diego'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <Label title='Email' htmlFor='email' />
          <Input
            id='email'
            type='email'
            placeholder='correo@correo.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <Label title='Password' htmlFor='password' />
          <Input
            id='password'
            type='password'
            placeholder='******'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <Label title='Repetir Password' htmlFor='password2' />
          <Input
            id='password2'
            type='password'
            placeholder='******'
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>
        <BotonForm title='Crear Cuenta' type='submit' />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link to='/' className='block text-center my-5 text-slate-500 text-sm'>
          ¿Ya tienes una cuenta? Inicia Sesion
        </Link>
        <Link
          to='/olvide-password'
          className='block text-center my-5 text-slate-500 text-sm'
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
