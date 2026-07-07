import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productosRoutes from "./routes/productosRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import ventasRoutes from "./routes/ventasRoutes.js";

const app = express();
    
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", "./views");

const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/css", express.static(path.join(__dirname, "views/css")));
app.use("/js", express.static(path.join(__dirname, "views/js")));

// Ruta de dashboard
app.get("/", (req, res) => {
    res.redirect("/dashboard/crear");
});

// Rutas
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/ventas", ventasRoutes);

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});