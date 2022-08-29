const express = require('express');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
var bodyParser = require('body-parser');
const path = require('path');
//const hbs = require('hbs');


//inicializador de express
var app = express();
var port = process.env.PORT || 4000;


/*app.use(express.static(path.normalize(__dirname + "/..") + "/views"));
console.log(path.normalize(__dirname + "/..") + "/views/layout");

hbs.registerPartials(path.normalize(__dirname + "/..") + "/views/layout");
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
console.log(path.normalize(__dirname + "/..") + "/views/layout");
//express hbs engine
app.set('view engine', 'hbs');*/


app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs.engine({
	defaultLayout: 'main',
	layoutDir: path.join(app.get('views'), 'layout'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('./libs/handlebars')
}));

app.set('view engine', 'hbs');



//middleware
app.use(morgan('dev'));
// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//variables globales






app.use(require('./routes'))

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
