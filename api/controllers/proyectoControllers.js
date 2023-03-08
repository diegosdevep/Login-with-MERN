import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);

  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where('creador').equals(req.usuario);

  res.json(proyectos);
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  const buscarProyectoExistente = async (id) => {
    try {
      const busqueda = await Proyecto.findById(id);
      return busqueda;
    } catch (error) {
      throw new Error('Error al buscar el proyecto');
    }
  };

  const proyecto = await buscarProyectoExistente(id);

  if (!proyecto) {
    const error = new Error('No encontrado');
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Accion no valida');
    return res.status(404).json({ msg: error.message });
  }

  // Obtener tareas del proyecto
  const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);

  res.json({ proyecto, tareas });
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;

  const buscarProyectoExistente = async (id) => {
    try {
      const busqueda = await Proyecto.findById(id);
      if (!busqueda) return;
      return busqueda;
    } catch (error) {
      return null;
    }
  };

  const proyecto = await buscarProyectoExistente(id);

  if (!proyecto) {
    const error = new Error('No encontrado');
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Accion no valida');
    return res.status(404).json({ msg: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.description = req.body.description || proyecto.description;
  proyecto.fechaDeEntrega = req.body.fechaDeEntrega || proyecto.fechaDeEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;

  const buscarProyectoExistente = async (id) => {
    try {
      const busqueda = await Proyecto.findById(id);
      return busqueda;
    } catch (error) {
      throw new Error('Error al buscar el proyecto');
    }
  };

  const proyecto = await buscarProyectoExistente(id);

  if (!proyecto) {
    const error = new Error('No encontrado');
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Accion no valida');
    return res.status(404).json({ msg: error.message });
  }

  try {
    await proyecto.delete();
    res.json({ msg: 'Proyecto Eliminado' });
  } catch (error) {
    console.log(error);
  }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

export {
  obtenerProyecto,
  nuevoProyecto,
  obtenerProyectos,
  editarProyecto,
  eliminarColaborador,
  eliminarProyecto,
  agregarColaborador,
};
