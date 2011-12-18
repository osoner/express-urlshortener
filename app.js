/**
 * Module dependencies.
 */

var express = require('express')
var mongoose = require('mongoose')
var URLProvider = require('./urlprovider').URLProvider;

var mongoHost = 'staff.mongohq.com';
var mongoPort = 10036;
var mongoDb = 'app2044968';
var mongoUser = 'heroku';
var mongoPass = 'hoppidi';

mongoose.connect('mongodb://' + mongoUser + ':' + mongoPass + '@' + mongoHost + ':' + mongoPort + '/' + mongoDb);
  
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(app.router);
  //app.use(express.static(__dirname + '/public'));
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
    url: req.param('url'),
    code: req.param('code')
  }, function( error, urls) {
    res.redirect('/')
  });
});

app.get('/go/:code', function(req, res) {
  URLProvider.findByShort(req.param('code'), function(error, url) {
    if(!error){
      //res.json(url);
      res.redirect(url.url);
    }
  });
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
