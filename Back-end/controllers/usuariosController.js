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

const loginUsuario = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y contraseña son obligatorios"
            });
        }

        const usuario = await Usuario.obtenerPorEmail(email);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        if (usuario.password !== password) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        const { password: _, ...usuarioSinPassword } = usuario;

        res.json({
            mensaje: "Login exitoso",
            usuario: usuarioSinPassword
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al iniciar sesión"
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
    loginUsuario,
    actualizarUsuario,
    eliminarUsuario
};