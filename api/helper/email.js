import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Informacion del email

  const info = await transport.sendMail({
    from: '"Project Lab - Administrador de Proyectos" <cuentas@projectlab.com>',
    to: email,
    subject: 'Project Lab - Confirma tu cuenta',
    text: 'Comprueba tu cuenta en Project Lab',
    html: `
        <p>Hola: ${nombre} Confirma tu cuenta en Project Lab</p>
        <p>Tu cuenta esta casi lista , solo debes comprobarla en el siguiente enlace: </p>

        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Informacion del email

  const info = await transport.sendMail({
    from: '"Project Lab - Administrador de Proyectos" <cuentas@projectlab.com>',
    to: email,
    subject: 'Project Lab - Reestrablece tu password',
    text: 'Reestrablece tu password',
    html: `
        <p>Hola: ${nombre} has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password </p>

        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>

        <p>Si tu no solicitaste este email, puedes ignorar este mensaje</p>
    `,
  });
};
