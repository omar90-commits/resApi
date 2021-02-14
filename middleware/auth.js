const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

	// Autorizacion por el header
	const authHeader = req.get('Authorization');

	if (!authHeader) {

		const error = new Error('No autenticado, no hay JWT');
		error.statusCode = 401
		throw error;
	}

	// obtener token y verificarlo
	const token = authHeader.split(' ')[1];
	let verificarToken;

	try {

		verificarToken = jwt.verify(token, 'LlaveSecreta');

	} catch(error) {

		error.statusCode = 500;
		throw error
	}

	// Si es un token valido, pero hay algun error
	if (!verificarToken) {

		const error = new Error('No autenticado');
		error.statusCode = 401
		throw error;
	}

	next();
}