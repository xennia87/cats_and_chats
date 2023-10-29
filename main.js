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
function showWelcomeMessage(username) {
    const headerMessageContainer = document.getElementById('headerMessageContainer')
    const headerMessage = document.getElementById('headerMessage')
    const closeMessage = document.getElementById('closeMessage')
    headerMessageContainer.style.display = 'flex'
    headerMessage.innerText = (username == 'admin') ? `Bienvenido ${username}.
    Puedes crear artículos desde el enlace superior` : `Bienvenido ${username}`
    
    // Cierra el mensaje de bienvenida cuando se hace clic en el botón de cierre
    closeMessage.addEventListener('click', () => {
        headerMessageContainer.style.display = 'none'
    })
}
/// SISTEMA LOGIN

// Cogemos el json de usuarios, lo pasamos a un array
// y lo convertimos en objeto

const users = '[ { "username": "admin", "password": "admin" }, { "username": "enduser", "password": "enduser" } ]'

const usersObj = JSON.parse(users)

// Obtenemos los elementos del DOM
const loginButton = document.getElementById("loginButton")
const modal = document.getElementById("modalweb")
const close = document.getElementById("close")

// Mostramos el modal cuando se hace clic en el botón "Login"
loginButton.addEventListener("click", () => {
  modal.style.display = "block"
})

// Ocultamos el modal cuando se hace clic en la "X" de cerrar
close.addEventListener("click", () => {
  modal.style.display = "none"
})

// Ocultamos el modal cuando se hace clic fuera de él
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
})

// Función para verificar las credenciales
function verifyCredentials(username, password) {
    const userFound = usersObj.find(user => user.username === username && user.password === password)
    const createArticleTab = document.getElementById('crear_articulo')

    if (userFound) {
        showWelcomeMessage(userFound.username) // Muestra el mensaje de bienvenida
        createArticleTab.style.display = 'block'
        modal.style.display = "none" // Cierra el modal
    } else {
        // Usuario no encontrado, muestra un mensaje de error en el modal
        document.getElementById('errorMessage').textContent = 'Usuario no encontrado'
        document.getElementById('errorMessage').style.color = 'red'
    }
}

// Manejar el evento de inicio de sesión
document.getElementById('login').addEventListener("click", () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    verifyCredentials(username, password)
})

/// CONTENEDOR ARTICULOS

// Esta clase crea un objeto con el nuevo elemento a añadir como producto al DOM

const cardsContainer = document.getElementById('cards_container')

class cardItem {
    constructor(name, description, price, image) {
        this.name = name
        this.description = description
        this.price = price
        this.image = image
        // Esta función agrega el item al DOM
        this.addItem = function() {
            // Creamos todos los elementos y le damos el contenido
            const newItem = document.createElement('div')
            newItem.classList.add('card')

            const newItemImagen = document.createElement('div')
            newItemImagen.classList.add('card_image')
            const imagenDentroDiv = document.createElement('img')
            imagenDentroDiv.src = this.image

            const newItemText = document.createElement('div')
            newItemText.classList.add('card_text')
            const newItemTitle = document.createElement('div')
            newItemTitle.classList.add('card_title')
            newItemTitle.textContent = this.name

            const newItemPrice = document.createElement('div')
            newItemPrice.classList.add('card_price')
            newItemPrice.textContent = this.price

            const newItemDescription = document.createElement('div')
            newItemDescription.classList.add('card_description')
            newItemDescription.textContent = this.description

            const newItemButton = document.createElement('button')
            newItemButton.classList.add('card_submit')
            newItemButton.id = 'boton_agregar'
            newItemButton.textContent = 'Añadir al carrito'

            //Añadimos los elementos creados
            newItemImagen.appendChild(imagenDentroDiv)
            newItemText.appendChild(newItemTitle)
            newItemText.appendChild(newItemPrice)
            newItemText.appendChild(newItemDescription)
            newItemText.appendChild(newItemButton)
            
            newItem.appendChild(newItemImagen)
            newItem.appendChild(newItemText)

            cardsContainer.appendChild(newItem)
        }
    }
}

