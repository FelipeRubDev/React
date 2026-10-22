import { useEffect, useState } from "react"
import { Badge, Button, Container, Table } from "react-bootstrap"
import {actualizarProducto, crearProducto, eliminarProducto, iniciarDatos, listarCategorias,
        listarProductos, listarUsuarios,} from "./data/db"

function App() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    iniciarDatos()
    recargar()
  }, [])

  function recargar() {
    setProductos(listarProductos())
    setCategorias(listarCategorias())
    setUsuarios(listarUsuarios())
  }

  function probarCrear() {
    const nuevo = {
      id: "TEST" + Date.now(),
      nombre: "Producto de prueba",
      categoria: "Tortas Cuadradas",
      precio: 9990,
      precioOferta: null,
      stock: 5,
      stockCritico: 2,
      desc: "Producto creado desde el panel de prueba.",
      img: "/img/mousse_choc.jpg",
      destacado: false,
    }

    crearProducto(nuevo)
    recargar()
  }

  function probarStock(id) {
    const producto = productos.find((p) => p.id === id)
    actualizarProducto({ ...producto, stock: producto.stock + 1 })
    recargar()
  }

  function probarEliminar(id) {
    eliminarProducto(id)
    recargar()
  }

  return (
    <Container className="py-4">
      <h1 className="titulo-marca">Panel de prueba B1</h1>

      <p className="text-secondary">
        {productos.length} productos · {categorias.length} categorías ·{" "}
        {usuarios.length} usuarios
      </p>

      <div className="d-flex gap-2 mb-3">
        <Button onClick={probarCrear}>Agregar producto de prueba</Button>
        <Button variant="outline-primary" onClick={recargar}>
          Recargar
        </Button>
      </div>

      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>${producto.precio.toLocaleString("es-CL")}</td>
              <td>
                <Badge bg={producto.stock <= producto.stockCritico ? "danger" : "success"}>
                  {producto.stock}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => probarStock(producto.id)}
                >
                  +1 stock
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => probarEliminar(producto.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default App