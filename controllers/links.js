var express = require('express');
var router = express.Router();
var db = require('../models');
var Hashids = require("hashids"),
    hashids = new Hashids("alExAndEr's HA$H $$$$$$aLTS");

router.get('/', function(req,res){
  res.render('links/index');
})

router.post('/', function(req,res){
  db.link.create({url:req.body.q,}).then(function(data){
    // console.log(data);
    var id = data.id;
    data.hash = hashids.encode(id);
    var hashurl = data.hash;
    data.save().then(function(encodedData){
      res.render('links/show', {url: hashurl});
    });
  })
})

// router.get('/:id', function(req,res){

// })

module.exports = router;