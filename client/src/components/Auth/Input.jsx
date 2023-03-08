import React from 'react';

const Input = ({ id, type, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className='w-full mt-3 p-3 border rounded-md bg-gray-50'
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
