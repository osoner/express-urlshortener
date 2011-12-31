/**
 * Module dependencies.
 */

var config = require('./lib/config');
var express = require('express');
var mongoose = require('mongoose');
var URLProvider = require('./lib/urlprovider').URLProvider;
var app = module.exports = express.createServer();
var URL = mongoose.model('URL');

mongoose.connect('mongodb://' + config.mongo.user + ':' + config.mongo.pass + '@' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db);
  
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
  if(req.param('url')){
    URLProvider.findByUrl(req.param('url'), function(error, url) {
      if(!error && url){
        res.json(url, 409);
      }
      else if(!error && !url){
        if(req.param('code')){
            URLProvider.findByCode(req.param('code'), function(error, url) {
              if(!error && url){
                res.json(url, 409);
              }
              else{
                URLProvider.save({url: req.param('url'), code: req.param('code')}, function(error){
                  if(!error){
                    URLProvider.findByCode(req.param('code'), function(error, url) {
                      if(!error){
                        res.json(url, 201);
                      }
                    });
                  }
                  else{
                    res.json(error, 500);
                  }
                });
              }
            });
        }
        else{
            URLProvider.save({url: req.param('url')}, function(error){
              if(!error){
                URLProvider.findByUrl(req.param('url'), function(error, url) {
                  if(!error && url){
                    res.json(url, 201);
                  }
                  else{
                    res.json(error, 500);
                  }
                });
              }
              else{
                res.json(error, 500);
              }
            });
        }
      }
    });
  }
  else{
    res.send(400);
  }
});

app.get('/show/:code', function(req, res) {
  URLProvider.findByCode(req.param('code'), function(error, url) {
    if(!error){
      res.json(url);
    }
  });
});

app.get('/go/:code', function(req, res) {
  URLProvider.findByCode(req.param('code'), function(error, url) {
    if(!error){
      res.redirect(url.url, 301);
    }
  });
});

app.get('/a/twitter', passport.authenticate('twitter'));
app.get('/a/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/a/facebook', passport.authenticate('facebook'));
app.get('/a/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/a/foursquare', passport.authenticate('foursquare'));
app.get('/a/foursquare/callback', passport.authenticate('foursquare', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/a/github', passport.authenticate('github'));
app.get('/a/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }));

var port = process.env.PORT || config.port;

app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
