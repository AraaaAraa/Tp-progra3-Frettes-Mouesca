const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const db = require("./database/db");
=======

const productosRoutes = require("./routes/productosRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
>>>>>>> 7fd7114432ef308eecbb36eed1e316eb5aef2141

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

<<<<<<< HEAD
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
=======
// Rutas
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
>>>>>>> 7fd7114432ef308eecbb36eed1e316eb5aef2141

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});