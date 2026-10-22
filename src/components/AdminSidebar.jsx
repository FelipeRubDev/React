import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h4>Administración</h4>

      <Nav className="flex-column">
        <Nav.Link as={NavLink} to="/admin/productos">
          Listar productos
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/productos/nuevo">
          Agregar producto
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default AdminSidebar