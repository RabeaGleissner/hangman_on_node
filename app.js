var morgan  = require('morgan');
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var router  = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();



var urlencodedParser = bodyParser.urlencoded({ extended: false });

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://127.0.0.1:27017/hangman', function(err, db) {
    if(err) throw err;

    var collection = db.collection('words');

app.set('views', './views');
app.set('view engine', 'jade');

// Middelware
app.use(morgan('dev'));
app.use('/', router);
// app.use(express.static(path.join(__dirname, 'public')));

router.get('/', function(req, res) {
  res.render('index', { title: 'Hangman on Node.js' });
});

// router.get('/words', function(req, res) {
//   res.render('words', { title: 'Hangman on Node.js' });


// });

app.get('/words', urlencodedParser, function (req, res) {
  collection.find().toArray(function(err, docs){
    if(err) {
      console.log(err);
      res.send('failed to find data');
    } else {
      console.log(docs);
      
      // res.render('index', { wordList: JSON.stringify(docs)});
      res.render('index', { wordList: docs});
    }

  });

});

app.post('/create', urlencodedParser, function (req, res) {

 
  console.log(req.body.word);
  collection.insert({ word : req.body.word }, function(err, docs) {
    if(err) {
       console.log(err);
       res.send('failed to insert data');
    } else {
      console.log(docs);
      res.redirect('/');
    }

   
});
  
  
});


app.listen(port);
console.log('Server started on ' + port);

});