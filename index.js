var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var fs = require('fs');
var port = process.env.PORT || 8080;

var app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(port, function(){
	console.log('Started on port: ' + port);
});