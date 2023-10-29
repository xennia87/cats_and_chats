//// Cosas que hay que hacer

//// ACTIVIDAD

// ✅ Captura de eventos
// ✅ Salida en el HTML
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

const usuariosObj = JSON.parse(usuarios);

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

/// CONTENEDOR ARTICULOS

// Esta clase crea un objeto con el nuevo elemento a añadir como producto al DOM

const cardsContainer = document.getElementById('cards_container')

class nuevoItem {
    constructor(nombre, descripcion, precio, imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        // Esta función agrega el item al DOM
        this.agregarItem = function() {
            // Creamos todos los elementos y le damos el contenido
            const nuevoItem = document.createElement('div')
            nuevoItem.classList.add('card')

            const nuevoItemImagen = document.createElement('div')
            nuevoItemImagen.classList.add('card_image')
            const imagenDentroDiv = document.createElement('img')
            imagenDentroDiv.src = this.imagen

            const nuevoItemText = document.createElement('div')
            nuevoItemText.classList.add('card_text')
            const nuevoItemTitle = document.createElement('div')
            nuevoItemTitle.classList.add('card_title')
            nuevoItemTitle.textContent = this.nombre

            const nuevoItemPrice = document.createElement('div')
            nuevoItemPrice.classList.add('card_price')
            nuevoItemPrice.textContent = this.precio

            const nuevoItemDescription = document.createElement('div')
            nuevoItemDescription.classList.add('card_description')
            nuevoItemDescription.textContent = this.descripcion

            const nuevoItemButton = document.createElement('button')
            nuevoItemButton.classList.add('card_submit')
            nuevoItemButton.id = 'boton_agregar'
            nuevoItemButton.textContent = 'Añadir al carrito'

            //Añadimos los elementos creados
            nuevoItemImagen.appendChild(imagenDentroDiv)
            nuevoItemText.appendChild(nuevoItemTitle)
            nuevoItemText.appendChild(nuevoItemPrice)
            nuevoItemText.appendChild(nuevoItemDescription)
            nuevoItemText.appendChild(nuevoItemButton)
            
            nuevoItem.appendChild(nuevoItemImagen)
            nuevoItem.appendChild(nuevoItemText)

            cardsContainer.appendChild(nuevoItem)
        }
    }
}

// Agregamos nuevos items

let pastel = new nuevoItem("Pastel Rico", "El pastel más delicioso", 7.50, "images/cake.jpeg")
pastel.agregarItem()

let sandwich = new nuevoItem("Neko sandwich", "Un sandwich de atun y sardinas", 8, "images/sandwich.jpeg")
sandwich.agregarItem()

const sandwichString = JSON.stringify(sandwich)

/// CARRITO

function obtenerCarrito() {
    const carritoJSON = localStorage.getItem('carrito')
    return JSON.parse(carritoJSON) || []
}

function guardarCarrito(carrito) {
    const carritoJSON = JSON.stringify(carrito)
    localStorage.setItem('carrito', carritoJSON)
    console.log('Guardar carrito' + carritoJSON)
}

let carrito = obtenerCarrito()

// Agregar al carrito

const cartContainer = document.getElementById('cart_product_list')

function agregarCarrito(nombre, precio) {

    const nuevoItem = document.createElement('li')
    nuevoItem.classList.add('cart_product_item');

    const nuevoItemName = document.createElement('div')
    const nuevoItemQuantity = document.createElement('div')
    const nuevoItemPrice = document.createElement('span')
    const nuevoItemButton = document.createElement('button')

    nuevoItemName.classList.add('cart_product_name')
    nuevoItemQuantity.classList.add('cart_product_quantity')
    nuevoItemPrice.classList.add('cart_product_price')
    nuevoItemButton.classList.add('cart_remove_item')

    nuevoItemName.textContent = nombre
    nuevoItemQuantity.textContent = 1
    nuevoItemPrice.textContent = precio
    // nuevoItemChild3.textContent = 'Quitar'

    nuevoItem.appendChild(nuevoItemName)
    nuevoItem.appendChild(nuevoItemQuantity)
    nuevoItem.appendChild(nuevoItemPrice)
    nuevoItem.appendChild(nuevoItemButton)

    cartContainer.appendChild(nuevoItem)

    // Añadimos al local storage
    carrito.push({nombre, precio})
    guardarCarrito(carrito)

    // Recalculamos el total
    const total = calcularTotal()
    totalCarrito.textContent = total.toFixed(2)
}

// Acción para escuchar el botón de "Añadir al carrito"

const botonAgregar = document.querySelectorAll('.card_submit')

botonAgregar.forEach(boton => {
    boton.addEventListener('click', function() {
        const card = boton.closest('.card');
        const nombreProducto = card.querySelector('.card_title').textContent;
        const precioProducto = card.querySelector('.card_price').textContent;

        agregarCarrito(nombreProducto, precioProducto)
    });
});

// Eliminar del carrito

cartContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('cart_remove_item')) {
        const item = event.target.closest('.cart_product_item');
        const index = Array.from(cartContainer.children).indexOf(item);

        item.remove();

        // Recalculamos el total
        const total = calcularTotal()
        totalCarrito.textContent = total.toFixed(2)

        // Eliminamos del local storage
        carrito.splice(index, 1);
        console.log(carrito)
        guardarCarrito(carrito); 
    }
});

// Suma el total de todos los elementos que haya en el carrito.

let totalCarrito = document.getElementById('cart_total')

function calcularTotal(){
    const precioItemsCarrito = document.querySelectorAll('.cart_product_price')
    let total = 0
    precioItemsCarrito.forEach(item => {
        total += parseFloat(item.textContent.replace('$', '').replace(',', ''));
    });

    return total
};

const total = calcularTotal()
totalCarrito.textContent = total.toFixed(2)

// Cargamos el carrito cuando se carga la página

function cargarCarrito() {
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
    }

    const carritoEnLocalStorage = obtenerCarrito();
    carrito = [];

    carritoEnLocalStorage.forEach(item => {
        // Comprobar si el producto ya existe en el carrito
        const existeEnCarrito = carrito.some(cartItem => cartItem.nombre === item.nombre);

        if (!existeEnCarrito) {
            agregarCarrito(item.nombre, item.precio);
        }
    });
}

let carritoCargado = false;

document.addEventListener("DOMContentLoaded", function() {
    if (!carritoCargado) {
        cargarCarrito();
        carritoCargado = true;
    }
});