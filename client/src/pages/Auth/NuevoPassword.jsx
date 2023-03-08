import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BotonForm from '../../components/Auth/BotonForm';
import Input from '../../components/Auth/Input';
import Label from '../../components/Auth/Label';
import Alerta from '../../components/Alert/Alerta';
import clienteAxios from '../../config/clienteAxios';

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    return () => {
      comprobarToken();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe tener la menos 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
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
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className='my-10 bg-white shadow rounded-lg p-10 py-5'
          onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <Label title='Nuevo Password' htmlFor='password' />
            <Input
              id='password'
              type='password'
              placeholder='Escribe tu nuevo password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <BotonForm title='Guardar nuevo password' type='submit' />
        </form>
      )}
      {passwordModificado && (
        <Link to='/' className='block text-center my-5 text-slate-500 text-sm'>
          Inicia Sesion
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
