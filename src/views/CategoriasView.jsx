import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import ProductCard from "../components/ProductCard"
import { listarProductos } from "../data/db"

function CategoriasView() {
  const [productos, setProductos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")

  useEffect(() => {
    setProductos(listarProductos())
  }, [])

  const categorias = [
    ...new Set(productos.map((producto) => producto.categoria)),
  ]

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      )
    : productos

  return (
    <Container className="py-4">
      <h1 className="mb-4">Categorías</h1>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <Button
          variant={categoriaSeleccionada === "" ? "primary" : "outline-primary"}
          onClick={() => setCategoriaSeleccionada("")}
        >
          Todas
        </Button>

        {categorias.map((categoria) => (
          <Button
            key={categoria}
            variant={
              categoriaSeleccionada === categoria
                ? "primary"
                : "outline-primary"
            }
            onClick={() => setCategoriaSeleccionada(categoria)}
          >
            {categoria}
          </Button>
        ))}
      </div>

      <h2 className="h4 mb-3">
        {categoriaSeleccionada || "Todos los productos"}
      </h2>

      <Row className="g-4">
        {productosFiltrados.map((producto) => (
          <Col md={6} lg={4} key={producto.id}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default CategoriasView