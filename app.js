var express = require('express');
var morgan = require('morgan');
var app     = express();
var port    = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'jade');

// Middelware
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.render('index');
});


app.listen(port);
console.log('Server started on ' + port);