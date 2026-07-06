// Tabla secundaria: tipos de productos
const tipos = [
    { id_type: 1, nombre_type: "Juego de tablero" },
    { id_type: 2, nombre_type: "Juego de cartas" },
];

// Tabla principal: productos
const productos = [
    { id: 1,  nombre: "Catan",                precio: 40000, id_type: 1, ruta_img: "img/catan.png" },
    { id: 2,  nombre: "Ticket to Ride",       precio: 52000, id_type: 1, ruta_img: "img/ticket-to-ride.png" },
    { id: 3,  nombre: "Pandemic",             precio: 48000, id_type: 1, ruta_img: "img/pandemic.png" },
    { id: 4,  nombre: "Scrabble",             precio: 25000, id_type: 1, ruta_img: "img/scrabble.png" },
    { id: 5,  nombre: "Ajedrez clásico",      precio: 18000, id_type: 1, ruta_img: "img/ajedrez.png" },
    { id: 6,  nombre: "Monopoly",             precio: 35000, id_type: 1, ruta_img: "img/monopoly.png" },
    { id: 7,  nombre: "Exploding Kittens",    precio: 28000, id_type: 2, ruta_img: "img/exploding-kittens.png" },
    { id: 8,  nombre: "Uno",                  precio: 9000,  id_type: 2, ruta_img: "img/uno.png" },
    { id: 9,  nombre: "Dobble",               precio: 22000, id_type: 2, ruta_img: "img/dobble.png" },
    { id: 10, nombre: "Cards Against Humanity", precio: 45000, id_type: 2, ruta_img: "img/cards-against-humanity.png" },
    { id: 11, nombre: "Coup",                 precio: 15000, id_type: 2, ruta_img: "img/coup.png" },
    { id: 12, nombre: "Skip-Bo",              precio: 12000, id_type: 2, ruta_img: "img/skip-bo.png" },
];

// Helper para hacer el JOIN (simula un SELECT con JOIN)
const getProductosConTipo = () =>
    productos.map(p => ({
        ...p,
        nombre_type: tipos.find(t => t.id_type === p.id_type)?.nombre_type,
    }));

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
    // opcional:
    // alert(`Agregaste "${producto.nombre}" al carrito`);
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

let filtroActivo = null;   // 1 = tableros, 2 = cartas, null = sin filtro
let textoBusqueda = "";    // lo que hay escrito en la barra de búsqueda

// Aplica el filtro de tipo Y la búsqueda de texto juntos
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
        // Se vuelve a apretar el mismo filtro: se desactiva y vuelve a "Todos"
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

// Búsqueda por texto (se combina con el filtro de tipo que esté activo)
inputBusqueda.addEventListener("input", () => {
    textoBusqueda = inputBusqueda.value.trim().toLowerCase();
    mostrarProductos(obtenerProductosFiltrados());
});

// Al hacer click en "Todos nuestros juegos" se resetea todo: filtro, búsqueda e input
tituloReset.addEventListener("click", () => {
    filtroActivo = null;
    textoBusqueda = "";
    inputBusqueda.value = "";
    btnTableros.classList.remove("filtro-activo");
    btnCartas.classList.remove("filtro-activo");
    tituloReset.classList.add("filtro-activo");
    mostrarProductos(productos);
});

// Estado inicial: "Todos nuestros juegos" arranca marcado como activo
tituloReset.classList.add("filtro-activo");

// Delegación de eventos para botones "+"
document.querySelector("#contenedor-bloques-productos").addEventListener("click", (e) => {
    const btn = e.target.closest(".boton-producto");
    if (!btn) return;

    const idProducto = Number(btn.dataset.id);
    agregarAlCarrito(idProducto);
});

mostrarProductos(productos);