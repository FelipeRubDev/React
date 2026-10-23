import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import CarritoView from "../views/CarritoView"
import LoginView from "../views/LoginView"
import { crearProducto, eliminarProducto, listarProductos } from "../data/db"

const producto = {
  id: "TC001",
  nombre: "Torta Cuadrada de Chocolate",
  categoria: "Tortas Cuadradas",
  precio: 45000,
  precioOferta: 38000,
  stock: 8,
  stockCritico: 3,
  desc: "Torta de chocolate",
  img: "/img/torta_cuadrada_choc.jpg",
}

describe("ProductCard", () => {
  it("muestra nombre, categoría y precio de oferta", () => {
    render(
      <MemoryRouter>
        <ProductCard producto={producto} />
      </MemoryRouter>
    )

    expect(screen.getByText("Torta Cuadrada de Chocolate")).toBeTruthy()
    expect(screen.getByText("Tortas Cuadradas")).toBeTruthy()
    expect(screen.getByText("$38.000")).toBeTruthy()
  })

  it("muestra stock crítico cuando queda poco", () => {
    const critico = { ...producto, precioOferta: null, stock: 2, stockCritico: 2 }
    const { container } = render(
      <MemoryRouter>
        <ProductCard producto={critico} />
      </MemoryRouter>
    )

    expect(container.querySelector(".badge").className).toContain("bg-danger")
    expect(container.querySelector(".badge").textContent).toContain("Stock: 2")
  })
})

describe("CarritoView", () => {
  it("suma el total y el botón + llama a cambiarCantidad", () => {
    const cambiarCantidad = jasmine.createSpy("cambiarCantidad")
    const item = { id: "TC001", nombre: "Torta", precio: 38000, cantidad: 2, img: "/img/torta.jpg" }

    render(
      <MemoryRouter>
        <CarritoView carrito={[item]} cambiarCantidad={cambiarCantidad} eliminarDelCarrito={jasmine.createSpy()} />
      </MemoryRouter>
    )

    expect(screen.getByText("Total: $76.000")).toBeTruthy()
    fireEvent.click(screen.getByText("+"))
    expect(cambiarCantidad).toHaveBeenCalledWith("TC001", 1)
  })
})

describe("LoginView", () => {
  it("actualiza el correo cuando el usuario escribe", () => {
    render(
      <MemoryRouter>
        <LoginView setSesion={jasmine.createSpy()} />
      </MemoryRouter>
    )

    const correo = screen.getByRole("textbox")
    fireEvent.change(correo, { target: { value: "cliente@gmail.com" } })
    expect(correo.value).toBe("cliente@gmail.com")
  })
})

describe("db", () => {
  it("crea y elimina un producto", () => {
    crearProducto({ ...producto, id: "TEST1" })
    expect(listarProductos().length).toBe(1)

    eliminarProducto("TEST1")
    expect(listarProductos().length).toBe(0)
  })
})