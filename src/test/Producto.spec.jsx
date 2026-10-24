/* ============================================================
   PRUEBAS UNITARIAS: componente Producto
   Gourmet & Co. - DSY1104

   Cubre tres de los cuatro tipos que pide la guia:
   renderizado correcto, renderizado condicional y eventos.
   ============================================================ */

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Producto from "../components/Producto";

describe("Componente Producto", () => {

  afterEach(() => {
    cleanup();
  });

  /* --- PRUEBA 1: renderizado correcto --- */
  it("muestra el nombre del producto", () => {
    render(
      <Producto
        nombre="Café Huila en grano"
        imagen="/img/prod-cafe.jpg"
        precio={9990}
      />
    );

    const titulo = screen.getByRole("heading", {
      name: "Café Huila en grano"
    });

    expect(titulo.textContent).toBe("Café Huila en grano");
  });

  /* --- PRUEBA 2: renderizado del boton --- */
  it("muestra el botón para agregar al carrito habilitado", () => {
    render(
      <Producto
        nombre="Café Huila en grano"
        imagen="/img/prod-cafe.jpg"
        precio={9990}
      />
    );

    const boton = screen.getByRole("button", {
      name: "Agregar al carrito"
    });

    expect(boton.textContent.trim()).toBe("Agregar al carrito");
    expect(boton.disabled).toBeFalse();
  });

  /* --- PRUEBA 3: renderizado condicional (regla FREE) --- */
  it("muestra 'Degustación gratis' cuando el precio es 0", () => {
    render(
      <Producto
        nombre="Muestra de café del mes"
        imagen="/img/prod-muestra-cafe.jpg"
        precio={0}
      />
    );

    const precio = screen.getByText("Degustación gratis");
    expect(precio).toBeTruthy();

    // Ademas debe aparecer la etiqueta FREE
    const etiqueta = screen.getByText("FREE");
    expect(etiqueta.textContent).toBe("FREE");
  });

  /* --- PRUEBA 4: evento de clic con prop de tipo funcion --- */
  it("ejecuta onAgregar al presionar el botón", () => {
    // Variable que nos dice si la funcion fue llamada y con que datos
    let recibido = null;

    const simularAgregar = (producto) => {
      recibido = producto;
    };

    render(
      <Producto
        nombre="Chocolate 70% cacao"
        imagen="/img/prod-chocolate.jpg"
        precio={5490}
        onAgregar={simularAgregar}
      />
    );

    const boton = screen.getByRole("button", {
      name: "Agregar al carrito"
    });

    fireEvent.click(boton);

    expect(recibido).not.toBeNull();
    expect(recibido.nombre).toBe("Chocolate 70% cacao");
    expect(recibido.precio).toBe(5490);
  });

});
