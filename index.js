var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/animals', function(req, res){
  // get animals
  var animals = fs.readFileSync('./data.json');
  animals = JSON.parse(animals);

  res.render('animals/index', { animals: animals });
});

app.get('/animals/new', function(req, res){
  res.render('animals/new.ejs');
});

app.post('/animals', function(req, res){
  var animals = fs.readFileSync('./data.json');
  animals = JSON.parse(animals);

  animals.push(req.body);

  fs.writeFileSync('./data.json', JSON.stringify(animals))

  res.redirect('/animals');
});

app.get('/animals/:idx', function(req, res){
  var animals = fs.readFileSync('./data.json');
  animals = JSON.parse(animals);

  var animalToShow = animals[req.params.idx];

  res.render('animals/show.ejs', { animal: animalToShow });
});

app.listen(3000);
