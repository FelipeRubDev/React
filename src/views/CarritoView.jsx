import { Button, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"

function CarritoView({ carrito, cambiarCantidad, eliminarDelCarrito }) {
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  if (carrito.length === 0) {
    return (
      <Container className="py-4">
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Button as={Link} to="/productos">Ver productos</Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Carrito</h1>

      <Table responsive className="align-middle">
        <thead>
          <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td><img src={item.img} alt={item.nombre} className="img-carrito rounded me-2" />{item.nombre}</td>
              <td>${item.precio.toLocaleString("es-CL")}</td>
              <td>
                <Button size="sm" variant="outline-secondary" onClick={() => cambiarCantidad(item.id, -1)}>-</Button>
                <span className="mx-2">{item.cantidad}</span>
                <Button size="sm" variant="outline-secondary" onClick={() => cambiarCantidad(item.id, 1)}>+</Button>
              </td>
              <td className="precio">${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
              <td><Button size="sm" variant="link" className="text-danger" onClick={() => eliminarDelCarrito(item.id)}>Eliminar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex flex-wrap justify-content-end align-items-center gap-3">
        <h2 className="h4 mb-0">Total: ${total.toLocaleString("es-CL")}</h2>
        <Button as={Link} to="/checkout">Comprar ahora</Button>
      </div>
    </Container>
  )
}

export default CarritoView