import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import ProductCard from "../components/ProductCard"
import { listarProductos } from "../data/db"

function OfertasView() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    setProductos(listarProductos())
  }, [])

  const ofertas = productos.filter((producto) => producto.precioOferta)

  return (
    <Container className="py-4">
      <h1 className="mb-4">Ofertas</h1>

      {ofertas.length === 0 ? (
        <p>No hay ofertas disponibles.</p>
      ) : (
        <Row className="g-4">
          {ofertas.map((producto) => (
            <Col md={6} lg={4} key={producto.id}>
              <ProductCard producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default OfertasView