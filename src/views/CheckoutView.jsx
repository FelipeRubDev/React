import { useState } from "react"
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { crearPedido } from "../data/db"

function CheckoutView({ carrito, sesion, vaciarCarrito }) {
  const [formulario, setFormulario] = useState({
    nombre: sesion ? sesion.nombre : "",
    email: sesion ? sesion.email || "" : "",
    direccion: "",
    entrega: "Despacho a domicilio",
  })
  const [errores, setErrores] = useState({})
  const [pagoFallido, setPagoFallido] = useState(false)
  const [resultado, setResultado] = useState("")
  const [pedido, setPedido] = useState(null)
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  function manejarCambio(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function validar() {
    const nuevosErrores = {}
    if (formulario.nombre.trim().length < 3) nuevosErrores.nombre = "Ingresa tu nombre"
    if (!formulario.email.includes("@")) nuevosErrores.email = "Ingresa un correo válido"
    if (formulario.direccion.trim().length < 5) nuevosErrores.direccion = "Ingresa tu dirección"
    return nuevosErrores
  }

  function pagar(event) {
    event.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    if (pagoFallido) {
      setResultado("error")
      return
    }

    const nuevoPedido = {
      id: "PED" + Date.now(),
      nombre: formulario.nombre,
      email: formulario.email,
      direccion: formulario.direccion,
      entrega: formulario.entrega,
      items: carrito,
      total: total,
    }

    crearPedido(nuevoPedido)
    setPedido(nuevoPedido)
    vaciarCarrito()
    setResultado("exito")
  }

  if (resultado === "exito") {
    return (
      <Container className="py-4">
        <Alert variant="success">
          <Alert.Heading>Compra realizada</Alert.Heading>
          <p className="mb-0">Pedido {pedido.id} por ${pedido.total.toLocaleString("es-CL")}.</p>
        </Alert>
        <Button as={Link} to="/productos">Volver a la tienda</Button>
      </Container>
    )
  }

  if (carrito.length === 0) {
    return (
      <Container className="py-4">
        <h1>Checkout</h1>
        <p>Tu carrito está vacío.</p>
        <Button as={Link} to="/productos">Ver productos</Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Checkout</h1>

      {resultado === "error" && (
        <Alert variant="danger">No se pudo realizar el pago. Inténtalo otra vez.</Alert>
      )}

      <Row className="justify-content-center">
        <Col lg={8}>
          <Form onSubmit={pagar}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control name="nombre" value={formulario.nombre} onChange={manejarCambio} isInvalid={!!errores.nombre} />
                  <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" name="email" value={formulario.email} onChange={manejarCambio} isInvalid={!!errores.email} />
                  <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control name="direccion" value={formulario.direccion} onChange={manejarCambio} isInvalid={!!errores.direccion} />
              <Form.Control.Feedback type="invalid">{errores.direccion}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Entrega</Form.Label>
              <Form.Select name="entrega" value={formulario.entrega} onChange={manejarCambio}>
                <option>Despacho a domicilio</option>
                <option>Retiro en tienda</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Simular pago rechazado (solo para la prueba)" checked={pagoFallido} onChange={(event) => setPagoFallido(event.target.checked)} />
            </Form.Group>

            <Button type="submit" size="lg">Pagar ahora ${total.toLocaleString("es-CL")}</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CheckoutView