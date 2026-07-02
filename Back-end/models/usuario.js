import db from "../database/db.js";

const obtenerTodos = async () => {
    const [rows] = await db.query(
        "SELECT id, nombre, email, es_admin FROM usuarios"
    );

    return rows;
};

export {
    obtenerTodos
};