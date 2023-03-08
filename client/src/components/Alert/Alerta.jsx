import React from 'react';

const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'
      } bg-gradient-to-br text-center font-bold text-white rounded-xl p-3 text-sm my-10`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
