import express from "express";

import {
    obtenerUsuarios,
    crearUsuario,
    loginUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", crearUsuario);
router.post("/login", loginUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;