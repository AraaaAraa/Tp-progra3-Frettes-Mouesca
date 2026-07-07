import db from "../database/db.js";

const crearDetalleVenta = async (detalle) => {

    const [resultado] = await db.query(
        `INSERT INTO ventas_productos
        (venta_id, producto_id, cantidad, precio_unitario)
        VALUES (?, ?, ?, ?)`,
        [
            detalle.venta_id,
            detalle.producto_id,
            detalle.cantidad,
            detalle.precio_unitario
        ]
    );

    return resultado;
};

export {
    crearDetalleVenta
};