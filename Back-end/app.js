const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

// Ruta productos
app.get("/productos", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM productos");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al consultar la base de datos"
        });
    }
});

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});