import { Card, Col, Container, Row } from "react-bootstrap"

function BlogsView() {
  return (
    <Container className="py-4">
      <h1 className="text-center">Noticias y Casos Curiosos</h1>
      <p className="text-center text-secondary mb-4">Conoce la historia y el impacto de nuestra pastelería</p>

      <Row className="g-4 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="h-100 shadow-sm">
            <Card.Img src="/img/blog_1.jpg" alt="Récord Guinness 1995" className="imagen-producto" />
            <Card.Body>
              <Card.Title>Caso Curioso #1: La Torta Más Grande</Card.Title>
              <Card.Text>Descubre cómo participamos en el récord Guinness de 1995 creando la torta más grande del mundo.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={5}>
          <Card className="h-100 shadow-sm">
            <Card.Img src="/img/blog_2.jpg" alt="Estudiantes Duoc UC" className="imagen-producto" />
            <Card.Body>
              <Card.Title>Caso Curioso #2: Talento Gastronómico</Card.Title>
              <Card.Text>Conoce las recetas innovadoras diseñadas por los estudiantes de gastronomía de Duoc UC.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BlogsView