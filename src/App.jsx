import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import NavbarTienda from "./components/NavbarTienda"
import FooterTienda from "./components/FooterTienda"
import { iniciarDatos } from "./data/db"

import InicioView from "./views/InicioView"
import TiendaView from "./views/TiendaView"
import DetalleProductoView from "./views/DetalleProductoView"
import CategoriasView from "./views/CategoriasView"
import OfertasView from "./views/OfertasView"
import CarritoView from "./views/CarritoView"
import LoginView from "./views/LoginView"
import RegistroView from "./views/RegistroView"
import NosotrosView from "./views/NosotrosView"
import BlogsView from "./views/BlogsView"
import ContactoView from "./views/ContactoView"

import AdminLayout from "./views/admin/AdminLayout"
import AdminProductosView from "./views/admin/AdminProductosView"
import AdminAgregarProductoView from "./views/admin/AdminAgregarProductoView"

function App() {
  const [sesion, setSesion] = useState(
    JSON.parse(sessionStorage.getItem("usuarioSesion"))
  )

  useEffect(() => {
    iniciarDatos()
  }, [])

  return (
    <>
      <NavbarTienda sesion={sesion} setSesion={setSesion} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<InicioView />} />
          <Route path="/productos" element={<TiendaView />} />
          <Route path="/producto/:id" element={<DetalleProductoView />} />
          <Route path="/categorias" element={<CategoriasView />} />
          <Route path="/ofertas" element={<OfertasView />} />
          <Route path="/carrito" element={<CarritoView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/registro" element={<RegistroView />} />
          <Route path="/nosotros" element={<NosotrosView />} />
          <Route path="/blogs" element={<BlogsView />} />
          <Route path="/contacto" element={<ContactoView />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="productos" element={<AdminProductosView />} />
            <Route
              path="productos/nuevo"
              element={<AdminAgregarProductoView />}
            />
          </Route>
        </Routes>
      </main>

      <FooterTienda />
    </>
  )
}

export default App