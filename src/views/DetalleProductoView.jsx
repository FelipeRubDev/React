import { useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { obtenerProducto } from "../data/db"

function DetalleProductoView() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    setProducto(obtenerProducto(id))
  }, [id])

  if (!producto) {
    return (
      <Container className="py-4">
        <h2>Producto no encontrado</h2>
        <Button as={Link} to="/productos">
          Volver a la tienda
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Img
          src={producto.img}
          alt={producto.nombre}
          className="detalle-imagen"
        />

        <Card.Body>
          <Card.Title as="h1">{producto.nombre}</Card.Title>

          <Card.Text>
            <strong>Categoría:</strong> {producto.categoria}
          </Card.Text>

          <Card.Text>{producto.desc}</Card.Text>

          {producto.precioOferta ? (
            <>
              <Card.Text className="mb-0 text-muted">
                <s>${producto.precio.toLocaleString("es-CL")}</s>
              </Card.Text>
              <Card.Text className="precio">
                ${producto.precioOferta.toLocaleString("es-CL")}
              </Card.Text>
            </>
          ) : (
            <Card.Text className="precio">
              ${producto.precio.toLocaleString("es-CL")}
            </Card.Text>
          )}

          <Button as={Link} to="/productos" variant="secondary">
            Volver
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default DetalleProductoView