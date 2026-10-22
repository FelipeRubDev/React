import { productosIniciales } from "./productosIniciales"

const PRODUCTOS = "productos"
const USUARIOS = "usuarios"

function leer(clave) {
  const texto = localStorage.getItem(clave)
  if (!texto) return []
  return JSON.parse(texto)
}

function guardar(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos))
}

// La primera vez copia los productos iniciales a localStorage
export function iniciarDatos() {
  if (!localStorage.getItem(PRODUCTOS)) {
    guardar(PRODUCTOS, productosIniciales)
  }
}

//Productos

export function listarProductos() {
  return leer(PRODUCTOS)
}

export function obtenerProducto(id) {
  return listarProductos().find((producto) => producto.id === id)
}

export function crearProducto(producto) {
  const productos = listarProductos()
  productos.push(producto)
  guardar(PRODUCTOS, productos)
  return producto
}

export function actualizarProducto(productoEditado) {
  const productos = listarProductos().map((producto) =>
    producto.id === productoEditado.id ? productoEditado : producto
  )
  guardar(PRODUCTOS, productos)
  return productoEditado
}

export function eliminarProducto(id) {
  const productos = listarProductos().filter((producto) => producto.id !== id)
  guardar(PRODUCTOS, productos)
}

//Usuarios

export function obtenerUsuarioPorEmail(email) {
  return leer(USUARIOS).find((usuario) => usuario.email === email)
}

export function crearUsuario(usuario) {
  const usuarios = leer(USUARIOS)
  usuarios.push(usuario)
  guardar(USUARIOS, usuarios)
  return usuario
}