/// MENSAJE BIENVENIDA

// Función para mostrar el mensaje de bienvenida
function showWelcomeMessage(username) {
    const headerMessageContainer = document.getElementById("headerMessageContainer");
    const headerMessage = document.getElementById("headerMessage");
    const closeMessage = document.getElementById("closeMessage");
    const userNameBanner = document.getElementById("username_banner");
  
    headerMessageContainer.style.display = "flex";
    headerMessage.innerText =
      username == "admin"
        ? `Bienvenido ${username}.
      Puedes crear artículos desde el enlace superior`
        : `Bienvenido ${username}`;
    userNameBanner.innerHTML = `Hola ${username}`;
  
    // Cierra el mensaje de bienvenida cuando se hace clic en el botón de cierre
    closeMessage.addEventListener("click", () => {
      headerMessageContainer.style.display = "none";
    });
  }
  /// SISTEMA LOGIN
  
  // Convertimos el json de usuarios a un array y a objeto
  
  const users =
    '[ { "username": "admin", "password": "admin" }, { "username": "enduser", "password": "enduser" } ]';
  
  const usersObj = JSON.parse(users);
  
  // Obtenemos los elementos del DOM
  const loginButton = document.getElementById("loginButton");
  const modal = document.getElementById("modalweb");
  const close = document.getElementById("close");
  
  // Mostramos el modal cuando se hace clic en el botón 'Login'
  loginButton.addEventListener("click", () => {
    modal.style.display = "block";
  });
  
  // Ocultamos el modal cuando se hace clic en la 'X' de cerrar
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
  function verifyCredentials(username, password) {
    const userFound = usersObj.find(
      (user) => user.username === username && user.password === password,
    );
    const createArticleTab = document.getElementById("create_article");
  
    if (userFound) {
      showWelcomeMessage(userFound.username); // Muestra el mensaje de bienvenida
      createArticleTab.style.display = "block";
      modal.style.display = "none"; // Cierra el modal
    } else {
      // Usuario no encontrado, muestra un mensaje de error en el modal
      document.getElementById("errorMessage").textContent =
        "Usuario no encontrado";
      document.getElementById("errorMessage").style.color = "red";
    }
  }
  
  // Manejar el evento de inicio de sesión
  document.getElementById("login").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    verifyCredentials(username, password);
  });
  
  // SISTEMA NUEVO PRODUCTO
  
  const addProduct = document.getElementById("create_article");
  const productFormModal = document.getElementById("modal_new_product");
  const closeForm = document.getElementById("closeForm");
  const createProduct = document.getElementById("create_product_button");
  
  // Mostramos el modal cuando se hace clic en el botón 'Crear producto'
  addProduct.addEventListener("click", () => {
    productFormModal.style.display = "block";
    addProduct.setAttribute("aria-selected", true);
  });
  
  // Ocultamos el modal cuando se hace clic en la 'X' de cerrar
  closeForm.addEventListener("click", () => {
    productFormModal.style.display = "none";
    addProduct.setAttribute("aria-selected", false);
  });
  
  // Ocultamos el modal cuando se hace clic fuera de él
  window.addEventListener("click", (event) => {
    if (event.target == productFormModal) {
      productFormModal.style.display = "none";
      addProduct.setAttribute("aria-selected", false);
    }
  });
  
  // Ocultamos el modal cuando se envía el form
  createProduct.addEventListener("click", (event) => {
    productFormModal.style.display = "none";
    addProduct.setAttribute("aria-selected", false);
  });
  
  // Agregamos un producto cuando se pulsa el botón enviar
  
  document
    .getElementById("create_product_button")
    .addEventListener("click", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      const price = document.getElementById("price").value;
      const image = document.getElementById("image").value;
  
      const newitem = new cardItem(name, description, price, image);
      newitem.addItem();
    });
  
  /// CONTENEDOR ARTICULOS
  
  // Esta clase crea un objeto con el nuevo elemento a añadir como producto al DOM
  
  const cardsContainer = document.getElementById("cards_container");
  
  class cardItem {
    constructor(name, description, price, image) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.image = image;
      // Esta función agrega el item al DOM
      this.addItem = function () {
        // Creamos todos los elementos y le damos el contenido
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
      };
    }
  }
  
  // Agregamos nuevos items
  
  let pie = new cardItem(
    "Pastel Catu",
    "Pastel de chocolate",
    7.5,
    "docs/assets/cake.jpeg"
  );
  pie.addItem();
  
  let sandwich = new cardItem(
    "Neko sandwich",
    "Sandwich de atun y sardinas",
    8,
    "docs/assets/sandwich.jpeg",
  );
  sandwich.addItem();
  
  let donut = new cardItem(
    "Kitty donut",
    "Donut relleno de nata",
    4,
    "docs/assets/donut.jpeg",
  );
  donut.addItem();
  
  const sandwichString = JSON.stringify(sandwich);
  
  /// CARRITO
  // Agrega los productos fisicamente al contenedor del carrito
  
  const cartContainer = document.getElementById("cart_product_list");
  
  function addToCart(name, price, quantity = 1) {
    const newCartItem = document.createElement("li");
    newCartItem.classList.add("cart_product_item");
  
    const newCartItemName = document.createElement("div");
    const newCartItemQuantity = document.createElement("div");
    const newCartItemPrice = document.createElement("span");
    const newCartItemButton = document.createElement("button");
  
    newCartItemName.classList.add("cart_product_name");
    newCartItemQuantity.classList.add("cart_product_quantity");
    newCartItemPrice.classList.add("cart_product_price");
    newCartItemButton.classList.add("cart_remove_item");
  
    newCartItemName.textContent = name;
    newCartItemQuantity.textContent = quantity;
    newCartItemPrice.textContent = price;
    // newCartItemChild3.textContent = 'Quitar'
  
    newCartItem.appendChild(newCartItemName);
    newCartItem.appendChild(newCartItemQuantity);
    newCartItem.appendChild(newCartItemPrice);
    newCartItem.appendChild(newCartItemButton);
  
    cartContainer.appendChild(newCartItem);
  
    // Recalculamos el total
    const total = calculateTotal();
    cartTotal.textContent = total.toFixed(2);
  }
  
  // Acción para escuchar el botón de 'Añadir al carrito'
  
  const addButton = document.querySelectorAll(".card_submit");
  
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("card_submit")) {
      const boton = event.target;
      const card = boton.closest(".card");
      const itemName = card.querySelector(".card_title").textContent;
      const itemPrice = card.querySelector(".card_price").textContent;
  
      const cartItems = document.querySelectorAll(".cart_product_item");
  
      const existingCartItem = [...cartItems].find((item) => {
        const cartItemName = item.querySelector(".cart_product_name").textContent;
        return cartItemName == itemName ? true : false;
      });
  
      // Si existe el elemento en el carrito añadimos +1 a la cantidad e incrementamos el precio
      if (existingCartItem) {
        const itemQuantity = existingCartItem.querySelector(
          ".cart_product_quantity",
        );
        const currentQuantity = parseInt(itemQuantity.textContent, 10);
        itemQuantity.textContent = currentQuantity + 1;
  
        const itemTotalPrice = existingCartItem.querySelector(
          ".cart_product_price",
        );
        const currenTotalPrice = parseFloat(
          itemTotalPrice.textContent.replace(",", ""),
        );
        const newTotalPrice = (currentQuantity + 1) * itemPrice;
        itemTotalPrice.textContent = newTotalPrice.toFixed(2);
      } else {
        addToCart(itemName, itemPrice);
      }
      // Recalculamos el total
      const total = calculateTotal();
      cartTotal.textContent = total.toFixed(2);
    }
  });
  
  // Eliminar del carrito
  
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
  
  // Suma el total de todos los elementos que haya en el carrito.
  
  let cartTotal = document.getElementById("cart_total");
  
  function calculateTotal() {
    const cartItemsPrice = document.querySelectorAll(".cart_product_price");
    let total = 0;
    cartItemsPrice.forEach((item) => {
      total += parseFloat(item.textContent.replace(",", ""));
    });
  
    return total;
  }
  
  const total = calculateTotal();
  cartTotal.textContent = total.toFixed(2);
  
  // LOCAL STORAGE
  
  // Creamos una cadena de elementos en el carrito
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
  
  // Función para agregar la cadena al local storage
  function saveCartToLocalStorage() {
    const cartItemsString = getCartItemsString();
    localStorage.setItem("cartItems", cartItemsString);
  }
  
  // Llamamos a la función de guardar el carrito cuando se cierra / recarga la página.
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
  // Llamamos a la función de cargar el carrito una vez por carga.
  loadCartFromLocalStorage();
  