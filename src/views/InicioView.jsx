import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

function InicioView() {
  return (
    <Container className="py-5 text-center">
      <h1>50 Años de Dulzura y Tradición</h1>

      <p className="lead">
        Celebra con nosotros la tradición pastelera de Chile. Desde la torta
        más grande del récord Guinness en 1995 hasta las delicias de hoy.
      </p>

      <img
        src="/img/torta_cuadrada_choc.jpg"
        alt="Torta de chocolate"
        className="img-fluid rounded shadow mb-4"
        style={{ maxWidth: "500px" }}
      />

      <div className="d-flex justify-content-center gap-3">
        <Button as={Link} to="/productos" size="lg">
          Ver catálogo
        </Button>
        <Button as={Link} to="/contacto" variant="outline-primary" size="lg">
          Contacto
        </Button>
      </div>
    </Container>
  )
}

export default InicioView