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

export {
    obtenerUsuarios
};