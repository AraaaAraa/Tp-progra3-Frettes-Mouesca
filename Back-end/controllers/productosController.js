const Producto = require("../models/producto");

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

module.exports = {
    obtenerProductos
};