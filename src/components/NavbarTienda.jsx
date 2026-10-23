import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

function NavbarTienda({ sesion, setSesion, carrito }) {

const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0)

  function cerrarSesion() {
    sessionStorage.removeItem("usuarioSesion")
    setSesion(null)
  }

  return (
    <Navbar expand="lg" className="navbar-tienda">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Pastelería 1000 Sabores
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">Carrito{totalItems > 0 && 
            (<Badge bg="danger" pill className="ms-1">{totalItems}</Badge>)}</Nav.Link>

            {sesion ? (
              <>
                <Navbar.Text className="ms-lg-3">
                  Hola, {sesion.nombre}
                </Navbar.Text>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Ingresar</Nav.Link>
                <Nav.Link as={NavLink} to="/registro">Crear cuenta</Nav.Link>
              </>
            )}

            <Nav.Link as={NavLink} to="/admin/productos">
              Administración
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarTienda