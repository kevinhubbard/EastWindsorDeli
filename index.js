var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var port = process.env.PORT || 8080;

var app = express();

var connection;
if(process.env.JAWSDB_URL){
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		root: 3306,
		host: 'p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		user: 'vwpe4ginr1wjyqmp',
		password: 'f6snqlsv9wuw4rfw',
		database: 'bxj0e4a0xziecvau'
	});
}
connection.connect();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));
var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.get('/', function(req, res){
	res.render('index');
});

app.get('/menu', function(req, res){
	var tempFile = '/public/menu/ewd.pdf';
	fs.readFile(__dirname + tempFile, function(err, data){
		res.contentType('application/pdf');
		res.send(data);
	});
});

app.get('/order', function(req, res){
	res.render('order');
});

app.get('/images', function(req, res){
	res.render('images');
});

app.get('/admin', function(req,res){
	var order = 'SELECT * FROM ewdeli';
	connection.query(order, function(error, rows){
		for (var i = 0; i < rows.length; i++) {
			console.log('name: '+rows[i].Name + '\n' + 'Request: ' + rows[i].SpecialRequest);
		}
		res.render('admin', {order: rows});
	});
});
app.post('/order', urlencodedParser, function(req, res){

	console.log(req.body.breakfast);
	console.log(req.body.lunch);
	console.log(req.body.wraps);
	console.log(req.body.burgers);
	console.log(req.body.special);
	console.log(req.body.name);
	res.render('thankyou', {name: req.body.name});
	
	var query = "INSERT INTO ewdeli (Name, SpecialRequest, Breakfast, Lunch, Burgers, Wraps) VALUES ('" + req.body.name + "', '" + req.body.special + "', '"+ req.body.breakfast +  "', '"+ req.body.lunch +  "', '"+ req.body.burgers +  "', '"+ req.body.wraps + "');";
	console.log(query);
	connection.query(query, function (error, results, fields) {
  		if (error) throw error;
	});
});

app.listen(port, function(){
	console.log('Started on port: ' + port);
});