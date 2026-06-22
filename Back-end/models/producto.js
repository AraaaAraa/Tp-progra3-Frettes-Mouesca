const db = require("../database/db");

const obtenerTodos = async () => {
    const [rows] = await db.query(
        "SELECT * FROM productos WHERE activo = 1"
    );

    return rows;
};

module.exports = {
    obtenerTodos
};