const formulario = document.getElementById("form-crear-producto");
const statusMessage = document.getElementById("status-message");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que la página parpadee o se recargue

    const formData = new FormData(formulario);
    const nuevoProducto = Object.fromEntries(formData.entries());

    // Casteo: Aseguramos que precio y stock viajen como números reales al Backend
    nuevoProducto.precio = Number(nuevoProducto.precio);
    nuevoProducto.stock = Number(nuevoProducto.stock);

    try {
        // Conectamos con el controlador de productos que ya tienen en routes/productosRoutes.js
        const response = await fetch("http://localhost:3000/../routes/productosRoutes.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto)
        });

        const result = await response.json();

        if (response.ok) {
            statusMessage.innerHTML = `<p style="color: #4caf50; font-weight: bold;">✨ ¡Éxito!: ${result.mensaje || 'Producto guardado'}</p>`;
            formulario.reset(); // Limpia los inputs
        } else {
            statusMessage.innerHTML = `<p style="color: #f44336; font-weight: bold;">⚠ Error: ${result.mensaje}</p>`;
        }
    } catch (error) {
        console.error("Error en la conexión Fetch:", error);
        statusMessage.innerHTML = `<p style="color: #f44336; font-weight: bold;">❌ Error: No se pudo conectar con el servidor.</p>`;
    }
});