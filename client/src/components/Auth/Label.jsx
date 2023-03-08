import React from 'react';

const Label = ({ htmlFor, title }) => {
  return (
    <label
      className='capitalize text-gray-600 block text-md font-bold'
      htmlFor={htmlFor}
    >
      {title}
    </label>
  );
};

export default Label;
