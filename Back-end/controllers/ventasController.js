import * as Venta from "../models/venta.js";
import * as VentaProducto from "../models/ventaProducto.js";

const crearVenta = async (req, res) => {

    try {

        const { nombre_usuario, precio_total, productos } = req.body;

        const idVenta = await Venta.crearVenta({
            nombre_usuario,
            precio_total
        });

        for (const producto of productos) {

            await VentaProducto.crearDetalleVenta({
                venta_id: idVenta,
                producto_id: producto.id,
                cantidad: producto.cantidad,
                precio_unitario: producto.precio
            });

        }

        res.status(201).json({
            mensaje: "Venta registrada correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al registrar la venta"
        });

    }

};

export {
    crearVenta
};