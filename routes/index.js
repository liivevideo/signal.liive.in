// Generated by CoffeeScript 1.10.0
(function() {
  var express, router;

  express = require('express');

  router = express.Router();

  module.exports = function(config) {
    var configStr;
    configStr = JSON.stringify(config);
    router.get('/', function(req, res, next) {
      res.render('index', {
        title: 'Liive Video',
        config: configStr
      });
    });
    return router;
  };

}).call(this);

//# sourceMappingURL=index.js.map
