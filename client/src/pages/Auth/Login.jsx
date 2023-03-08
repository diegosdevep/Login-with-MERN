import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../../components/Alert/Alerta';
import BotonForm from '../../components/Auth/BotonForm';
import Input from '../../components/Auth/Input';
import Label from '../../components/Auth/Label';
import clienteAxios from '../../config/clienteAxios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', {
        email,
        password,
      });

      setAlerta({});
      localStorage.setItem('token', data.token);
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
        Inicia sesion y administra tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className='my-10 bg-white shadow rounded-lg p-10 py-5'
        onSubmit={handleSubmit}
      >
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
        <BotonForm title='Iniciar Sesion' type='submit' />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/registrar'
          className='block text-center my-5 text-slate-500 text-sm'
        >
          ¿No tienes una cuenta? Registrate
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

export default Login;
