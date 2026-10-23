import { Card, Col, Container, Row } from "react-bootstrap"

function ContactoView() {
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h1>Contacto</h1>
              <p className="text-secondary">Escríbenos o visítanos.</p>
              <p className="mb-1"><strong>Correo:</strong> contacto@1000sabores.cl</p>
              <p className="mb-1"><strong>Teléfono:</strong> +56 9 1234 5678</p>
              <p className="mb-0"><strong>Horario:</strong> lunes a domingo, 10:00 a 20:00</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ContactoView