/* ============================================================
   PRUEBAS UNITARIAS: componente Carrito
   Gourmet & Co. - DSY1104

   Cubre renderizado condicional, logica de calculo y eventos.
   ============================================================ */

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Carrito, { calcularTotal } from "../components/Carrito";

describe("Componente Carrito", () => {

  const itemsDePrueba = [
    { nombre: "Café Huila", precio: 9990 },
    { nombre: "Chocolate 70%", precio: 5490 },
    { nombre: "Muestra de café", precio: 0 }
  ];

  afterEach(() => {
    cleanup();
  });

  /* --- PRUEBA 7: renderizado condicional, carrito vacio --- */
  it("muestra el mensaje de carrito vacío cuando no hay items", () => {
    render(<Carrito items={[]} />);

    const aviso = screen.getByText("Tu carrito está vacío");
    expect(aviso).toBeTruthy();

    // Con el carrito vacio no debe existir el boton de vaciar
    const botonVaciar = screen.queryByRole("button", {
      name: "Vaciar carrito"
    });
    expect(botonVaciar).toBeNull();
  });

  /* --- PRUEBA 8: logica de calculo del total --- */
  it("calcula el total sumando solo los productos con precio", () => {
    // Esta prueba no necesita dibujar nada: prueba la funcion sola
    const total = calcularTotal(itemsDePrueba);

    // 9990 + 5490 + 0 = 15480
    expect(total).toBe(15480);
    expect(calcularTotal([])).toBe(0);
  });

  /* --- PRUEBA 9: evento de quitar un producto --- */
  it("avisa qué producto se quiere quitar al presionar Quitar", () => {
    let indiceRecibido = null;

    const simularQuitar = (indice) => {
      indiceRecibido = indice;
    };

    render(<Carrito items={itemsDePrueba} onQuitar={simularQuitar} />);

    // Buscamos el boton de quitar del segundo producto
    const boton = screen.getByRole("button", {
      name: "Quitar Chocolate 70%"
    });

    fireEvent.click(boton);

    // El segundo producto esta en la posicion 1 del arreglo
    expect(indiceRecibido).toBe(1);
  });

});
