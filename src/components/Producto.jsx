/* ============================================================
   COMPONENTE: Producto
   Gourmet & Co. - DSY1104 Desarrollo Fullstack II

   Muestra un producto del catalogo como tarjeta.

   Propiedades (props) que recibe:
     - nombre      (string)  nombre del producto
     - imagen      (string)  ruta de la foto
     - precio      (number)  valor en pesos; 0 significa degustacion gratis
     - categoria   (string)  opcional, se muestra sobre el nombre
     - descripcion (string)  opcional, texto breve
     - disponible  (boolean) opcional, por defecto true
     - onAgregar   (function) opcional, se ejecuta al presionar el boton

   Regla de negocio del caso: un producto con precio 0 corresponde a
   una degustacion sin costo y se muestra de forma distinta.
   ============================================================ */

import { Card, Button, Badge } from "react-bootstrap";

/* Da formato al precio segun la regla de negocio.
   Se exporta aparte para poder probarla de forma aislada. */
export function formatearPrecio(precio) {
  if (precio === 0) {
    return "Degustación gratis";
  }

  const tieneDecimales = precio % 1 !== 0;

  return "$" + precio.toLocaleString("es-CL", {
    minimumFractionDigits: tieneDecimales ? 2 : 0,
    maximumFractionDigits: tieneDecimales ? 2 : 0
  });
}

function Producto({
  nombre,
  imagen,
  precio,
  categoria,
  descripcion,
  disponible = true,
  onAgregar
}) {
  const esGratis = precio === 0;

  return (
    <Card className="producto h-100">
      {imagen && (
        <Card.Img variant="top" src={imagen} alt={nombre} className="producto__imagen" />
      )}

      <Card.Body className="d-flex flex-column">
        {categoria && (
          <p className="producto__categoria mb-1">{categoria}</p>
        )}

        {esGratis && (
          <Badge bg="danger" className="producto__badge align-self-start mb-2">
            FREE
          </Badge>
        )}

        <Card.Title as="h3" className="producto__nombre">
          {nombre}
        </Card.Title>

        {descripcion && (
          <Card.Text className="producto__descripcion">{descripcion}</Card.Text>
        )}

        <p className={esGratis ? "producto__precio producto__precio--free" : "producto__precio"}>
          {formatearPrecio(precio)}
        </p>

        {!disponible && (
          <p className="producto__aviso" role="alert">
            Producto sin stock por ahora
          </p>
        )}

        <Button
          variant="primary"
          className="producto__boton mt-auto"
          disabled={!disponible}
          onClick={() => onAgregar && onAgregar({ nombre, precio })}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Producto;
