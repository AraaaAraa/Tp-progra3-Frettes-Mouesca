    const API_LOGIN = "http://localhost:3000/usuarios/login";
    const API_REGISTRO = "http://localhost:3000/usuarios";

    const tabLogin = document.getElementById("tab-login");
    const tabRegistro = document.getElementById("tab-registro");
    const tituloAuth = document.getElementById("titulo-auth");
    const grupoNombre = document.getElementById("grupo-nombre");

    const inputNombre = document.getElementById("nombre-usuario");
    const inputEmail = document.getElementById("email-usuario");
    const inputPass = document.getElementById("contrasena-usuario");
    const btnIngresar = document.getElementById("btn-ingresar");
    const errorEl = document.getElementById("login-error");

    let modo = "login";

    function setModo(nuevoModo){
    modo = nuevoModo;
    errorEl.textContent = "";
    inputPass.value = "";

    if(modo === "login"){
    tabLogin.classList.add("tab-activa");
    tabRegistro.classList.remove("tab-activa");
    grupoNombre.classList.add("oculto");
    tituloAuth.textContent = "Bienvenidos";
    btnIngresar.textContent = "Ingresar";
    }else{
    tabRegistro.classList.add("tab-activa");
    tabLogin.classList.remove("tab-activa");
    grupoNombre.classList.remove("oculto");
    tituloAuth.textContent = "Crear cuenta";
    btnIngresar.textContent = "Registrarme";
    }
    }

    tabLogin.addEventListener("click", () => setModo("login"));
    tabRegistro.addEventListener("click", () => setModo("registro"));

    btnIngresar.addEventListener("click", async () => {
    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim().toLowerCase();
    const password = inputPass.value.trim();

    if(!email || !password){
    errorEl.textContent = "Completá email y contraseña.";
    return;
    }

    try {
    if(modo === "login"){
        const resp = await fetch(API_LOGIN, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
        });

        const data = await resp.json();
        if(!resp.ok){
        errorEl.textContent = data.mensaje || "Credenciales inválidas.";
        return;
        }

        localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
        window.location.href = "productos.html";
        return;
    }

    // registro
    if(!nombre){
        errorEl.textContent = "Completá tu nombre para registrarte.";
        return;
    }

    const resp = await fetch(API_REGISTRO, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
        nombre,
        email,
        password,
        es_admin: 0
        })
    });

    const data = await resp.json();
    if(!resp.ok){
        errorEl.textContent = data.mensaje || "No se pudo registrar.";
        return;
    }

    errorEl.style.color = "#1f5f3b";
    errorEl.textContent = "Registro exitoso. Ahora iniciá sesión.";
    setModo("login");

    } catch (err) {
    console.error(err);
    errorEl.textContent = "Error de conexión con el servidor.";
    }
    });

    setModo("login");