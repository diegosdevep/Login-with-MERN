import React from 'react';
import PreviewProject from '../../components/PreviewProject';
import useProject from '../../hooks/useProject';

const Projects = () => {
  const { proyectos } = useProject();

  return (
    <>
      <h1 className='text-2xl font-black'>Projects</h1>

      <div className='bg-white shadow mt-10 rounded-lg '>
        {proyectos ? (
          proyectos.map((proyecto) => (
            <PreviewProject key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className='text-center text-gray-600 uppercase p-5'>
            No hay Proyectos
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
