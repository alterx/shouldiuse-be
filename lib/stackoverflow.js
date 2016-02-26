(function() {

    var cheerio = require('cheerio');
    var querystring = require('querystring');
    var http = require('http');
    var CONFIG = require('./config.js');
    var utils = require('./utils.js');

  function getSOTags(tag) {

    return new Promise(function(resolve, reject) {
        var postData = querystring.stringify({
            'filter' : tag,
            'tab': 'popular'
        });
        
        var postOptions = {
            host: CONFIG.SO.HOST,
            path: CONFIG.SO.PATH,
            method: CONFIG.SO.METHOD,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        var postRequest = http.request(postOptions,  function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            
            res.on('end', function() {
                
                var $ = cheerio.load(body);
                var retObj = [];
                
                $('.tag-cell').each(function(i) {
                   var obj = {};
                   var tag = $($('.tag-cell')[i]);
                   
                   obj.tag = tag.find('.post-tag').html();
                   obj.tagUrl = CONFIG.SO.HOST + tag.find('.post-tag').attr('href');
                   obj.count = parseInt(tag.find('.item-multiplier-count').html());
                   obj.recentlyAsked = tag.find('.stats-row a:first-child').html();
                   obj.recentlyAskedURL = CONFIG.SO.HOST +  tag.find('.stats-row a:first-child').attr('href');
                   
                   retObj.push(obj);
                });
                
                resolve(retObj);
            });
        }).on('error', function(err) {
            reject('Unable to retrieve tags.');
        });
        
        postRequest.write(postData);
        postRequest.end();
     });
  }
  
  module.exports = {
    getSOTags: getSOTags
  }

})();
