const express = require("express");
const cors = require("cors");

const productosRoutes = require("./routes/productosRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

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