/* ============================================================
   PRUEBAS UNITARIAS: componente ListaProductos
   Gourmet & Co. - DSY1104

   Cubre pruebas de propiedades (props) y renderizado condicional.
   ============================================================ */

import { render, screen, cleanup } from "@testing-library/react";
import ListaProductos from "../components/ListaProductos";

describe("Componente ListaProductos", () => {

  // Datos de prueba, cortos a proposito
  const productosDePrueba = [
    { id: 1, nombre: "Café Huila", precio: 9990, imagen: "/img/a.jpg" },
    { id: 2, nombre: "Chocolate 70%", precio: 5490, imagen: "/img/b.jpg" },
    { id: 3, nombre: "Queso de cabra", precio: 14750, imagen: "/img/c.jpg" }
  ];

  afterEach(() => {
    cleanup();
  });

  /* --- PRUEBA 5: renderiza todos los elementos del arreglo --- */
  it("renderiza una tarjeta por cada producto recibido", () => {
    render(<ListaProductos productos={productosDePrueba} />);

    // Cada Producto dibuja un boton "Agregar al carrito",
    // asi que contamos los botones para saber cuantas tarjetas hay
    const botones = screen.getAllByRole("button", {
      name: "Agregar al carrito"
    });

    expect(botones.length).toBe(3);

    // Y comprobamos que los nombres sean los que pasamos
    expect(screen.getByRole("heading", { name: "Café Huila" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Chocolate 70%" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Queso de cabra" })).toBeTruthy();
  });

  /* --- PRUEBA 6: renderizado condicional con lista vacia --- */
  it("muestra un mensaje cuando no hay productos", () => {
    render(<ListaProductos productos={[]} titulo="Café & Té" />);

    const aviso = screen.getByText(
      "No hay productos disponibles en esta categoría."
    );
    expect(aviso).toBeTruthy();

    // No debe haber ninguna tarjeta
    const botones = screen.queryAllByRole("button", {
      name: "Agregar al carrito"
    });
    expect(botones.length).toBe(0);
  });

});
