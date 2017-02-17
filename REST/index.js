var fs = require('fs');
var http = require('http');
//var https = require('https');
//var privateKey = fs.readFileSync('server.key', 'utf8'); 
//var certificate = fs.readFileSync('server.crt', 'utf8'); 
//var credentials = {key: privateKey, cert: certificate};

var express = require('express'); 
var app = express();

var data = [];

var parser = require('body-parser'); 
app.use(parser.json()); 
app.use(parser.urlencoded({extended: true}));

app.get('/', function(req, res) { 
	res.json(data);
});

app.post('/post', function(req, res) {

	var newPost = {
		data : req.body.data, 
		timestamp : req.body.timestamp
	};

	data.push(newPost);
	res.json(true); 
});

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080); 
//httpsServer.listen(8443);