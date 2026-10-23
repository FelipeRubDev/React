import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { actualizarProducto, eliminarProducto, listarProductos } from "../../data/db"

function AdminProductosView() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    setProductos(listarProductos())
  }, [])

  function reabastecer(producto) {
    actualizarProducto({ ...producto, stock: producto.stock + 1 })
    setProductos(listarProductos())
  }

  function eliminar(id) {
    if (!window.confirm("¿Deseas eliminar este producto?")) return
    eliminarProducto(id)
    setProductos(listarProductos())
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Productos</h1>
        <Button as={Link} to="/admin/productos/nuevo">Agregar producto</Button>
      </div>

      <Table responsive bordered hover>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>${producto.precio.toLocaleString("es-CL")}</td>
              <td>{producto.stock}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2" onClick={() => reabastecer(producto)}>+ Stock</Button>
                <Button size="sm" variant="danger" onClick={() => eliminar(producto.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default AdminProductosView