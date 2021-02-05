const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req, res, next) => {

	const Cliente = new Clientes(req.body);

	try {

		await Cliente.save();
		res.json({
			mensaje: 'Se agrego un nuevo cliente',
		});

	} catch(error) {

		console.log(error);
		next();
	}
}

exports.mostrarClientes = async (req, res, next) => {

	const clientes = await Clientes.find();

	try {

		res.status(200).json({
			ok: true,
			data: clientes,
		});

	} catch(error) {

		console.log(error);
		next();
	}
}

exports.mostrarCliente = async (req, res, next) => {

	const cliente = await Clientes.findById(req.params.id);

	try {

		res.status(200).json({
			ok: true,
			cliente,
		});

		next();

	} catch(error) {

		console.log(error);
		next();
	}
}

exports.actualizarCliente = async (req, res, next) => {

	try {
		const cliente = await Clientes.findOneAndUpdate({ _id: req.params.id }, 
			req.body, { new: true });


		res.status(200).json({
			ok: true,
			cliente,
		});

		next();

	} catch(error) {

		console.log(error);
		next();
	}
}

exports.eliminarCliente = async (req, res, next) => {

	try {
		
		await Clientes.findOneAndDelete({ _id: req.params.id });

		res.status(200).json({
			ok: true,
			mensaje: 'El cliente se a eliminado',
		});

		next();

	} catch(error) {

		console.log(error);
		next();
	}
}