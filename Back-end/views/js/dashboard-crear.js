const formulario = document.getElementById("form-crear-producto");
const statusMessage = document.getElementById("status-message");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que la página parpadee o se recargue

    const formData = new FormData(formulario);
    const nuevoProducto = Object.fromEntries(formData.entries());

    // Casteo: Asegurar que el precio viaje como número real al Backend
    nuevoProducto.precio = Number(nuevoProducto.precio);

    try {
        // Conectamos con el controlador de productos que ya tienen en routes/productosRoutes.js
        const response = await fetch("http://localhost:3000/api/productos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto)
        });

        const result = await response.json();

        if (response.ok) {
            statusMessage.innerHTML = `<p style="color: #4caf50; font-weight: bold;">✨ ¡Éxito!: ${result.message || 'Producto guardado'}</p>`;
            formulario.reset(); // Limpia los inputs
        } else {
            statusMessage.innerHTML = `<p style="color: #f44336; font-weight: bold;">⚠ Error: ${result.message}</p>`;
        }
    } catch (error) {
        console.error("Error en la conexión Fetch:", error);
        statusMessage.innerHTML = `<p style="color: #f44336; font-weight: bold;">❌ Error: No se pudo conectar con el servidor.</p>`;
    }
});