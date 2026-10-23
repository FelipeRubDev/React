import { useState } from "react"
import { Alert, Button, Container, Form } from "react-bootstrap"
import { crearUsuario, obtenerUsuarioPorEmail } from "../data/db"

function RegistroView() {
  const [formulario, setFormulario] = useState({ nombre: "", email: "", password: "", confirmar: "" })
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState("")

  function manejarCambio(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function registrar(event) {
    event.preventDefault()
    const nuevosErrores = {}

    if (formulario.nombre.trim().length < 3) nuevosErrores.nombre = "Ingresa al menos 3 caracteres"
    if (!formulario.email.includes("@")) nuevosErrores.email = "Ingresa un correo válido"
    if (formulario.password.length < 6) nuevosErrores.password = "La contraseña debe tener 6 caracteres"
    if (formulario.password !== formulario.confirmar) nuevosErrores.confirmar = "Las contraseñas no coinciden"
    if (obtenerUsuarioPorEmail(formulario.email)) nuevosErrores.email = "Este correo ya está registrado"

    setErrores(nuevosErrores)
    setMensaje("")
    if (Object.keys(nuevosErrores).length > 0) return

    crearUsuario({
      id: Date.now(),
      nombre: formulario.nombre.trim(),
      email: formulario.email.trim(),
      password: formulario.password,
      rol: "cliente",
    })

    setMensaje("Usuario registrado correctamente")
    setFormulario({ nombre: "", email: "", password: "", confirmar: "" })
  }

  return (
    <Container className="py-4" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4">Registro</h1>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}

      <Form onSubmit={registrar}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre" value={formulario.nombre} onChange={manejarCambio} isInvalid={!!errores.nombre} />
          <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" name="email" value={formulario.email} onChange={manejarCambio} isInvalid={!!errores.email} />
          <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" value={formulario.password} onChange={manejarCambio} isInvalid={!!errores.password} />
          <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control type="password" name="confirmar" value={formulario.confirmar} onChange={manejarCambio} isInvalid={!!errores.confirmar} />
          <Form.Control.Feedback type="invalid">{errores.confirmar}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Registrarme</Button>
      </Form>
    </Container>
  )
}

export default RegistroView