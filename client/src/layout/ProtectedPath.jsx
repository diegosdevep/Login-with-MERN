import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';

const ProtectedPath = () => {
  const { auth, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <div className='bg-gray-100'>
      {auth._id ? (
        <div>
          <Header />
          <div className='md:flex md:min-h-screen'>
            <Sidebar />

            <main className='flex-1 py-4 px-10'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  );
};

export default ProtectedPath;
