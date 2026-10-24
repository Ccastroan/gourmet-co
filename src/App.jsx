/* ============================================================
   App - Gourmet & Co.
   DSY1104 Desarrollo Fullstack II

   Este es el componente principal. Aca vive el estado del carrito
   y el filtro de categoria, porque son datos que mas de un
   componente necesita.

   Los datos bajan a los hijos como props.
   Los hijos avisan hacia arriba ejecutando las funciones que les paso.
   ============================================================ */

import { useState } from "react";
import { Container, Row, Col, Navbar, Nav, Button, Badge } from "react-bootstrap";

import ListaProductos from "./components/ListaProductos";
import Carrito from "./components/Carrito";
import { obtenerProductos, obtenerCategorias } from "./data/productos";

function App() {

  /* --- ESTADO --- */

  // Lo que el usuario lleva agregado
  const [carrito, setCarrito] = useState([]);

  // Categoria seleccionada. "todas" muestra el catalogo completo
  const [categoria, setCategoria] = useState("todas");

  /* Los productos vienen del archivo de datos.
     Como no cambian mientras la app corre, no hace falta estado. */
  const productos = obtenerProductos();
  const categorias = obtenerCategorias();

  /* --- FUNCIONES QUE MODIFICAN EL ESTADO --- */

  function agregarAlCarrito(producto) {
    // No se hace carrito.push(...) porque React no se enteraria
    // del cambio. Hay que entregarle un arreglo nuevo.
    setCarrito([...carrito, producto]);
  }

  function quitarDelCarrito(indice) {
    const copia = carrito.filter((item, i) => i !== indice);
    setCarrito(copia);
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  /* --- QUE PRODUCTOS SE MUESTRAN --- */

  const productosVisibles =
    categoria === "todas"
      ? productos
      : productos.filter((p) => p.categoria === categoria);

  /* --- LO QUE SE DIBUJA --- */

  return (
    <>
      {/* Barra superior */}
      <Navbar expand="lg" className="barra" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#inicio" className="marca">
            Gourmet <span className="marca__amp">&amp;</span> Co.
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="menu" />

          <Navbar.Collapse id="menu">
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link href="#catalogo">Catálogo</Nav.Link>
              <Nav.Link href="#carrito">
                Mi pedido <Badge bg="light" text="dark">{carrito.length}</Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Bienvenida */}
      <header className="portada" id="inicio">
        <Container>
          <p className="portada__kicker">Selección artesanal chilena</p>
          <h1 className="portada__titulo">
            Delicias artesanales y café de especialidad
          </h1>
          <p className="portada__texto">
            Reunimos a pequeños productores de café en grano, chocolates
            artesanales, quesos madurados y vinos de autor.
          </p>
        </Container>
      </header>

      <Container className="py-5" id="catalogo">
        <Row className="g-4">

          {/* Columna del catalogo */}
          <Col lg={8}>

            {/* Filtros por categoria */}
            <div className="filtros mb-4">
              <Button
                variant={categoria === "todas" ? "dark" : "outline-dark"}
                size="sm"
                className="me-2 mb-2"
                onClick={() => setCategoria("todas")}
              >
                Todas
              </Button>

              {categorias.map((c) => (
                <Button
                  key={c}
                  variant={categoria === c ? "dark" : "outline-dark"}
                  size="sm"
                  className="me-2 mb-2"
                  onClick={() => setCategoria(c)}
                >
                  {c}
                </Button>
              ))}
            </div>

            <ListaProductos
              productos={productosVisibles}
              titulo={categoria === "todas" ? "Todos los productos" : categoria}
              onAgregar={agregarAlCarrito}
            />
          </Col>

          {/* Columna del carrito */}
          <Col lg={4} id="carrito">
            <div className="carrito-fijo">
              <Carrito
                items={carrito}
                onQuitar={quitarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            </div>
          </Col>

        </Row>
      </Container>

      <footer className="pie">
        <Container>
          <p className="mb-1">
            Gourmet &amp; Co. — Av. Italia 1542, Providencia, Santiago
          </p>
          <p className="pie__legal mb-0">
            Proyecto académico DSY1104, Duoc UC. Venta de alcohol prohibida
            a menores de 18 años.
          </p>
        </Container>
      </footer>
    </>
  );
}

export default App;
