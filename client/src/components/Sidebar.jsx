import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className='md:w-80 lg:w-80 px-5 pt-10'>
      <p className='text-cl font-bold'>Hola: {auth.nombre}</p>

      <Link
        to='crear-proyecto'
        className='bg-sky-600 hover:bg-sky-800 w-full p-2 text-white uppercase font-bold block mt-5 text-center rounded-lg text-xs'
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
