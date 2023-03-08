import express from 'express';
const router = express.Router();
import {
  autenticar,
  comprobarToken,
  confirmar,
  nuevoPassword,
  olvidePassword,
  perfil,
  register,
} from '../controllers/UsuarioControllers.js';
import { checkAuth } from '../middleware/checkAuth.js';

// Autenticacion, registro y confirmacion de usuario

router.post('/', register);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

router.get('/perfil', checkAuth, perfil);

export default router;
