const db = require("../database/db");

const obtenerTodos = async () => {
    const [rows] = await db.query(
        "SELECT id, nombre, email, es_admin FROM usuarios"
    );

    return rows;
};

module.exports = {
    obtenerTodos
};