import express from "express";
import cors from "cors";

import productosRoutes from "./routes/productosRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

// Rutas
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});