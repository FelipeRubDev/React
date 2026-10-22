import { Alert, Col, Container, Row } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import AdminSidebar from "../../components/AdminSidebar"

function AdminLayout() {
  const usuario = JSON.parse(
    sessionStorage.getItem("usuarioSesion") || "null"
  )

  if (!usuario || usuario.rol !== "admin") {
    return (
      <Container className="py-4">
        <Alert variant="warning">
          Debes iniciar sesión como administrador.{" "}
          <Alert.Link as={Link} to="/login">
            Ir al login
          </Alert.Link>
        </Alert>
      </Container>
    )
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3} lg={2}>
          <AdminSidebar />
        </Col>

        <Col md={9} lg={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

export default AdminLayout