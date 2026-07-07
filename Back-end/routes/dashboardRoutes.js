import express from "express";
import * as Producto from "../models/producto.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const productos = await Producto.obtenerTodos();

        res.render("dashboard", {
            productos
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el dashboard");
    }
});

router.get("/editar/:id", async (req, res) => {

    try {

        const producto = await Producto.obtenerPorId(req.params.id);

        res.render("crear", {
            producto
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Error al cargar el producto");

    }

});

router.get("/crear", (req, res) => {
    res.render("crear", {
        producto: null
    });
});

export default router;