var path = require("path");
var express = require("express");

var bodyParser = require("body-parser"); // simplifies access to request body
var app = express();  // make express app

var http = require('http').Server(app);  // inject app into the server





app.use(express.static(path.join(__dirname, 'assets'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, 'css'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, 'js'), { maxAge: 31557600000 }));
// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify view engine

app.use(express.static(__dirname + '/views'));

var entries = [];
app.locals.entries = entries; 

// set up an http request logger to log every request automagically
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.all("/", function (request, response) {
    console.log("test")
     response.render('home.ejs');
});


// handle http GET requests (default)
  
  const routes = require('./routes/index.js');
  app.use('/', routes);

  http.listen(8005, function () {
    console.log('App is listening on http://127.0.0.1:8005/');

  });

  