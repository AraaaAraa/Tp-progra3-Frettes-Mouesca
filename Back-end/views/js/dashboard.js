const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach((boton) => {

    boton.addEventListener("click", async () => {

        const id = boton.dataset.id;

        const confirmar = confirm("¿Seguro que querés eliminar este producto?");

        if (!confirmar) {
            return;
        }

        try {

            const respuesta = await fetch(`http://localhost:3000/productos/${id}`, {
                method: "DELETE"
            });

            if (respuesta.ok) {

                alert("Producto eliminado correctamente.");

                location.reload();

            } else {

                alert("No se pudo eliminar el producto.");

            }

        } catch (error) {

            console.error(error);
            alert("Error al conectar con el servidor.");

        }

    });

});