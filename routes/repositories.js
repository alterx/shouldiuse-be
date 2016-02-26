var express = require('express');
var router = express.Router();
var github = require('../lib/github.js');


router.route('/repositories').get(function(req, res) {
    
    var authenticatedGHInstance = github.authenticate();
    
    authenticatedGHInstance.search.repos({
        q: req.query.search
    }, function(err, repos) {
        if (err) {
            return res.send(err);
        }
        res.json(repos);
    });
});

module.exports = router;