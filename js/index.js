let carrito = [];

const contenedorZapatos = document.getElementById("contenedorZapatos");
const itemsCarrito = document.getElementById("itemsCarrito");
const totalElement = document.getElementById("total");

document.addEventListener("DOMContentLoaded", () => {
    fetch('./datos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.innerHTML = `
                    <p>${item.nombre}: $${item.precio}</p>
                    <button>Añadir al Carrito</button>
                `;
                const boton = itemDiv.querySelector("button");
                boton.addEventListener("click", () => agregarAlCarrito(item));
                contenedorZapatos.appendChild(itemDiv);
            });
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});

function agregarAlCarrito(zapato) {
    carrito.push(zapato);
    mostrarCarrito();
    Toastify({
        text: `${zapato.nombre} añadido al carrito`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "green" },
    }).showToast();
}

function mostrarCarrito() {
    itemsCarrito.innerHTML = "";
    carrito.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <p>${item.nombre}: $${item.precio}</p>
            <button>Eliminar</button>
        `;
        const botonEliminar = itemDiv.querySelector("button");
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(index));
        itemsCarrito.appendChild(itemDiv);
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

document.getElementById("calcularTotal").addEventListener("click", () => {
    if (carrito.length === 0) {
        Toastify({
            text: "El carrito está vacío",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    } else {
        const total = carrito.reduce((sum, item) => sum + item.precio, 0);
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
});
