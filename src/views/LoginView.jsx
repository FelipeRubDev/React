import { useState } from "react"
import { Alert, Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { obtenerUsuarioPorEmail } from "../data/db"

function LoginView({ setSesion }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function iniciarSesion(event) {
    event.preventDefault()
    setError("")

    if (!email.includes("@")) {
      setError("Ingresa un correo válido")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    const usuarioRegistrado = obtenerUsuarioPorEmail(email)
    const esAdmin = email === "admin@tienda.cl" && password === "123456"

    if (!esAdmin && (!usuarioRegistrado || usuarioRegistrado.password !== password)) {
      setError("Correo o contraseña incorrectos")
      return
    }

    const usuario = esAdmin
      ? { nombre: "Administrador", email: "admin@tienda.cl", rol: "admin" }
      : usuarioRegistrado

    sessionStorage.setItem("usuarioSesion", JSON.stringify(usuario))
    setSesion(usuario)
    navigate(usuario.rol === "admin" ? "/admin/productos" : "/")
  }

  return (
    <Container className="py-4" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4">Ingresar</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={iniciarSesion}>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>
        <Button type="submit">Iniciar sesión</Button>
      </Form>

      <Alert variant="secondary" className="mt-4">
        Admin de prueba: admin@tienda.cl / 123456
      </Alert>
    </Container>
  )
}

export default LoginView