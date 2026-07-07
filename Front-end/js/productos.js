const API_URL = "http://localhost:3000/productos";
let productos = [];

const KEY_CARRITO = "carrito";

function leerCarrito() {
    return JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    const carrito = leerCarrito();
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            ruta_img: producto.ruta_img,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
}

function mostrarProductos(array) {
    const contenedor = document.querySelector("#contenedor-bloques-productos");

    if (array.length === 0) {
        contenedor.innerHTML = `<p class="sin-resultados kreon">No encontramos lo que buscás :(</p>`;
        return;
    }

    let cartaProducto = "";
    array.forEach((producto) => {
        cartaProducto += `
            <div class="contenedor-producto">
                <div class="contenedor-imagen-producto">
                    <img src="${producto.ruta_img}" alt="${producto.nombre}" class="imagen-producto">
                </div>

                <div class="contenedor-inferior-producto">
                    <div class="info-producto">
                        <p class="titulo-producto kreon">${producto.nombre}</p>
                        <p class="precio kreon">$ ${producto.precio.toLocaleString("es-AR")}</p>
                    </div>
                    <div class="sumar-producto">
                        <button class="boton-producto" type="button" data-id="${producto.id}">
                            +
                        </button>
                    </div>
                </div>
            </div>`;
    });

    contenedor.innerHTML = cartaProducto;
}

const btnTableros = document.getElementById("btn-tableros");
const btnCartas = document.getElementById("btn-cartas");
const inputBusqueda = document.getElementById("barra-busqueda");
const tituloReset = document.getElementById("titulo-reset");

let filtroActivo = null;
let textoBusqueda = "";

function obtenerProductosFiltrados() {
    let resultado = productos;

    if (filtroActivo !== null) {
        resultado = resultado.filter(p => p.id_type === filtroActivo);
    }

    if (textoBusqueda !== "") {
        resultado = resultado.filter(p =>
            p.nombre.toLowerCase().includes(textoBusqueda)
        );
    }

    return resultado;
}

function filtrarPorTipo(idTipo, botonActivo, botonInactivo) {
    if (filtroActivo === idTipo) {
        filtroActivo = null;
        botonActivo.classList.remove("filtro-activo");
        tituloReset.classList.add("filtro-activo");
    } else {
        filtroActivo = idTipo;
        botonActivo.classList.add("filtro-activo");
        botonInactivo.classList.remove("filtro-activo");
        tituloReset.classList.remove("filtro-activo");
    }

    mostrarProductos(obtenerProductosFiltrados());
}

btnTableros.addEventListener("click", () => filtrarPorTipo(1, btnTableros, btnCartas));
btnCartas.addEventListener("click", () => filtrarPorTipo(2, btnCartas, btnTableros));

inputBusqueda.addEventListener("input", () => {
    textoBusqueda = inputBusqueda.value.trim().toLowerCase();
    mostrarProductos(obtenerProductosFiltrados());
});

tituloReset.addEventListener("click", () => {
    filtroActivo = null;
    textoBusqueda = "";
    inputBusqueda.value = "";
    btnTableros.classList.remove("filtro-activo");
    btnCartas.classList.remove("filtro-activo");
    tituloReset.classList.add("filtro-activo");
    mostrarProductos(productos);
});

tituloReset.classList.add("filtro-activo");

document.querySelector("#contenedor-bloques-productos").addEventListener("click", (e) => {
    const btn = e.target.closest(".boton-producto");
    if (!btn) return;

    const idProducto = Number(btn.dataset.id);
    agregarAlCarrito(idProducto);
});

async function inicializar() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            throw new Error("Error al obtener los datos del servidor");
        }

        const productosDB = await respuesta.json();

        productos = productosDB.map((p) => ({
            id: Number(p.id),
            nombre: p.producto,
            precio: Number(p.precio) || 0,
            id_type: p.tipo === "Tablero" ? 1 : 2,
            ruta_img: p.imagen.startsWith("img/")
            ? p.imagen
            : `img/${p.imagen}`
        }));

        mostrarProductos(productos);
    } catch (error) {
        console.error("Hubo un problema al cargar los productos:", error);
        const contenedor = document.querySelector("#contenedor-bloques-productos");
        contenedor.innerHTML = `<p class="sin-resultados kreon">Error al conectar con el servidor de productos.</p>`;
    }
}

inicializar();