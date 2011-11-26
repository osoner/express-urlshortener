exports.test = function(req, res){
  URLProvider.findAll(function(error, docs){
      res.send(docs);
  });
};