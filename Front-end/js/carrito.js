const KEY_CARRITO = "carrito";

const lista = document.getElementById("lista-carrito");
const subtotalEl = document.getElementById("subtotal");
const envioEl = document.getElementById("envio");
const totalEl = document.getElementById("total");
const btnVaciar = document.getElementById("btn-vaciar");
const btnFinalizar = document.getElementById("btn-finalizar");

function leerCarrito() {
    return JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
}

function formatearPrecio(n) {
    return `$${n.toLocaleString("es-AR")}`;
}

function render() {
    const carrito = leerCarrito();
    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = `<p class="carrito-vacio kreon">Tu carrito está vacío.</p>`;
        subtotalEl.textContent = "$0";
        envioEl.textContent = "$0";
        totalEl.textContent = "$0";
        return;
    }

    carrito.forEach((item) => {
        const row = document.createElement("article");
        row.className = "item-carrito";
        row.innerHTML = `
            <div class="nombre-item kreon">${item.nombre}</div>
            <div class="kreon">${formatearPrecio(item.precio)}</div>
            <div class="cantidad-box">
                <button class="btn-cant" data-id="${item.id}" data-op="restar">-</button>
                <span class="kreon">${item.cantidad}</span>
                <button class="btn-cant" data-id="${item.id}" data-op="sumar">+</button>
            </div>
            <button class="btn-eliminar kreon" data-id="${item.id}" data-op="eliminar">Quitar</button>
    `;
    lista.appendChild(row);
    });

    const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const envio = subtotal > 0 ? 2500 : 0;
    const total = subtotal + envio;

    subtotalEl.textContent = formatearPrecio(subtotal);
    envioEl.textContent = formatearPrecio(envio);
    totalEl.textContent = formatearPrecio(total);
}

lista.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = btn.dataset.id;
    const op = btn.dataset.op;
    let carrito = leerCarrito();

    const idx = carrito.findIndex((p) => String(p.id) === String(id));
    if (idx === -1) return;

    if (op === "sumar") carrito[idx].cantidad += 1;
    if (op === "restar") carrito[idx].cantidad -= 1;
    if (op === "eliminar" || carrito[idx].cantidad <= 0) carrito.splice(idx, 1);

    guardarCarrito(carrito);
    render();
});

btnVaciar.addEventListener("click", () => {
    guardarCarrito([]);
    render();
});

render();

btnFinalizar.addEventListener("click", async () => {

    const carrito = leerCarrito();

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!usuario) {
        alert("Debés iniciar sesión.");
        return;
    }

    const precioTotal = carrito.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
    );

    try {

        const response = await fetch("http://localhost:3000/ventas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre_usuario: usuario.nombre,
                precio_total: precioTotal,
                productos: carrito
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.mensaje);
            return;
        }

        alert("Compra realizada correctamente.");

        guardarCarrito([]);
        render();

    } catch (error) {

        console.error(error);

        alert("Error al registrar la compra.");

    }

});