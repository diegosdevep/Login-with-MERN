import React from 'react';

const BotonForm = ({ type, title }) => {
  return (
    <input
      type={type}
      value={title}
      className='bg-sky-700 w-full text-sm py-2 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
    />
  );
};

export default BotonForm;
