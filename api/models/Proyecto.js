import mongoose from 'mongoose';

const proyectoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      trim: true,
      required: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    colaboradores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const proyecto = mongoose.model('Proyecto', proyectoSchema);
export default proyecto;
