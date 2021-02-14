const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

const auth = require('../middleware/auth');

module.exports = function() {
	
	// Agrega nuevos clientes via POST
	router.post('/clientes', clienteController.nuevoCliente);

	// Obtener todos los clientes
	router.get('/clientes', auth, clienteController.mostrarClientes);

	// Obtener cliente por id
	router.get('/clientes/:id', clienteController.mostrarCliente);

	// Actualizar cliente
	router.put('/clientes/:id', clienteController.actualizarCliente);

	// Eliminar cliente
	router.delete('/clientes/:id', clienteController.eliminarCliente);

	/** PRODUCTOS **/

	// Nuevos productos
	router.post('/productos', 
		productosController.cargarImg,
		productosController.nuevoProducto,
	);

	// Muestra todos los productos
	router.get('/productos', productosController.mostrarProductos);

	// Muestra un producto por su ID
	router.get('/productos/:id', productosController.mostrarProductoId);

	// Actualizar producto
	router.put('/productos/:id', 
		productosController.cargarImg,
		productosController.actualizarProductoId
	);

	// Eliminar un producto
	router.delete('/productos/:id', productosController.eliminarProducto);

	/** PEDIDOS **/

	// Nuevos pedidos
	router.post('/pedidos', pedidosController.nuevoPedidos);

	// Muestra todos los pedidos
	router.get('/pedidos', pedidosController.mostrarPedidos);

	// Muestra un pedido por su ID
	router.get('/pedidos/:id', pedidosController.mostrarPedidoId);

	// Actualizar un pedido por su ID
	router.put('/pedidos/:id', pedidosController.actualizarPedidoId);

	// Eliminar un pedido
	router.delete('/pedidos/:id', pedidosController.eliminarPedido);

	// Usuarios
	router.post('/crear-cuenta', usuariosController.registrarUsuario);
	router.post('/iniciar-sesion', usuariosController.autenticarUsuarios);

	return router;
}