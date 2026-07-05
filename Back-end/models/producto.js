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

const actualizar = async (id, productoActualizado) => {

    const [resultado] = await db.query(
        `UPDATE productos
        SET
            producto = ?,
            descripcion = ?,
            precio = ?,
            imagen = ?,
            tipo = ?,
            stock = ?
        WHERE id = ?`,
        [
            productoActualizado.producto,
            productoActualizado.descripcion,
            productoActualizado.precio,
            productoActualizado.imagen,
            productoActualizado.tipo,
            productoActualizado.stock,
            id
        ]
    );

    return resultado;
};

const eliminar = async (id) => {

    const [resultado] = await db.query(
        `UPDATE productos
        SET activo = 0
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