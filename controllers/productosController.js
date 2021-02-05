const Productos = require('../models/Productos');

exports.cargarImg = (req, res, next) => {

	if (!req.files) return next();

	const archivo =  req.files.imagen;
	const extensionesPermitidas = ['png', 'jpg'];
	const tipoExtension = archivo.name.split('.')[1];
	const nombreImg = archivo.name.split('.')[0];

	if (!extensionesPermitidas.includes(tipoExtension)) {

		return res.status(402).json({
			mensaje: `Extension ${tipoExtension}, no permitida.`,
			extensiones: extensionesPermitidas.join(', '),
		});
	}

	const path = `uploads/${nombreImg}-${new Date().getMilliseconds()}.${tipoExtension}`;

	archivo.mv(path, function(err) {
    	if (err)
     		return res.status(500).send(err);

    	req.pathImg = path;
    	return next();
  });
}

exports.nuevoProducto = async (req, res, next) => {

	const producto = new Productos(req.body);

	if (req.files) producto.imagen = req.pathImg;

	try {

		await producto.save();
		res.status(200).json({
			mensaje: 'Producto agregado correctamente',
		});
		next();

	} catch(error) {

		console.log(error)
		next();
	}
}

exports.mostrarProductos = async (req, res, next) => {

	try {

		const productos = await Productos.find();

		res.status(200).json({
			productos,
		});

		next();

	} catch(error) {

		console.log(error)
		next();
	}
}

exports.mostrarProductoId = async (req, res, next) => {

	try {

		const producto = await Productos.findById(req.params.id);

		res.status(200).json({
			producto,
		});

		next();

	} catch(error) {

		console.log(error)
		next();
	}
}

exports.actualizarProductoId = async (req, res, next) => {

	try {

		const producto = req.body;

		if (req.files) producto.imagen = req.pathImg;

		const productoActualizado = await Productos.findOneAndUpdate({ _id: req.params.id }, 
			producto, { new: true });

		res.status(200).json({
			productoActualizado,
		});

		next();

	} catch(error) {

		console.log(error)
		next();
	}
}

exports.eliminarProducto = async (req, res, next) => {

	try {

		await Productos.findOneAndDelete({ _id: req.params.id });

		res.status(200).json({
			mensaje: 'El producto se a eliminado',
		});

		next();

	} catch(error) {

		console.log(error)
		next();
	}
}