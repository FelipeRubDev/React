import { productosIniciales } from "./productos"
import { categoriasIniciales } from "./categorias"
import { usuariosIniciales } from "./usuarios"

const PRODUCTOS = "productos"
const CATEGORIAS = "categorias"
const USUARIOS = "usuarios"
const PEDIDOS = "pedidos"

// Leer lista guardada
function leer(clave) {
  const texto = localStorage.getItem(clave)
  if (!texto) return []
  return JSON.parse(texto)
}

// Guarda una lista
function guardar(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos))
}

// Copia los datos iniciales en el local storage
export function iniciarDatos() {
  if (!localStorage.getItem(PRODUCTOS)) guardar(PRODUCTOS, productosIniciales)
  if (!localStorage.getItem(CATEGORIAS)) guardar(CATEGORIAS, categoriasIniciales)
  if (!localStorage.getItem(USUARIOS)) guardar(USUARIOS, usuariosIniciales)
  if (!localStorage.getItem(PEDIDOS)) guardar(PEDIDOS, [])
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

//Categorías

export function listarCategorias() {
  return leer(CATEGORIAS)
}

export function obtenerCategoria(id) {
  return listarCategorias().find((categoria) => categoria.id === id)
}

export function crearCategoria(categoria) {
  const categorias = listarCategorias()
  categorias.push(categoria)
  guardar(CATEGORIAS, categorias)
  return categoria
}

export function actualizarCategoria(categoriaEditada) {
  const categorias = listarCategorias().map((categoria) =>
    categoria.id === categoriaEditada.id ? categoriaEditada : categoria
  )
  guardar(CATEGORIAS, categorias)
  return categoriaEditada
}

export function eliminarCategoria(id) {
  const categorias = listarCategorias().filter((categoria) => categoria.id !== id)
  guardar(CATEGORIAS, categorias)
}

//Usuarios

export function listarUsuarios() {
  return leer(USUARIOS)
}

export function obtenerUsuarioPorEmail(email) {
  return listarUsuarios().find((usuario) => usuario.email === email)
}

export function crearUsuario(usuario) {
  const usuarios = listarUsuarios()
  usuarios.push(usuario)
  guardar(USUARIOS, usuarios)
  return usuario
}

export function actualizarUsuario(usuarioEditado) {
  const usuarios = listarUsuarios().map((usuario) =>
    usuario.id === usuarioEditado.id ? usuarioEditado : usuario
  )
  guardar(USUARIOS, usuarios)
  return usuarioEditado
}

export function eliminarUsuario(id) {
  const usuarios = listarUsuarios().filter((usuario) => usuario.id !== id)
  guardar(USUARIOS, usuarios)
}

//Pedidos

export function listarPedidos() {
  return leer(PEDIDOS)
}

export function obtenerPedido(id) {
  return listarPedidos().find((pedido) => pedido.id === id)
}

export function crearPedido(pedido) {
  const pedidos = listarPedidos()
  pedidos.push(pedido)
  guardar(PEDIDOS, pedidos)
  return pedido
}

export function actualizarPedido(pedidoEditado) {
  const pedidos = listarPedidos().map((pedido) =>
    pedido.id === pedidoEditado.id ? pedidoEditado : pedido
  )
  guardar(PEDIDOS, pedidos)
  return pedidoEditado
}