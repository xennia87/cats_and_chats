//// Cosas que hay que hacer

//// ACTIVIDAD

// - Captura de eventos
// - Salida en el HTML
// - Almacenar datos en el storage
// - Recuperar datos del storage
// - No se puede usar alert() para salida
// - No se puede usar prompt() para entrada
// - Capturamos eventos usuario inputs sobre botones

//// COSAS EN LA PAGINA


// LOGIN

// 1. Hacer que cuando el usuario se loguea con user y password "admin"
// la tab "Crear artículo" aparezca y aparezca un mensaje de bienvenida ✅

// CREAR ARTÍCULO

// Crear un form flotante para crear un artículo con las opciones:
// - Nombre, - Descripción, - Precio e -Imagen

// Cuando el admin cree un articulo, este debe aparecer como una card
// en la página.
// Debe añadirse al archivo JSON?

// CARRITO

// Cuando el usuario pulse en el botón añadir al carrito, el item
// debe aparecer ahí.

// Cuando el usuario pulse en el botón de "quitar" el item debe eliminarse

// El total del carrito se debe calcular según el precio de los elementos que
// haya en él

//// CÓDIGO

/// MENSAJE BIENVENIDA

// Función para mostrar el mensaje de bienvenida
function mostrarMensajeBienvenida(username) {
    const headerMessageContainer = document.getElementById('headerMessageContainer');
    const headerMessage = document.getElementById('headerMessage');
    const closeMessage = document.getElementById('closeMessage');
    headerMessageContainer.style.display = 'flex';
    headerMessage.innerText = (username == 'admin') ? `Bienvenido ${username}.
    Puedes crear artículos desde el enlace superior` : `Bienvenido ${username}`;
    
    // Cierra el mensaje de bienvenida cuando se hace clic en el botón de cierre
    closeMessage.addEventListener('click', () => {
        headerMessageContainer.style.display = 'none';
    });
}
/// SISTEMA LOGIN

// Cogemos el json de usuarios, lo pasamos a un array
// y lo convertimos en objeto

const usuarios = '[ { "username": "admin", "password": "admin" }, { "username": "enduser", "password": "enduser" } ]'

const usuariosObj = JSON.parse(usuarios)
console.log(usuariosObj)


// Obtenemos los elementos del DOM
const loginButton = document.getElementById("loginButton");
const modal = document.getElementById("modalweb");
const close = document.getElementById("close");

// Mostramos el modal cuando se hace clic en el botón "Login"
loginButton.addEventListener("click", () => {
    modal.style.display = "block";
});

// Ocultamos el modal cuando se hace clic en la "X" de cerrar
close.addEventListener("click", () => {
    modal.style.display = "none";
});

// Ocultamos el modal cuando se hace clic fuera de él
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


// Función para verificar las credenciales
function verificarCredenciales(username, password) {
    const usuarioEncontrado = usuariosObj.find(user => user.username === username && user.password === password);
    const tabCrearArticulo = document.getElementById('crear_articulo')

    if (usuarioEncontrado) {
        mostrarMensajeBienvenida(usuarioEncontrado.username); // Muestra el mensaje de bienvenida
        tabCrearArticulo.style.display = 'block';
        modal.style.display = "none"; // Cierra el modal
    } else {
        // Usuario no encontrado, muestra un mensaje de error en el modal
        document.getElementById('errorMessage').textContent = 'Usuario no encontrado';
        document.getElementById('errorMessage').style.color = 'red';
    }
}

// Manejar el evento de inicio de sesión
document.getElementById('login').addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    verificarCredenciales(username, password);
});