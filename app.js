/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes')
var URLProvider = require('./urlprovider-mongo').URLProvider;

var mongoHost = 'localhost';
var mongoPort = 27017;
var mongoDb = 'shortenode';
var mongoUser = 'shortenode';
var mongoPass = 'qwerty';
  
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

var urlProvider = new URLProvider(mongoHost, mongoPort, mongoUser, mongoPass, mongoDb);


// Routes
app.get('/test', function(req, res){
  urlProvider.findAll(function(error, docs){
      res.json(docs);
  });
})

app.get('/', routes.index);
app.get('/new', routes.newform);
app.post('/create', routes.create);
app.get('/:shorturl', routes.shorturl);
app.get('/:shorturl.json', routes.shorturljson);
app.get('/:shorturl.html', routes.shorturlhtml);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
