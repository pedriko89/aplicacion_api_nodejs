const express = require('express');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
var bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
//const hbs = require('hbs');


//inicializador de express
var app = express();
var port = process.env.PORT || 4000;

//declaramos las rutas de las vistas, path.join une las rutas. ejemplo ./views/layout
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs.engine({
	defaultLayout: 'main',
	layoutDir: path.join(app.get('views'), 'layout'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('./libs/handlebars')
}));
//inicializamos el motor de handlebars
app.set('view engine', 'hbs');



//middleware
app.use(morgan('dev'));
// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//variables globales




//rutas
app.use(require('./routes'));
//hemos puesto el archivo de routes links empiezan por links asi que en la url debremos poner links y la ruta de links.js
//ejemplo /links/add esto llamara a la routa add de links
app.use('/links',require('./routes/links'));
app.use(require('./routes/autentificacion'));

//public
 app.use(express.static(path.join(__dirname, 'public')));



/*//rutas
app.get('/', function(req, res){
	res.status(200).send({
		message: 'entrando en el home /!'
	});
});*/

app.listen(port, function(){
	console.log(`el servidor se esta ejecutando en http://localhost:${port}`);
	console.log('la ruta es:');
	console.log('	[GET] http://localhost:3525/');

});
