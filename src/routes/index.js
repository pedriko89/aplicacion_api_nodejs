const express = require('express');
const Router=express.Router();

//rutas
Router.get('/', function(req, res){
	res.status(200).send({
		message: 'entrando en el home /!'
	});
});
module.exports = Router;