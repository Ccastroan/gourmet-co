/* ============================================================
   FUENTE DE DATOS - Gourmet & Co.
   DSY1104 Desarrollo Fullstack II

   Este archivo simula una base de datos. Guarda los productos
   en un arreglo y entrega funciones para crear, leer, actualizar
   y eliminar (CRUD).

   Mas adelante esto se va a reemplazar por una API real, pero la
   idea es que los componentes no se enteren: ellos solo llaman a
   estas funciones.
   ============================================================ */

/* Lista inicial de productos.
   precio = 0 significa degustacion gratis (regla del caso). */
const productosIniciales = [
  {
    id: 1,
    nombre: "Café Huila en grano",
    categoria: "Café & Té",
    descripcion: "Origen único de Colombia, notas a panela y frutos rojos.",
    precio: 9990,
    imagen: "/img/prod-cafe.jpg",
    disponible: true,
    oferta: false
  },
  {
    id: 2,
    nombre: "Té blanco Pai Mu Tan",
    categoria: "Café & Té",
    descripcion: "Hojas jóvenes secadas al sol, infusión suave y floral.",
    precio: 7450.9,
    imagen: "/img/prod-te.jpg",
    disponible: true,
    oferta: true
  },
  {
    id: 3,
    nombre: "Muestra de café del mes",
    categoria: "Café & Té",
    descripcion: "Dosis para dos tazas del origen que estamos tostando.",
    precio: 0,
    imagen: "/img/prod-muestra-cafe.jpg",
    disponible: true,
    oferta: false
  },
  {
    id: 4,
    nombre: "Chocolate 70% cacao",
    categoria: "Chocolates & Dulces",
    descripcion: "Cacao de origen único endulzado con panela.",
    precio: 5490,
    imagen: "/img/prod-chocolate.jpg",
    disponible: true,
    oferta: false
  },
  {
    id: 5,
    nombre: "Bombones de licor de autor",
    categoria: "Chocolates & Dulces",
    descripcion: "Estuche de nueve piezas rellenas con destilados chilenos.",
    precio: 16250.5,
    imagen: "/img/prod-bombones.jpg",
    disponible: true,
    oferta: true
  },
  {
    id: 6,
    nombre: "Queso de cabra 6 meses",
    categoria: "Quesos & Charcutería",
    descripcion: "Maduración en cava, textura firme y perfil salino.",
    precio: 14750,
    imagen: "/img/prod-queso.jpg",
    disponible: true,
    oferta: false
  },
  {
    id: 7,
    nombre: "Jamón serrano en lonjas",
    categoria: "Quesos & Charcutería",
    descripcion: "Curado 18 meses, cortado a cuchillo.",
    precio: 12300,
    imagen: "/img/prod-jamon.jpg",
    disponible: false,
    oferta: false
  },
  {
    id: 8,
    nombre: "Carménère de autor",
    categoria: "Vinos & Licores",
    descripcion: "Valle de Colchagua, cosecha limitada 2023.",
    precio: 22900,
    imagen: "/img/prod-vino.jpg",
    disponible: true,
    oferta: false
  },
  {
    id: 9,
    nombre: "Pisco de uva moscatel",
    categoria: "Vinos & Licores",
    descripcion: "Destilado artesanal del Valle del Elqui, 40 grados.",
    precio: 18990,
    imagen: "/img/prod-pisco.jpg",
    disponible: true,
    oferta: true
  },
  {
    id: 10,
    nombre: "Copa de cata programada",
    categoria: "Vinos & Licores",
    descripcion: "Cata guiada del vino del mes. Solo mayores de 18 años.",
    precio: 0,
    imagen: "/img/prod-muestra-vino.jpg",
    disponible: true,
    oferta: false
  }
];

/* Copia de trabajo. Se usa una copia y no el arreglo original
   para poder volver al estado inicial en las pruebas. */
let productos = [...productosIniciales];


/* ---------- LEER ---------- */

export function obtenerProductos() {
  return [...productos];
}

export function obtenerProductoPorId(id) {
  return productos.find((p) => p.id === id);
}

export function obtenerPorCategoria(categoria) {
  return productos.filter((p) => p.categoria === categoria);
}

export function obtenerOfertas() {
  return productos.filter((p) => p.oferta === true);
}

export function obtenerCategorias() {
  const nombres = productos.map((p) => p.categoria);
  // Set elimina los repetidos
  return [...new Set(nombres)];
}


/* ---------- CREAR ---------- */

export function agregarProducto(nuevo) {
  // Calcula el siguiente id disponible
  const ids = productos.map((p) => p.id);
  const siguienteId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const producto = {
    id: siguienteId,
    disponible: true,
    oferta: false,
    ...nuevo
  };

  productos.push(producto);
  return producto;
}


/* ---------- ACTUALIZAR ---------- */

export function actualizarProducto(id, cambios) {
  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return null;
  }

  productos[indice] = { ...productos[indice], ...cambios };
  return productos[indice];
}


/* ---------- ELIMINAR ---------- */

export function eliminarProducto(id) {
  const cantidadAntes = productos.length;
  productos = productos.filter((p) => p.id !== id);
  return productos.length < cantidadAntes;
}


/* ---------- UTILIDAD PARA LAS PRUEBAS ---------- */

/* Devuelve los datos a su estado inicial.
   Sirve para que una prueba no afecte a la siguiente. */
export function reiniciarDatos() {
  productos = [...productosIniciales];
}
