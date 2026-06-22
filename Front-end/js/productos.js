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







/*<div class="contenedor-producto">
                <div class="imagen-producto"></div>
                <div class="contenedor-inferior-producto">
                    <div class="info-producto"></div>
                    <div class="sumar-producto"></div>
                </div>
            </div>*/


function mostrarProductos(array) {
    let cartaProducto = "";
    array.forEach((producto) => {
        cartaProducto += `
            <div class="contenedor-producto">
                <div class="imagen-producto">
                    <img src="${producto.ruta_img}" alt="${producto.nombre}" class="imagen-producto">
                </div>

                <div class="contenedor-inferior-producto">
                    <div class="info-producto">
                        <p class="titulo-producto">${producto.nombre}</p>
                        <p class="precio">$ ${producto.precio}</p>
                    </div>
                    <div class="sumar-producto">
                        <button class="boton-producto" type="submit" name="${producto.id}">
                            +
                        </button>
                    </div>
                </div>
            </div>`;
    });
    document.querySelector("#contenedor-bloques-productos").innerHTML = cartaProducto;
}

let filtroActivo = null;

function filtrarPorTipo(idTipo) {
    if (filtroActivo === idTipo) {
        // Si ya está activo ese filtro, lo desactiva y muestra todos
        filtroActivo = null;
        mostrarProductos(productos);
    } else {
        filtroActivo = idTipo;
        const filtrados = productos.filter(p => p.id_type === idTipo);
        mostrarProductos(filtrados);
    }
}

document.querySelector("#btn-cartas").addEventListener("click", () => filtrarPorTipo(2));
document.querySelector("#btn-tableros").addEventListener("click", () => filtrarPorTipo(1));

mostrarProductos(productos);
