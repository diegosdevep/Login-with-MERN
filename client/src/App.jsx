import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import AuthLayout from './layout/AuthLayout';
import ProtectedPath from './layout/ProtectedPath';
import ConfirmarCuenta from './pages/Auth/ConfirmarCuenta';
import Login from './pages/Auth/Login';
import NuevoPassword from './pages/Auth/NuevoPassword';
import OlvidePassword from './pages/Auth/OlvidePassword';
import Registrar from './pages/Auth/Registrar';
import Projects from './pages/Projects/Projects';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='registrar' element={<Registrar />} />
            <Route path='olvide-password' element={<OlvidePassword />} />
            <Route path='olvide-password/:token' element={<NuevoPassword />} />
            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
          </Route>

          <Route path='/proyectos' element={<ProtectedPath />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
