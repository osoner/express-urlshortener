var urlCounter = 1;

URLProvider = function(){};
URLProvider.prototype.dummyData = [];

URLProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

URLProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

URLProvider.prototype.save = function(urls, callback) {
  var url = null;

  if( typeof(urls.length)=="undefined")
    urls = [urls];

  for( var i =0;i< urls.length;i++ ) {
    url = urls[i];
    url._id = urlCounter++;
    url.long = '';
    url.created_at = new Date();
    url.short = '';

    this.dummyData[this.dummyData.length]= url;
  }
  callback(null, urls);
};

/* Lets bootstrap with dummy data */
new URLProvider().save([
  {long: 'http://pardus.org.tr', short: '288vjd9'},
  {long: 'http://github.com', short: '29djn4v'},
  {long: 'http://google.com', short: 'socıe20'}
], function(error, urls){});

exports.URLProvider = URLProvider;
