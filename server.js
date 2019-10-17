var express = require('express');
var app = express();

//setup Mongo connection
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var options = { useUnifiedTopology: true, useNewUrlParser: true };

  
// set the view engine to ejs
app.set('view engine', 'ejs');

app.get("/",function(req,res){
    res.render('pages/index');
});
app.get("/products",function(req,res){
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err; 
        var dbo = db.db("laptop");
        //select target
        var query = {}
        dbo.collection("midlaptop")
        .find(query)
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.render('pages/products',{products:result}); //
          db.close();
        });
      });
});

app.get("/productdetail/:ID",function(req,res){
    var classid = req.params.ID;
    //Get the class detail from mongodb
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err; 
        var dbo = db.db("laptop");
        //select target
        var query = {ProductID: classid}
        dbo.collection("products")
        .findOne(query,function(err, result) {
          if (err) throw err;
          console.log(result);
          res.render('pages/productdetail',{detail:result}); //
          db.close();
        });
      });
});
//detail

app.listen(8020);
console.log('Express started at http://localhost :8020');