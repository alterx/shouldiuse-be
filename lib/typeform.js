var https = require('https');
var auth = require('../.auth');
var s = require('underscore.string');

var url = "https://api.typeform.com/v0/form/" + auth.TYPEFORM.UUID + "?key=" + auth.TYPEFORM.API_KEY + "&completed=true";

function includes(answer, tag, object) {
    var humanized = s(answer).humanize().trim().replaceAll('js', '').replaceAll('.js', '').value().toLocaleLowerCase();
    var humanizedTag = s(tag).humanize().trim().replaceAll('js', '').replaceAll('.js', '').value().toLocaleLowerCase();
    if(humanized !== ''){
        object.techStack.push({name: humanized}); 
    }
    return s(humanized).include(humanizedTag);
}

function parseFramework(tag, answer) {
    return includes(answer.list_15835451_choice_20112069, tag, answer) ||
        includes(answer.list_15835451_choice_20112070, tag, answer) ||
        includes(answer.list_15835451_choice_20112071, tag, answer) ||
        includes(answer.list_15835451_choice_20112072, tag, answer) ||
        includes(answer.list_15835451_choice_20112073, tag, answer) ||
        includes(answer.list_15835451_choice_20112074, tag, answer) ||
        includes(answer.list_15835451_choice_20112075, tag, answer) ||
        includes(answer.list_15835451_choice_20112076, tag, answer) ||
        includes(answer.list_15835451_other, tag, answer);
}

function parseBuildTool(tag, answer) { 
    return includes(answer.list_15835865_choice_20112418, tag, answer) ||
        includes(answer.list_15835865_choice_20112419, tag, answer) ||
        includes(answer.list_15835865_choice_20112420, tag, answer) ||
        includes(answer.list_15835865_choice_20112421, tag, answer) ||
        includes(answer.list_15835865_choice_20112422, tag, answer) ||
        includes(answer.list_15835865_other, tag, answer);
}

function parsePostProcessors(tag, answer) {
    return includes(answer.list_15845189_choice_20124877, tag, answer) ||
        includes(answer.list_15845189_choice_20124878, tag, answer) ||
        includes(answer.list_15845189_choice_20124879, tag, answer) ||
        includes(answer.list_15845189_other, tag, answer);
}

function parsePreProcessors(tag, answer) {
    return includes(answer.list_15845198_choice, tag, answer) ||
        includes(answer.list_15845198_other, tag, answer);
}


function parseContent(content, id) {
    var retObj = {
        id: id,
        description: content.textarea_15835541,
        category: content.list_15838338_choice,
        scale: content.opinionscale_15836444,
        techStack: content.techStack
    }
    
    if(content.website_15836338 !== "http://" && content.website_15836338 !==  "") {
        retObj.codeUrl = content.website_15836338;
    }
    
    if(content.website_15836352 !== "http://" && content.website_15836352 !==  "") {
        retObj.homepage = content.website_15836352;
    }
    
    return retObj;
}

function getRelatedProjects(tag) {
    return new Promise(function(resolve, reject) { 
        https.get(url,  function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            
            res.on('end', function() {
                
                var content = JSON.parse(body);
                var response = [];
                
                content.responses.forEach(function(content){
                    content.answers.techStack = [];
                    if(parseBuildTool(tag, content.answers) || parsePostProcessors(tag, content.answers) || parsePreProcessors(tag, content.answers) || parseFramework(tag, content.answers))
                        response.push(parseContent(content.answers, content.id));
                });             
                resolve(response);
            });
        }).on('error', function(err) {
            reject('Unable to retrieve tags.');
        });  
     });
  }

module.exports = {
    getRelatedProjects: getRelatedProjects
}