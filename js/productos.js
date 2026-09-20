/* ============================================================
   GOURMET & CO. - CATALOGO DE PRODUCTOS
   Proyecto DSY1104 Desarrollo Fullstack II - Duoc UC

   REGLA DE NEGOCIO DEL CASO 5
   Un producto puede configurarse de dos maneras:
     a) Con precio normal, admitiendo valores decimales.
     b) Con la opcion FREE, es decir precio igual a 0, que
        corresponde a una degustacion o muestra gratis.
   El catalogo se genera desde este arreglo de datos y es
   JavaScript el que decide como mostrar cada precio.
   ============================================================ */

"use strict";

/* ---------- 1. ORIGEN DE DATOS ----------
   Cada producto tiene: id, nombre, categoria, descripcion,
   imagen, precio (numero decimal, 0 = FREE), unidad y etiqueta. */
const PRODUCTOS = [

    // --- Cafe & Te ---
    {
        id: "caf-01",
        nombre: "Café Huila en grano",
        categoria: "cafe",
        descripcion: "Origen único de Colombia. Notas a panela y frutos rojos, tueste medio.",
        imagen: "img/prod-cafe.jpg",
        precio: 9990,
        unidad: "250 g",
        etiqueta: "Más vendido"
    },
    {
        id: "caf-02",
        nombre: "Té blanco Pai Mu Tan",
        categoria: "cafe",
        descripcion: "Hojas jóvenes secadas al sol. Infusión suave, floral y de cuerpo ligero.",
        imagen: "img/prod-te.jpg",
        precio: 7450.90,
        unidad: "80 g",
        etiqueta: ""
    },
    {
        id: "caf-03",
        nombre: "Muestra de café del mes",
        categoria: "cafe",
        descripcion: "Dosis para dos tazas del origen que estamos tostando esta semana.",
        imagen: "img/prod-muestra-cafe.jpg",
        precio: 0,
        unidad: "40 g",
        etiqueta: "Degustación"
    },

    // --- Chocolates & Dulces ---
    {
        id: "cho-01",
        nombre: "Chocolate 70% cacao",
        categoria: "chocolates",
        descripcion: "Cacao de origen único endulzado con panela. Sin emulsionantes.",
        imagen: "img/prod-chocolate.jpg",
        precio: 5490,
        unidad: "100 g",
        etiqueta: ""
    },
    {
        id: "cho-02",
        nombre: "Bombones de licor de autor",
        categoria: "chocolates",
        descripcion: "Estuche de nueve piezas rellenas con destilados chilenos.",
        imagen: "img/prod-bombones.jpg",
        precio: 16250.50,
        unidad: "9 unidades",
        etiqueta: "Regalo"
    },
    {
        id: "cho-03",
        nombre: "Cuadrito de degustación",
        categoria: "chocolates",
        descripcion: "Una pieza del chocolate del mes para probar antes de comprar.",
        imagen: "img/prod-muestra-chocolate.jpg",
        precio: 0,
        unidad: "10 g",
        etiqueta: "Degustación"
    },

    // --- Quesos & Charcuteria ---
    {
        id: "que-01",
        nombre: "Queso de cabra 6 meses",
        categoria: "quesos",
        descripcion: "Maduración en cava, textura firme y perfil salino pronunciado.",
        imagen: "img/prod-queso.jpg",
        precio: 14750,
        unidad: "300 g",
        etiqueta: ""
    },
    {
        id: "que-02",
        nombre: "Jamón serrano en lonjas",
        categoria: "quesos",
        descripcion: "Curado 18 meses, cortado a cuchillo y envasado al vacío.",
        imagen: "img/prod-jamon.jpg",
        precio: 12300.75,
        unidad: "150 g",
        etiqueta: ""
    },
    {
        id: "que-03",
        nombre: "Tabla degustación del día",
        categoria: "quesos",
        descripcion: "Tres cortes pequeños para probar en tienda. Un servicio por cliente.",
        imagen: "img/prod-muestra-queso.jpg",
        precio: 0,
        unidad: "en tienda",
        etiqueta: "Degustación"
    },

    // --- Vinos & Licores ---
    {
        id: "vin-01",
        nombre: "Carménère de autor",
        categoria: "vinos",
        descripcion: "Valle de Colchagua, cosecha limitada 2023. Guarda de 12 meses en roble.",
        imagen: "img/prod-vino.jpg",
        precio: 22900,
        unidad: "750 ml",
        etiqueta: "Cosecha limitada"
    },
    {
        id: "vin-02",
        nombre: "Pisco de uva moscatel",
        categoria: "vinos",
        descripcion: "Destilado artesanal del Valle del Elqui, 40 grados.",
        imagen: "img/prod-pisco.jpg",
        precio: 18990.90,
        unidad: "700 ml",
        etiqueta: ""
    },
    {
        id: "vin-03",
        nombre: "Copa de cata programada",
        categoria: "vinos",
        descripcion: "Cata guiada de nuestro vino del mes. Solo mayores de 18 años.",
        imagen: "img/prod-muestra-vino.jpg",
        precio: 0,
        unidad: "en tienda",
        etiqueta: "Degustación"
    }
];

/* Nombres visibles de cada categoria */
const NOMBRES_CATEGORIA = {
    cafe: "Café & Té",
    chocolates: "Chocolates & Dulces",
    quesos: "Quesos & Charcutería",
    vinos: "Vinos & Licores"
};


