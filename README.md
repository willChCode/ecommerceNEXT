# ECOMMERCE

Este proyecto es un ejemplo de una tienda en línea que permite realizar operaciones de CRUD (Crear, Leer, Actualizar y Eliminar) sobre productos, gestionar órdenes de compra, administrar un carrito de compras, aplicar filtros de productos, utilizar el patrón `useReducer` para el manejo del estado, compartir datos a través de un contexto y permitir pagos utilizando PayPal.

## Características

- Gestión de productos:

  - Creación de productos: Permite agregar nuevos productos a la tienda proporcionando detalles como nombre, descripción, precio, etc.
  - Visualización de productos: Muestra una lista de todos los productos disponibles, con opción de ver los detalles completos de cada producto.
  - Actualización de productos: Permite editar y actualizar la información de un producto existente.
  - Eliminación de productos: Permite eliminar un producto de la tienda.

- Gestión de órdenes de compra:

  - Creación de órdenes: Permite a los clientes realizar órdenes de compra seleccionando productos y proporcionando información de envío y pago.
  - Visualización de órdenes: Muestra una lista de todas las órdenes realizadas, con opción de ver los detalles completos de cada orden.

- Carrito de compras:

  - Agregar productos al carrito: Permite a los clientes agregar productos al carrito para su compra posterior.
  - Actualización del carrito: Permite modificar la cantidad de productos en el carrito o eliminar productos.
  - Realizar compra desde el carrito: Permite a los clientes finalizar su compra desde el carrito de compras.

- Filtros de productos:

  - Filtrado por categoría: Permite filtrar los productos por categoría para facilitar la búsqueda.
  - Ordenar por precio: Permite ordenar los productos según su precio, de forma ascendente o descendente.

- Uso de `useReducer`:

  - Utiliza el patrón `useReducer` de React para manejar el estado de la aplicación de manera más estructurada y escalable.

- Contexto:

  - Utiliza el contexto de React para compartir datos relevantes de la aplicación entre componentes sin necesidad de pasar props manualmente.

- Pago por PayPal:
  - Integra la funcionalidad de pago utilizando PayPal para ofrecer una experiencia segura y confiable a los clientes.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
