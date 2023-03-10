import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <h2 className='text-3xl text-sky-600 font-black text-center'>
          Project Lab
        </h2>
        <input
          type='text'
          placeholder='Buscar Proyecto'
          className='block p-2 border rounded-lg lg:w-96 '
        />

        <div className='flex items-center gap-4'>
          <Link to='/proyectos' className='font-bold uppercase'>
            Proyectos
          </Link>
          <button className='text-white text-xs bg-sky-600 hover:bg-sky-800 py-2 px-3 rounded-md  capitalize font-bold'>
            Cerrar Sesion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
