var mongoose = require('mongoose');
var base36 = require('./base36');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var URL = new Schema({
    id      : ObjectId,
    url    : String,
    code   : { type: String, index: { unique: true } }
});

mongoose.model('URL', URL);
var URL = mongoose.model('URL');

URLProvider = function(){};

//Find all posts
URLProvider.prototype.findAll = function(callback) {
  URL.find({}, function (err, urls) {
    callback( null, urls )
  });  
};

URLProvider.prototype.findById = function(id, callback) {
  URL.findById(id, function (err, url) {
    if (!err) {
	  callback(null, url);
	}
  });
};

URLProvider.prototype.findByCode = function(code, callback) {
  URL.findOne({ 'code': code }, function (err, url) {
    if (!err) {
	  callback(null, url);
	}
  });
};

URLProvider.prototype.findByUrl = function(url, callback) {
  URL.findOne({ 'url': url }, function (err, url) {
    if (!err) {
	  callback(null, url);
	}
  });
};

URLProvider.prototype.save = function(params, callback) {
  var newurl = new URL({url: params['url'], code: params['code'], created_at: new Date()});
  newurl.save(function (err) {
    callback();
  });
};

exports.URLProvider = URLProvider;