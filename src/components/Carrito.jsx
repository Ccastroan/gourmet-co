/* ============================================================
   COMPONENTE: Carrito
   Gourmet & Co. - DSY1104

   Muestra los productos agregados y el total a pagar.

   Props:
     - items      (array)    productos agregados
     - onQuitar   (function) se ejecuta al quitar un producto
     - onVaciar   (function) se ejecuta al vaciar el carrito

   Los productos con precio 0 (degustaciones) aparecen en la lista
   pero no suman al total.
   ============================================================ */

import { Card, Button, ListGroup, Badge } from "react-bootstrap";
import { formatearPrecio } from "./Producto";

/* Suma los precios de los items.
   Se exporta aparte para poder probarla sin dibujar nada. */
export function calcularTotal(items = []) {
  return items.reduce((suma, item) => suma + item.precio, 0);
}

/* Cuenta cuantos items son degustacion gratis */
export function contarGratis(items = []) {
  return items.filter((item) => item.precio === 0).length;
}

/* El total siempre se muestra como monto, incluso si da 0.
   No usamos formatearPrecio aqui porque esa funcion convierte
   el 0 en "Degustacion gratis", que no corresponde para un total. */
export function formatearTotal(monto) {
  const tieneDecimales = monto % 1 !== 0;

  return "$" + monto.toLocaleString("es-CL", {
    minimumFractionDigits: tieneDecimales ? 2 : 0,
    maximumFractionDigits: tieneDecimales ? 2 : 0
  });
}

function Carrito({ items = [], onQuitar, onVaciar }) {
  const total = calcularTotal(items);
  const gratis = contarGratis(items);

  return (
    <Card className="carrito">
      <Card.Header as="h2" className="carrito__titulo">
        Mi pedido{" "}
        <Badge bg="secondary" className="carrito__contador">
          {items.length}
        </Badge>
      </Card.Header>

      {items.length === 0 ? (
        <Card.Body>
          <p className="carrito__vacio">Tu carrito está vacío</p>
        </Card.Body>
      ) : (
        <>
          <ListGroup variant="flush">
            {items.map((item, indice) => (
              <ListGroup.Item
                key={indice}
                className="carrito__item d-flex justify-content-between align-items-center"
              >
                <span className="carrito__nombre">{item.nombre}</span>
                <span className="carrito__precio">
                  {formatearPrecio(item.precio)}
                </span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onQuitar && onQuitar(indice)}
                  aria-label={"Quitar " + item.nombre}
                >
                  Quitar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Card.Body>
            {gratis > 0 && (
              <p className="carrito__aviso">
                Incluye {gratis} degustación(es) sin costo
              </p>
            )}

            <p className="carrito__total">
              Total: <strong>{formatearTotal(total)}</strong>
            </p>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onVaciar && onVaciar()}
            >
              Vaciar carrito
            </Button>
          </Card.Body>
        </>
      )}
    </Card>
  );
}

export default Carrito;
