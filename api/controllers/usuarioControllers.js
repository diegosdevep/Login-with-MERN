import { emailRegistro, emailOlvidePassword } from '../helper/email.js';
import { generarId } from '../helper/generarId.js';
import { generarJWT } from '../helper/generarJWT.js';
import Usuario from '../models/Usuario.js';

export const register = async (req, res) => {
  // Evitar usuarios duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error(` El usuario ${email} ya esta registrado`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();

    // Enviar email de confirmacion

    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.json({
      msg: 'Usuario Creado Correctamente, Revisa tu email para confirmar tu cuenta',
    });
  } catch (error) {
    console.log(`Error en creando usuario ${error}`);
  }
};

export const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar que el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error('El Usuario no existe');
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no a sido confirmada');
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error('El password es incorrecto');
    return res.status(403).json({ msg: error.message });
  }
};

export const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error('Token no valido');
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = '';
    await usuarioConfirmar.save();
    res.json({ msg: 'Usuario confirmado correctamente' });
  } catch (error) {
    console.log(`Error al confirmar usuario ${error}`);
  }
};

export const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error('El Usuario no existe');
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    // Enviar el email

    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.json({ msg: 'Hemos enviado un email con las instrucciones' });
  } catch (error) {
    console.log(error);
  }
};

export const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: 'Token valido y el usuario Existe' });
  } else {
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }
};

export const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    usuario.password = password;
    usuario.token = '';
    try {
      await usuario.save();
      res.json({ msg: 'Password Modificado Correctamente' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }
};

export const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};
