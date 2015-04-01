var morgan  = require('morgan');
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var router  = express.Router();

app.set('views', './views');
app.set('view engine', 'jade');

// Middelware
app.use(morgan('dev'));
app.use('/', router);


router.get('/', function(req, res) {
  res.render('index', { header: 'index!'});
});

router.get('/words', function(req, res) {
  res.render('words', { header: 'contact!'});
});


app.listen(port);
console.log('Server started on ' + port);