var mongoose = require('mongoose')

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

//Find post by ID
URLProvider.prototype.findById = function(id, callback) {
  URL.findById(id, function (err, url) {
    if (!err) {
	  callback(null, url);
	}
  });
};

//Find post by Short
URLProvider.prototype.findByShort = function(code, callback) {
  URL.findOne({ 'code': code }, function (err, url) {
    if (!err) {
	  callback(null, url);
	}
  });
};

//Create a new post
URLProvider.prototype.save = function(params, callback) {
  var newurl = new URL({url: params['url'], code: params['code'], created_at: new Date()});
  newurl.save(function (err) {
    callback();
  });
};

exports.URLProvider = URLProvider;