const Pedidos = require('../models/Pedidos');

exports.nuevoPedidos = async (req, res, next) => {

	const Pedido = new Pedidos(req.body);

	try {

		await Pedido.save();
		res.json({
			mensaje: 'Se agrego un nuevo pedido',
		});

	} catch(error) {

		console.log(error);
		next();
	}
}

exports.mostrarPedidos = async (req, res, next) => {

	try {

		const pedidos = await Pedidos.find().populate('cliente').populate({
			path: 'pedido.producto',
			model: 'Productos',
		});

		res.json({
			pedidos,
		});

	} catch(error) {

		console.log(error);
		next();
	}
}

exports.mostrarPedidoId = async (req, res, next) => {

	try {

		const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
			path: 'pedido.producto',
			model: 'Productos',
		});

		res.json({
			pedido,
		});

	} catch(error) {

		console.log(error);
		next();
	}
}

exports.actualizarPedidoId = async (req, res, next) => {

	try {

		const pedido = await Pedidos.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

		res.json({
			pedido,
		});

	} catch(error) {

		console.log(error);
		next();
	}
}

exports.eliminarPedido = async (req, res, next) => {

	try {

		const pedido = await Pedidos.findOneAndDelete(req.params.id);

		res.json({
			mensaje: 'El pedido se a eliminado correctamente',
		});

	} catch(error) {

		console.log(error);
		next();
	}
}