const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restApi', { 
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}, 
	(err, res) => {

	if (err) throw err;
	else console.log('bases de datos online');
});