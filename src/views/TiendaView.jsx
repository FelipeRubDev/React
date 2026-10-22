import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import ProductCard from "../components/ProductCard"
import { listarProductos } from "../data/db"

function TiendaView() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    setProductos(listarProductos())
  }, [])

  return (
    <Container className="py-4">
      <h1 className="mb-4">Productos</h1>

      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <Row className="g-4">
          {productos.map((producto) => (
            <Col md={6} lg={4} key={producto.id}>
              <ProductCard producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default TiendaView