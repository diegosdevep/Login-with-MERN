import React from 'react';
import FormProject from '../../components/FormProject';

const NewProject = () => {
  return (
    <div>
      <h1 className='text-2xl font-black text-center'>Nuevo Proyecto</h1>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
    </div>
  );
};

export default NewProject;
