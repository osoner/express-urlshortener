var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

URLProvider = function(host, port, user, pass, database) {
  this.db = new Db(database, new Server(host, port, {auto_reconnect: true}, {}));

  //if(user && pass){
  //  this.db.authenticate(user, pass, function(){})
  //}

  this.db.open(function(){});
};

//getCollection
URLProvider.prototype.getCollection = function(callback) {
  this.db.collection('urls', function(error, url_collection) {
    if( error ) callback(error);
    else callback(null, url_collection);
  });
};

//findAll
URLProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, url_collection) {
      if( error ) callback(error)
      else {
        url_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//findById
URLProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, url_collection) {
      if( error ) callback(error)
      else {
        url_collection.findOne({_id: url_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

//save
URLProvider.prototype.save = function(urls, callback) {
    this.getCollection(function(error, url_collection) {
      if( error ) callback(error)
      else {
        if( typeof(urls.length)=="undefined")
          urls = [urls];

        for( var i =0;i< urls.length;i++ ) {
          url = urls[i];
          url.created_at = new Date();
        }

        url_collection.insert(urls, function() {
          callback(null, urls);
        });
      }
    });
};

exports.URLProvider = URLProvider;
