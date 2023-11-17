/// VARIABLES
const getElement = (id) => document.getElementById(id);

const headerMessageContainer = getElement("headerMessageContainer");
const headerMessage = getElement("headerMessage");
const closeMessage = getElement("closeMessage");
const userNameBanner = getElement("username_banner");
const loginButton = getElement("loginButton");
const modal = getElement("modalweb");
const close = getElement("close");
const addProduct = getElement("create_article");
const productFormModal = getElement("modal_new_product");
const closeForm = getElement("closeForm");
const createProduct = getElement("create_product_button");
const createArticleTab = getElement("create_article");

const users = JSON.parse('[{"username": "admin", "password": "admin"}, {"username": "enduser", "password": "enduser"}]');

/// MENSAJE BIENVENIDA
function showWelcomeMessage(username) {
  headerMessageContainer.style.display = "flex";
  headerMessage.innerText = username === "admin"
    ? `Bienvenido ${username}. Puedes crear artículos desde el enlace superior`
    : `Bienvenido ${username}`;
  userNameBanner.innerHTML = `Hola ${username}`;
  closeMessage.addEventListener("click", () => {
    headerMessageContainer.style.display = "none";
  });
}

loginButton.addEventListener("click", () => {
  modal.style.display = "block";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Función para verificar las credenciales
function verifyCredentials(username, password) {
  const userFound = users.find(user => user.username === username && user.password === password);

  if (userFound) {
    showWelcomeMessage(userFound.username);
    createArticleTab.style.display = "block";
    modal.style.display = "none";
  } else {
    getElement("errorMessage").textContent = "Usuario no encontrado";
    getElement("errorMessage").style.color = "red";
  }
}

getElement("login").addEventListener("click", () => {
  const username = getElement("username").value;
  const password = getElement("password").value;
  verifyCredentials(username, password);
});

/// SISTEMA NUEVO PRODUCTO
addProduct.addEventListener("click", () => {
  productFormModal.style.display = "block";
  addProduct.setAttribute("aria-selected", true);
});

closeForm.addEventListener("click", () => {
  productFormModal.style.display = "none";
  addProduct.setAttribute("aria-selected", false);
});

window.addEventListener("click", (event) => {
  if (event.target === productFormModal) {
    productFormModal.style.display = "none";
    addProduct.setAttribute("aria-selected", false);
  }
});

createProduct.addEventListener("click", () => {
  productFormModal.style.display = "none";
  addProduct.setAttribute("aria-selected", false);
});

/// CONTENEDOR ARTICULOS
  
// Esta clase crea un objeto con el nuevo elemento a añadir como producto al DOM

class CardItem {
  constructor(name, description, price, image) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }

  addItem() {
    const newItem = document.createElement("div");
    newItem.classList.add("card");

    const newItemImagen = document.createElement("div");
    newItemImagen.classList.add("card_image");
    const imagenDentroDiv = document.createElement("img");
    imagenDentroDiv.src = this.image;

    const newItemText = document.createElement("div");
    newItemText.classList.add("card_text");
    const newItemTitle = document.createElement("div");
    newItemTitle.classList.add("card_title");
    newItemTitle.textContent = this.name;

    const newItemPrice = document.createElement("div");
    newItemPrice.classList.add("card_price");
    newItemPrice.textContent = this.price;

    const newItemDescription = document.createElement("div");
    newItemDescription.classList.add("card_description");
    newItemDescription.textContent = this.description;

    const newItemButton = document.createElement("button");
    newItemButton.classList.add("card_submit");
    newItemButton.id = "boton_agregar";
    newItemButton.textContent = "Añadir al carrito";

    //Añadimos los elementos creados
    newItemImagen.appendChild(imagenDentroDiv);
    newItemText.appendChild(newItemTitle);
    newItemText.appendChild(newItemPrice);
    newItemText.appendChild(newItemDescription);
    newItemText.appendChild(newItemButton);

    newItem.appendChild(newItemImagen);
    newItem.appendChild(newItemText);

    cardsContainer.appendChild(newItem);
  }
}

/// CARRITO
// Agrega los productos fisicamente al contenedor del carrito

const cardsContainer = getElement("cards_container");

function createAndAddCard(name, description, price, image) {
  const newCard = new CardItem(name, description, price, image);
  newCard.addItem();
}

createAndAddCard("Pastel Catu", "Pastel de chocolate", 7.5, "docs/assets/cake.jpeg");
createAndAddCard("Neko sandwich", "Sandwich de atun y sardinas", 8, "docs/assets/sandwich.jpeg");
createAndAddCard("Kitty donut", "Donut relleno de nata", 4, "docs/assets/donut.jpeg");

/// CONTENEDOR ARTICULOS
getElement("create_product_button").addEventListener("click", (e) => {
  e.preventDefault();
  const name = getElement("name").value;
  const description = getElement("description").value;
  const price = getElement("price").value;
  const image = getElement("image").value;
  createAndAddCard(name, description, price, image);
});

/// CARRITO
const cartContainer = getElement("cart_product_list");

function addToCart(name, price, quantity = 1) {
    const newCartItem = document.createElement("li");
    newCartItem.className = "cart_product_item";

    const newCartItemName = createCartItemElement("div", "cart_product_name", name);
    const newCartItemQuantity = createCartItemElement("div", "cart_product_quantity", quantity);
    const newCartItemPrice = createCartItemElement("span", "cart_product_price", price.toFixed(2));
    const newCartItemButton = createCartItemElement("button", "cart_remove_item", "Quitar");

    newCartItem.append(newCartItemName, newCartItemQuantity, newCartItemPrice, newCartItemButton);

    cartContainer.appendChild(newCartItem);

    updateCartTotal();
}

function createCartItemElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = textContent;
    return element;
}

