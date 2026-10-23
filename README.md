**Pastelería 1000 Sabores**

---

## Descripción del Proyecto

Sitio web de una pastelería migrado de HTML a React. Incluye catálogo dinámico, carrito persistente, checkout, validación de formularios y un panel de administración con control de accesos por rol.

---

## Características Principales

### Módulo Cliente (Público)
* **Catálogo Dinámico:** 16 productos en 8 categorías.
* **Detalle de Producto:** cada ficha se abre con el id en la URL, por ejemplo `/producto/TC001`.
* **Categorías y Ofertas:** filtros por categoría y vista exclusiva de productos con precio de oferta.
* **Carrito de Compra Persistente:** agregar, cambiar cantidad, eliminar y calcular el total en pesos. Se mantiene al recargar.
* **Checkout:** formulario validado, creación del pedido y mensaje de compra exitosa o fallida.
* **Registro e Inicio de Sesión:** usuarios guardados en el navegador y sesión activa hasta cerrar el navegador.
* **Validación de Formularios:** nombre, correo con `@`, contraseñas coincidentes y dirección de despacho obligatoria.

### Módulo de Administración
* **Control de Accesos:** solo el rol Administrador puede entrar al panel.
* **Alerta de Stock Crítico:** indicador rojo cuando el stock es igual o menor al umbral configurado.
* **Gestor de Inventario:** reabastecer stock, eliminar productos y agregar productos nuevos con validación.

---

## Tecnologías Utilizadas

* **React 19**
* **Vite**
* **React Bootstrap**
* **React Router**
* **LocalStorage y SessionStorage**
* **Jasmine y Karma**

---

## Cuentas de Prueba

El administrador está fijo en el código. Los clientes se crean desde el registro.

* `admin@tienda.cl` / `123456` entra como Administrador.
* Cualquier correo registrado entra como Cliente, con la contraseña elegida al registrarse.

---

## Instalación y Ejecución

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173/`.

---

## Pruebas

```bash
npm test
```

Ejecuta las pruebas unitarias con Jasmine y Karma, y genera el reporte de cobertura en `coverage/`.

```bash
npm run build
```

Genera la versión de producción en `dist/`.
