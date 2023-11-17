# Cats & Chats

Bienvenidos a la página de Cats & Chats, el café de gatos
con clases de yoga y pilates (próximamente).

## Funciones

### Sistema de login

- Cuando el usuario hace click en el botón de login, se abre
un modal para introducir usuario y contraseña.
Por favor escribe `admin` en ambos valores.
- Cuando el usuario es un admin, se muestra una nueva pestaña en el header 'Crear artículo'. 
- Sea el usuario un usuario final (escribe `enduser` en ambos campos para probar este comportamiento) o un admin, se añade un pequeño banner de bienvenida en la web.
- Si el usuario pulsa en la 'X' de ese mensaje, este se cierra y desaparece.

### Alta de artículos

- Cuando el usuario hacer click en la pestaña de 'Crear artículo' se abre un form.
- Puedes usar los valores que están prerellenos allí para crear un nuevo artículo.

### Carrito

- Cuando se pulsa en el botón 'Añadir al carrito' se añade el elemento al carrito.
- Cuando se pulsa dentro del carrito el elemento de la papelera, el item se elimina del carrito.
- Si se pulsa el botón de añadir al carrito más de una vez, se incrementa la cantidad.
- El total del carrito se recalcula dinámicamente.

### Local storage

- Cuando el usuario quiere cerrar la página, se guarda el contenido del carrito en el local storage.
- Cuando el usuario vuelve a abrir la página, el carrito vuelve a generarse.
- También se guarda el login.