function updateCartTotal() {
    const total = calculateTotal();
    cartTotal.textContent = total.toFixed(2);
}

document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("card_submit")) {
      const card = target.closest(".card");
      const itemName = card.querySelector(".card_title").textContent;
      const itemPrice = parseFloat(card.querySelector(".card_price").textContent);
  
      const cartItems = document.querySelectorAll(".cart_product_item");
  
      const existingCartItem = [...cartItems].find((item) => {
        return item.querySelector(".cart_product_name").textContent === itemName;
      });
  
      if (existingCartItem) {
        const itemQuantity = existingCartItem.querySelector(".cart_product_quantity");
        const currentQuantity = parseInt(itemQuantity.textContent, 10);
        itemQuantity.textContent = currentQuantity + 1;
  
        const itemTotalPrice = existingCartItem.querySelector(".cart_product_price");
        const currentTotalPrice = parseFloat(itemTotalPrice.textContent.replace(",", ""));
        const newTotalPrice = (currentQuantity + 1) * itemPrice;
        itemTotalPrice.textContent = newTotalPrice.toFixed(2);
      } else {
        addToCart(itemName, itemPrice);
      }
  
      const total = calculateTotal();
      cartTotal.textContent = total.toFixed(2);
    }
  });
  

cartContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("cart_remove_item")) {
        const item = event.target.closest(".cart_product_item");
        const index = Array.from(cartContainer.children).indexOf(item);
    
        item.remove();
    
        // Recalculamos el total
        const total = calculateTotal();
        cartTotal.textContent = total.toFixed(2);
      }
});

function calculateTotal() {
    const cartItemsPrice = document.querySelectorAll(".cart_product_price");
    let total = 0;
    cartItemsPrice.forEach((item) => {
      total += parseFloat(item.textContent.replace(",", ""));
    });
  
    return total;
}

const cartTotal = getElement("cart_total");
const total = calculateTotal();
cartTotal.textContent = total.toFixed(2);

/// LOCAL STORAGE
function getCartItemsString() {
    const cartItems = document.querySelectorAll(".cart_product_item");
    const itemsArray = [];
  
    cartItems.forEach((item) => {
      const name = item.querySelector(".cart_product_name").textContent;
      const quantity = item.querySelector(".cart_product_quantity").textContent;
      const price = item.querySelector(".cart_product_price").textContent;
      const itemObject = {
        name: name,
        quantity: quantity,
        price: price,
      };
      itemsArray.push(itemObject);
    });
  
    const cartItemsString = JSON.stringify(itemsArray);
    return cartItemsString;
}

function saveCartToLocalStorage() {
    const cartItemsString = getCartItemsString();
    localStorage.setItem("cartItems", cartItemsString);
}

window.addEventListener("beforeunload", function () {
  saveCartToLocalStorage();
});

function loadCartFromLocalStorage() {
    const cartItemsString = localStorage.getItem("cartItems");
    console.log(cartItemsString);
    if (cartItemsString) {
      const itemsArray = JSON.parse(cartItemsString);
  
      itemsArray.forEach((itemObject) => {
        const itemName = itemObject.name;
        const itemQuantity = itemObject.quantity;
        const itemPrice = itemObject.price;
  
        addToCart(itemName, itemPrice, parseInt(itemQuantity, 10));
      });
    }
}

loadCartFromLocalStorage();