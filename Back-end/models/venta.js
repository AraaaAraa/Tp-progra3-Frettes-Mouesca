import db from "../database/db.js";

const crearVenta = async (venta) => {

    const [resultado] = await db.query(
        `INSERT INTO ventas
        (nombre_usuario, precio_total)
        VALUES (?, ?)`,
        [
            venta.nombre_usuario,
            venta.precio_total
        ]
    );

    return resultado.insertId;
};

export { crearVenta };