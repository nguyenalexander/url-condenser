var express = require('express');
var app = express();
var linksCtrl = require('./controllers/links');
var db = require('./models');
var bodyParser = require("body-parser")
var Hashids = require("hashids"),
hashids = new Hashids("alExAndEr's HA$H $$$$$$aLTS");

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.use('/links', linksCtrl);
app.use(express.static(__dirname + "/public"));

app.get('/', function(req,res){
  res.render('index');
})

app.get('/:hash', function(req,res){
  console.log(req.params.hash);
  var decodeUrl = parseInt(hashids.decode(req.params.hash));
  console.log(parseInt(decodeUrl));
  db.link.find(decodeUrl).then(function(decoded){
    if (decoded) {
      console.log(decoded)
      res.redirect(decoded.url);
    }
    else {
      res.redirect('/')
    }
  })
})

app.listen(3000, function(){
  console.log("Hello, server is up and running.");
})