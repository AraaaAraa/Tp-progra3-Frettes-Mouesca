import db from "../database/db.js";

const obtenerTodos = async () => {
    const [rows] = await db.query(
        "SELECT id, nombre, email, es_admin FROM usuarios"
    );

    return rows;
};

const crear = async (nuevoUsuario) => {

    const [resultado] = await db.query(
        `INSERT INTO usuarios
        (nombre, email, password, es_admin)
        VALUES (?, ?, ?, ?)`,
        [
            nuevoUsuario.nombre,
            nuevoUsuario.email,
            nuevoUsuario.password,
            nuevoUsuario.es_admin
        ]
    );

    return resultado;
};

const actualizar = async (id, usuarioActualizado) => {

    const [resultado] = await db.query(
        `UPDATE usuarios
        SET
            nombre = ?,
            email = ?,
            password = ?,
            es_admin = ?
        WHERE id = ?`,
        [
            usuarioActualizado.nombre,
            usuarioActualizado.email,
            usuarioActualizado.password,
            usuarioActualizado.es_admin,
            id
        ]
    );

    return resultado;
};

const eliminar = async (id) => {

    const [resultado] = await db.query(
        `DELETE FROM usuarios
        WHERE id = ?`,
        [id]
    );

    return resultado;
};

export {
    obtenerTodos,
    crear,
    actualizar,
    eliminar
};