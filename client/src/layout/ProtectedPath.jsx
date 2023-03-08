import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedPath = () => {
  const { auth, loading } = useAuth();

  if (loading) return 'Cargando....';

  return <div>{auth._id ? <Outlet /> : <Navigate to='/' />}</div>;
};

export default ProtectedPath;