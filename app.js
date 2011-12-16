/**
 * Module dependencies.
 */

var express = require('express')
var mongoose = require('mongoose')
var URLProvider = require('./urlprovider').URLProvider;

var mongoHost = 'staff.mongohq.com';
var mongoPort = 10036;
var mongoDb = 'app2024915';
var mongoUser = 'heroku';
var mongoPass = 'hoppidi';

mongoose.connect('mongodb://' + mongoUser + ':' + mongoPass + '@' + mongoHost + ':' + mongoPort + '/' + mongoDb);
  
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var URLProvider = new URLProvider();

// Routes
app.get('/', function(req, res){
  URLProvider.findAll(function(error, urls){
    res.json(urls);
  })
});

app.post('/new', function(req, res){
  URLProvider.save({
    long: req.param('long'),
    short: req.param('short')
  }, function( error, docs) {
    res.redirect('/')
  });
});

/*
app.get('/:id', function(req, res) {
    urlProvider.findById(req.params.id, function(error, url) {
        res.json(url);
    });
});
*/

//app.post('/create', routes.create);
//app.get('/:shorturl', routes.shorturl);
//app.get('/:shorturl.json', routes.shorturljson);
//app.get('/:shorturl.html', routes.shorturlhtml);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
