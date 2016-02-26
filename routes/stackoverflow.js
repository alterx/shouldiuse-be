var express = require('express');
var router = express.Router();
var stackoverflow = require('../lib/stackoverflow.js');


router.route('/stackoverflow').get(function(req, res) {
    
   stackoverflow.getSOTags(req.query.search).then(function(tags) {
       res.json(tags)
   }, function(err){
       return res.send(err);
   });
});

module.exports = router;