/* ---------- 2. REGLA DE NEGOCIO: FORMATO DEL PRECIO ----------
   Devuelve un objeto con el texto a mostrar, la clase CSS que
   corresponde y si el producto es gratuito. Es aqui donde se
   aplica la regla FREE del caso. */
function formatearPrecio(precio) {

    // Caso FREE: el precio es exactamente 0
    if (precio === 0) {
        return {
            texto: "Degustación gratis",
            clase: "precio precio--free",
            esFree: true
        };
    }

    // Caso normal: se admiten valores decimales.
    // Si el precio tiene decimales se muestran dos; si es
    // entero no se muestra ningun decimal.
    const tieneDecimales = precio % 1 !== 0;

    const formateado = precio.toLocaleString("es-CL", {
        minimumFractionDigits: tieneDecimales ? 2 : 0,
        maximumFractionDigits: tieneDecimales ? 2 : 0
    });

    return {
        texto: "$" + formateado,
        clase: "precio",
        esFree: false
    };
}


/* ---------- 3. CONSTRUCCION DE UNA TARJETA ----------
   Devuelve el HTML de un producto como cadena de texto. */
function crearTarjeta(producto) {

    const precio = formatearPrecio(producto.precio);

    // Un producto FREE lleva la etiqueta destacada en color vino
    const claseEtiqueta = precio.esFree ? "etiqueta etiqueta--free" : "etiqueta";
    const textoEtiqueta = precio.esFree ? "FREE" : producto.etiqueta;

    // La etiqueta solo se dibuja si existe
    const bloqueEtiqueta = textoEtiqueta
        ? '<span class="' + claseEtiqueta + '">' + textoEtiqueta + "</span>"
        : "";

    // El boton cambia segun sea degustacion o venta
    const textoBoton = precio.esFree ? "Solicitar degustación" : "Consultar";

    return '' +
        '<article class="col-6 col-lg-3" data-categoria="' + producto.categoria + '">' +
            '<div class="card card-gourmet h-100">' +
                '<img src="' + producto.imagen + '" class="card-img-top" ' +
                     'alt="' + producto.nombre + ' de Gourmet y Co.">' +
                '<div class="card-body">' +
                    '<p class="card-categoria">' + NOMBRES_CATEGORIA[producto.categoria] + "</p>" +
                    bloqueEtiqueta +
                    "<h3 class=\"card-title\">" + producto.nombre + "</h3>" +
                    '<p class="card-text">' + producto.descripcion + "</p>" +
                    '<p class="' + precio.clase + '">' + precio.texto + "</p>" +
                    '<p class="ayuda">Formato: ' + producto.unidad + "</p>" +
                "</div>" +
                '<div class="card-footer bg-transparent border-0 pb-4">' +
                    '<a href="contacto.html" class="btn btn-dorado btn-sm w-100">' + textoBoton + "</a>" +
                "</div>" +
            "</div>" +
        "</article>";
}


/* ---------- 4. DIBUJAR EL CATALOGO ----------
   Recorre las categorias y llena la grilla de cada una. */
function dibujarCatalogo(filtro) {

    const categorias = Object.keys(NOMBRES_CATEGORIA);

    categorias.forEach(function (categoria) {

        const grilla = document.getElementById("grilla-" + categoria);
        const bloque = document.getElementById("bloque-" + categoria);

        if (!grilla || !bloque) {
            return;
        }

        // Si hay un filtro activo distinto de "todos", se ocultan
        // las secciones que no corresponden
        if (filtro && filtro !== "todos" && filtro !== categoria) {
            bloque.hidden = true;
            return;
        }

        bloque.hidden = false;

        const delaCategoria = PRODUCTOS.filter(function (p) {
            return p.categoria === categoria;
        });

        if (delaCategoria.length === 0) {
            grilla.innerHTML = '<p class="aviso-vacio">No hay productos disponibles en esta categoría.</p>';
            return;
        }

        grilla.innerHTML = delaCategoria.map(crearTarjeta).join("");
    });
}


/* ---------- 5. FILTROS POR CATEGORIA ---------- */
function activarFiltros() {

    const botones = document.querySelectorAll(".filtro-btn");

    botones.forEach(function (boton) {
        boton.addEventListener("click", function () {

            // Marca visualmente el filtro activo
            botones.forEach(function (b) {
                b.classList.remove("activo");
            });
            boton.classList.add("activo");

            dibujarCatalogo(boton.dataset.filtro);
        });
    });
}


/* ---------- 6. RESUMEN DE DEGUSTACIONES ----------
   Cuenta cuantos productos estan configurados como FREE. */
function mostrarResumenFree() {

    const contenedor = document.getElementById("resumenFree");

    if (!contenedor) {
        return;
    }

    const gratuitos = PRODUCTOS.filter(function (p) {
        return p.precio === 0;
    });

    contenedor.textContent =
        "Actualmente hay " + gratuitos.length +
        " productos configurados como degustación gratuita (precio 0) de un total de " +
        PRODUCTOS.length + " productos en catálogo.";
}


/* ---------- 7. INICIO ----------
   Se ejecuta cuando el documento HTML termina de cargarse. */
document.addEventListener("DOMContentLoaded", function () {
    dibujarCatalogo("todos");
    activarFiltros();
    mostrarResumenFree();
});
