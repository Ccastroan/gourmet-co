/* ============================================================
   COMPONENTE: ListaProductos
   Gourmet & Co. - DSY1104

   Recibe un arreglo de productos y dibuja una tarjeta por cada
   uno usando el componente Producto.

   Props:
     - productos  (array)    lista a mostrar
     - titulo     (string)   opcional, encabezado de la seccion
     - onAgregar  (function) se le pasa a cada Producto
   ============================================================ */

import { Row, Col } from "react-bootstrap";
import Producto from "./Producto";

function ListaProductos({ productos = [], titulo, onAgregar }) {

  // Renderizado condicional: si no hay productos, no dibujamos la grilla
  if (productos.length === 0) {
    return (
      <section className="lista-productos">
        {titulo && <h2 className="lista-productos__titulo">{titulo}</h2>}
        <p className="lista-productos__vacio">
          No hay productos disponibles en esta categoría.
        </p>
      </section>
    );
  }

  return (
    <section className="lista-productos">
      {titulo && <h2 className="lista-productos__titulo">{titulo}</h2>}

      <Row className="g-4">
        {productos.map((p) => (
          <Col xs={12} sm={6} lg={3} key={p.id}>
            <Producto
              nombre={p.nombre}
              imagen={p.imagen}
              precio={p.precio}
              categoria={p.categoria}
              descripcion={p.descripcion}
              disponible={p.disponible}
              onAgregar={onAgregar}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default ListaProductos;
