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
import CheckoutView from "./views/CheckoutView"

function App() {
  const [sesion, setSesion] = useState(
    JSON.parse(sessionStorage.getItem("usuarioSesion"))
  )

  const [carrito, setCarrito] = useState(
  JSON.parse(localStorage.getItem("carrito") || "[]")
)

    useEffect(() => {iniciarDatos()}, [])

    useEffect(() => {localStorage.setItem("carrito", JSON.stringify(carrito))}, [carrito])

function agregarAlCarrito(producto) {
  const existe = carrito.find((item) => item.id === producto.id)

  if (existe) {
    setCarrito(carrito.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 }: item))
    return
  }

  setCarrito([
    ...carrito,
    {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precioOferta || producto.precio,
      img: producto.img,
      cantidad: 1,
    },
  ])
}

function vaciarCarrito() {
  setCarrito([])
}

function cambiarCantidad(id, cambio) {
  setCarrito(
    carrito
      .map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + cambio }
          : item
      )
      .filter((item) => item.cantidad > 0)
  )
}

function eliminarDelCarrito(id) {
  setCarrito(carrito.filter((item) => item.id !== id))
}

  return (
    <>
      <NavbarTienda sesion={sesion} setSesion={setSesion} carrito={carrito}/>

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<InicioView />} />
          <Route path="/productos" element={<TiendaView />} />
          <Route path="/producto/:id" element={<DetalleProductoView agregarAlCarrito={agregarAlCarrito} />}/>
          <Route path="/categorias" element={<CategoriasView />} />
          <Route path="/ofertas" element={<OfertasView />} />
          <Route path="/carrito" element={<CarritoView carrito={carrito} cambiarCantidad={cambiarCantidad} eliminarDelCarrito={eliminarDelCarrito} />} />
          <Route path="/checkout" element={<CheckoutView carrito={carrito} sesion={sesion} vaciarCarrito={vaciarCarrito}/>}/>
          <Route path="/login" element={<LoginView setSesion={setSesion} />} />
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