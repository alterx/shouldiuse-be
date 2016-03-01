var express = require('express');
var router = express.Router();
var typeform = require('../lib/typeform.js');


router.route('/projects').get(function(req, res) {
    
   typeform.getRelatedProjects(req.query.search).then(function(tags) {
       res.json(tags)
   }, function(err){
       return res.send(err);
   });
});

module.exports = router;