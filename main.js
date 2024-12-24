document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');
    const carritoElement = document.getElementById('carrito');
    const botonesAgregar = document.querySelectorAll('button');

    // Función para agregar productos al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const producto = e.target.closest('div');
            const nombre = producto.querySelector('p').textContent;
            const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', '').replace('.', ''));
            
            // Agregar al carrito
            carrito.push({ nombre, precio });
            actualizarCarrito();
        });
    });

    // Actualizar la vista del carrito
    function actualizarCarrito() {
        carritoLista.innerHTML = '';
        let total = 0;

        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}`;
            
            // Crear botón para eliminar el producto
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('btn-eliminar');
            btnEliminar.addEventListener('click', () => eliminarDelCarrito(index));  // Eliminar el producto
            
            li.appendChild(btnEliminar);
            carritoLista.appendChild(li);
            total += item.precio;
        });

        totalElement.textContent = `$${total.toFixed(2)}`;
        carritoElement.style.display = 'block'; // Muestra el carrito
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);  // Elimina el producto por su índice
        actualizarCarrito();  // Actualiza la vista del carrito
    }

    // Función para finalizar la compra
    document.getElementById('finalizar-compra').addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío.');
        } else {
            alert('Compra finalizada. ¡Gracias por tu compra!');
            carrito.length = 0; // Limpiar carrito
            actualizarCarrito();
        }
    });
});

// Suponiendo que tienes botones para agregar productos, puedes asociarles la función
document.querySelector('.btn-agregar').addEventListener('click', () => {
    // Ejemplo de producto, reemplaza con el producto real que se agregue
    const producto = {
        nombre: 'Producto Ejemplo',
        precio: 100
    };

    agregarAlCarrito(producto);
});

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);  // Agregar el producto al carrito
    mostrarCarrito();        // Mostrar el carrito actualizado
    alert(`¡${producto.nombre} ha sido añadido al carrito!`);  // Mensaje de confirmación
    actualizarTotal();        // Actualizar el total
}

// Función para mostrar el carrito
function mostrarCarrito() {
    let carritoContenedor = document.querySelector('.carrito-contenedor ul');
    carritoContenedor.innerHTML = '';

    carrito.forEach((producto, index) => {
        let li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;

        // Botón de eliminar
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            carrito.splice(index, 1); // Eliminar producto
            mostrarCarrito();          // Actualizar la vista del carrito
            actualizarTotal();          // Actualizar el total
        });

        li.appendChild(btnEliminar);
        carritoContenedor.appendChild(li);
    });
}

// Función para actualizar el total
function actualizarTotal() {
    let total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
    document.querySelector('.carrito-contenedor .total').textContent = `Total: $${total.toFixed(2)}`;
}
