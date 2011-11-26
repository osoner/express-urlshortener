exports.index = function(req, res){
  //res.render('index', { title: 'Express' })
    res.json({title: 'Express'})
};

exports.newform = function(req, res){
    res.render('new', {title: 'New URL'})
};

exports.create = function(req, res){};
exports.shorturl = function(req, res){};
exports.shorturljson = function(req, res){};
exports.shorturlhtml = function(req, res){};