/* ============================================================
   PRUEBAS UNITARIAS: fuente de datos (CRUD)
   Gourmet & Co. - DSY1104

   Prueba la logica del archivo de datos sin dibujar componentes.
   ============================================================ */

import {
  obtenerProductos,
  obtenerPorCategoria,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  reiniciarDatos
} from "../data/productos";

describe("Fuente de datos de productos", () => {

  // Antes de cada prueba dejamos los datos como al inicio,
  // asi una prueba no afecta el resultado de la siguiente
  beforeEach(() => {
    reiniciarDatos();
  });

  /* --- PRUEBA 10: operaciones CRUD --- */
  it("permite crear, actualizar y eliminar productos", () => {
    const cantidadInicial = obtenerProductos().length;

    // CREAR
    const nuevo = agregarProducto({
      nombre: "Mermelada de higos",
      categoria: "Chocolates & Dulces",
      descripcion: "Preparada en olla pequeña, sin conservantes.",
      precio: 4990,
      imagen: "/img/prod-mermelada.jpg"
    });

    expect(obtenerProductos().length).toBe(cantidadInicial + 1);
    expect(nuevo.nombre).toBe("Mermelada de higos");

    // ACTUALIZAR
    const modificado = actualizarProducto(nuevo.id, { precio: 3990 });
    expect(modificado.precio).toBe(3990);

    // ELIMINAR
    const seElimino = eliminarProducto(nuevo.id);
    expect(seElimino).toBeTrue();
    expect(obtenerProductos().length).toBe(cantidadInicial);
  });

  /* --- PRUEBA 11 (extra): filtrado por categoria --- */
  it("filtra los productos por categoría", () => {
    const cafes = obtenerPorCategoria("Café & Té");

    expect(cafes.length).toBeGreaterThan(0);

    // Todos los resultados deben ser de esa categoria
    cafes.forEach((p) => {
      expect(p.categoria).toBe("Café & Té");
    });

    // Una categoria que no existe devuelve lista vacia
    expect(obtenerPorCategoria("Panadería").length).toBe(0);
  });

});
