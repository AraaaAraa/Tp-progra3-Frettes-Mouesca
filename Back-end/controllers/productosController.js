import * as Producto from "../models/producto.js";

const obtenerProductos = async (req, res) => {
    try {

        const productos = await Producto.obtenerTodos();

        res.json(productos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener productos"
        });
    }
};

const crearProducto = async (req, res) => {
    try {

        const nuevoProducto = req.body;

        const resultado = await Producto.crear(nuevoProducto);

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            id: resultado.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear el producto"
        });
    }
};

const actualizarProducto = async (req, res) => {
    try {

        const { id } = req.params;

        const productoActualizado = req.body;

        const resultado = await Producto.actualizar(id, productoActualizado);

        res.json({
            mensaje: "Producto actualizado correctamente",
            filasAfectadas: resultado.affectedRows
        });

        
    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar el producto"
        });
    }
};

const eliminarProducto = async (req, res) => {
    try {

        const { id } = req.params;

        const resultado = await Producto.eliminar(id);

        res.json({
            mensaje: "Producto eliminado correctamente",
            filasAfectadas: resultado.affectedRows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar el producto"
        });
    }
};

export {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};