import db from "../database/db.js";

const obtenerTodos = async () => {
    const [rows] = await db.query(
        "SELECT * FROM productos WHERE activo = 1"
    );

    return rows;
};

const crear = async (nuevoProducto) => {

    const [resultado] = await db.query(
        `INSERT INTO productos
        (producto, descripcion, precio, imagen, tipo, stock, activo)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            nuevoProducto.producto,
            nuevoProducto.descripcion,
            nuevoProducto.precio,
            nuevoProducto.imagen,
            nuevoProducto.tipo,
            nuevoProducto.stock,
            1
        ]
    );

    return resultado;
};

export {
    obtenerTodos,
    crear
};