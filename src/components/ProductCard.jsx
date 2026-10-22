import { Badge, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

function ProductCard({ producto }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={producto.img}
        alt={producto.nombre}
        className="imagen-producto"
      />

      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>

        <Card.Text className="text-muted">
          {producto.categoria}
        </Card.Text>

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

        <div className="mt-2">
          <Badge
            bg={producto.stock <= producto.stockCritico ? "danger" : "success"}
          >
            Stock: {producto.stock}
          </Badge>
        </div>

        <Button
          as={Link}
          to={`/producto/${producto.id}`}
          variant="primary"
          className="mt-3"
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard