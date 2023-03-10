import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ProjectProvider } from './context/ProjectProvider';
import AuthLayout from './layout/AuthLayout';
import ProtectedPath from './layout/ProtectedPath';
import ConfirmarCuenta from './pages/Auth/ConfirmarCuenta';
import Login from './pages/Auth/Login';
import NuevoPassword from './pages/Auth/NuevoPassword';
import OlvidePassword from './pages/Auth/OlvidePassword';
import Registrar from './pages/Auth/Registrar';
import EditarProyecto from './pages/Projects/EditarProyecto';
import NewProject from './pages/Projects/NewProject';
import Project from './pages/Projects/Project';
import Projects from './pages/Projects/Projects';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route
                path='olvide-password/:token'
                element={<NuevoPassword />}
              />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/proyectos' element={<ProtectedPath />}>
              <Route index element={<Projects />} />
              <Route path='crear-proyecto' element={<NewProject />} />
              <Route path=':id' element={<Project />} />
              <Route path='editar/:id' element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
