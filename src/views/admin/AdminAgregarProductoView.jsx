import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { crearProducto } from "../../data/db"

function AdminAgregarProductoView() {
  const navigate = useNavigate()
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    desc: "",
    img: "",
    stock: 10,
    stockCritico: 3,
  })
  const [errores, setErrores] = useState({})

  function manejarCambio(event) {
    const { name, value } = event.target
    setProducto({ ...producto, [name]: value })
  }

  function validar() {
    const nuevosErrores = {}
    if (producto.nombre.trim().length < 3) nuevosErrores.nombre = "Nombre demasiado corto"
    if (producto.precio === "" || Number(producto.precio) <= 0) nuevosErrores.precio = "Ingresa un precio mayor que cero"
    if (producto.categoria.trim() === "") nuevosErrores.categoria = "Ingresa una categoría"
    if (producto.desc.trim().length < 10) nuevosErrores.desc = "La descripción debe tener al menos 10 caracteres"
    if (Number(producto.stock) < 0) nuevosErrores.stock = "El stock no puede ser negativo"
    if (Number(producto.stockCritico) < 0) nuevosErrores.stockCritico = "El stock crítico no puede ser negativo"
    return nuevosErrores
  }

  function guardar(event) {
    event.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    crearProducto({
      id: "P" + Date.now(),
      nombre: producto.nombre.trim(),
      categoria: producto.categoria.trim(),
      precio: Number(producto.precio),
      precioOferta: null,
      stock: Number(producto.stock),
      stockCritico: Number(producto.stockCritico),
      desc: producto.desc.trim(),
      img: producto.img.trim() || "/img/torta_circ_vainilla.jpg",
    })

    navigate("/admin/productos")
  }

  return (
    <>
      <h1 className="mb-4">Agregar producto</h1>

      <Form onSubmit={guardar}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre" value={producto.nombre} onChange={manejarCambio} isInvalid={!!errores.nombre} />
          <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" name="precio" value={producto.precio} onChange={manejarCambio} isInvalid={!!errores.precio} />
          <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control name="categoria" value={producto.categoria} onChange={manejarCambio} isInvalid={!!errores.categoria} />
          <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} name="desc" value={producto.desc} onChange={manejarCambio} isInvalid={!!errores.desc} />
          <Form.Control.Feedback type="invalid">{errores.desc}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen (ruta o URL)</Form.Label>
          <Form.Control name="img" value={producto.img} onChange={manejarCambio} placeholder="/img/torta_circ_vainilla.jpg" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" name="stock" value={producto.stock} onChange={manejarCambio} isInvalid={!!errores.stock} />
          <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock crítico</Form.Label>
          <Form.Control type="number" name="stockCritico" value={producto.stockCritico} onChange={manejarCambio} isInvalid={!!errores.stockCritico} />
          <Form.Control.Feedback type="invalid">{errores.stockCritico}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Guardar producto</Button>
        <Button as={Link} to="/admin/productos" variant="secondary" className="ms-2">Cancelar</Button>
      </Form>
    </>
  )
}

export default AdminAgregarProductoView