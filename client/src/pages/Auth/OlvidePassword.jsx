import { Link } from 'react-router-dom';
import BotonForm from '../../components/Auth/BotonForm';
import Input from '../../components/Auth/Input';
import Label from '../../components/Auth/Label';
import { useState } from 'react';
import Alerta from '../../components/Alert/Alerta';
import clienteAxios from '../../config/clienteAxios';

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });
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
        Recupera tu acceso y no pierdas tus{' '}
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

        <BotonForm title='Enviar Instrucciones' type='submit' />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link to='/' className='block text-center my-5 text-slate-500 text-sm'>
          ¿Ya tienes una cuenta? Inicia Sesion
        </Link>
        <Link
          to='/registrar'
          className='block text-center my-5 text-slate-500 text-sm'
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