// Agregamos nuevos items

let pastel = new cardItem("Pastel Rico", "El pastel más delicioso", 7.50, "images/cake.jpeg")
pastel.addItem()

let sandwich = new cardItem("Neko sandwich", "Sandwich de atun y sardinas", 8, "images/sandwich.jpeg")
sandwich.addItem()

const sandwichString = JSON.stringify(sandwich)

/// CARRITO
// Agregar al carrito

const cartContainer = document.getElementById('cart_product_list')

function addToCart(name, price) {

    const newCartItem = document.createElement('li')
    newCartItem.classList.add('cart_product_item')

    const newCartItemName = document.createElement('div')
    const newCartItemQuantity = document.createElement('div')
    const newCartItemPrice = document.createElement('span')
    const newCartItemButton = document.createElement('button')

    newCartItemName.classList.add('cart_product_name')
    newCartItemQuantity.classList.add('cart_product_quantity')
    newCartItemPrice.classList.add('cart_product_price')
    newCartItemButton.classList.add('cart_remove_item')

    newCartItemName.textContent = name
    newCartItemQuantity.textContent = 1
    newCartItemPrice.textContent = price
    // newCartItemChild3.textContent = 'Quitar'

    newCartItem.appendChild(newCartItemName)
    newCartItem.appendChild(newCartItemQuantity)
    newCartItem.appendChild(newCartItemPrice)
    newCartItem.appendChild(newCartItemButton)

    cartContainer.appendChild(newCartItem)

    // Recalculamos el total
    const total = calculateTotal()
    cartTotal.textContent = total.toFixed(2)
}

// Acción para escuchar el botón de "Añadir al carrito"

const addButton = document.querySelectorAll('.card_submit')
const cartItems = document.querySelectorAll('.cart_product_item')

addButton.forEach(boton => {
    boton.addEventListener('click', function() {
        const card = boton.closest('.card')
        const itemName = card.querySelector('.card_title').textContent
        const itemPrice = card.querySelector('.card_price').textContent

        const cartItems = document.querySelectorAll('.cart_product_item')

        const existingCartItem = [...cartItems].find(item => {
            const cartItemName = item.querySelector('.cart_product_name').textContent
            return (cartItemName == itemName) ? true : false
        })

        // Si existe el elemento en el carrito añadimos +1 a la cantidad e incrementamos el precio
        if (existingCartItem) {
            const itemQuantity = existingCartItem.querySelector('.cart_product_quantity')
            const currentQuantity = parseInt(itemQuantity.textContent, 10)
            itemQuantity.textContent = currentQuantity +1

            const itemTotalPrice = existingCartItem.querySelector('.cart_product_price')
            const currenTotalPrice = parseFloat(itemTotalPrice.textContent.replace(',', ''))
            const newTotalPrice = (currentQuantity + 1) * itemPrice
            itemTotalPrice.textContent = newTotalPrice.toFixed(2)

        } else {
            addToCart(itemName, itemPrice)
        }

        // Recalculamos el total
        const total = calculateTotal()
        cartTotal.textContent = total.toFixed(2)
    })
})

// Eliminar del carrito

cartContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('cart_remove_item')) {
        const item = event.target.closest('.cart_product_item')
        const index = Array.from(cartContainer.children).indexOf(item)

        item.remove()

        // Recalculamos el total
        const total = calculateTotal()
        cartTotal.textContent = total.toFixed(2)

    }
})

// Suma el total de todos los elementos que haya en el carrito.

let cartTotal = document.getElementById('cart_total')

function calculateTotal(){
    const cartItemsPrice = document.querySelectorAll('.cart_product_price')
    let total = 0
    cartItemsPrice.forEach(item => {
        total += parseFloat(item.textContent.replace(',', ''))
    })

    return total
}

const total = calculateTotal()
cartTotal.textContent = total.toFixed(2)