const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {

	// Leer los datos del usuario y colocarlos en Usuarios
	const usuario = new Usuario(req.body);
	usuario.password = await bcrypt.hash(req.body.password, 12);

	try {

		await usuario.save();
		res.json({mensaje: 'Usuario Creado correctamente'});

	} catch(error) {

		console.log(error);
		res.json({mensaje: 'Hubo un error'});
	}
}

exports.autenticarUsuarios = async (req, res, next) => {

	const { email, password } = req.body;
	const usuario = await Usuario.findOne({ email });

	if (!usuario) {

		await res.status(401).json({ mensaje: 'Ese usuario no existe' });
	
	} else {

		if ( !bcrypt.compareSync(password, usuario.password) ) {

			await res.status(401).json({mensaje: 'Password incorrecto'});
			next();
		
		} else {

			const token = jwt.sign({ 
				email: usuario.email,
				usuario: usuario.nombre,
				_id: usuario._id,
			}, 
			'LlaveSecreta', 
			{ 
				expiresIn: '.5m'
			});

			res.status(200).json({ token });
		}
	}
}