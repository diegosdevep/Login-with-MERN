import express from 'express';
import cors from 'cors';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// Configurar cors
const whiteList = [process.env.FRONTEND_URL];

const corsOption = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  },
};

app.use(cors(corsOption));

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
