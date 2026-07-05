import * as Usuario from "../models/usuario.js";

const obtenerUsuarios = async (req, res) => {
    try {

        const usuarios = await Usuario.obtenerTodos();

        res.json(usuarios);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener usuarios"
        });
    }
};

const crearUsuario = async (req, res) => {
    try {

        const nuevoUsuario = req.body;

        const resultado = await Usuario.crear(nuevoUsuario);

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear el usuario"
        });
    }
};

const actualizarUsuario = async (req, res) => {
    try {

        const { id } = req.params;

        const usuarioActualizado = req.body;

        const resultado = await Usuario.actualizar(id, usuarioActualizado);

        res.json({
            mensaje: "Usuario actualizado correctamente",
            filasAfectadas: resultado.affectedRows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar el usuario"
        });
    }
};

const eliminarUsuario = async (req, res) => {
    try {

        const { id } = req.params;

        const resultado = await Usuario.eliminar(id);

        res.json({
            mensaje: "Usuario eliminado correctamente",
            filasAfectadas: resultado.affectedRows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar el usuario"
        });
    }
};

export {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};