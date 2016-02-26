var GitHubApi = require('github');
var auth = require('../.auth');

var gh = new GitHubApi({
    version: '3.0.0',
    timeout: 5000,
    headers: {
        'user-agent': 'Should-I-Use-App'
    }
});

function authenticate() {
    gh.authenticate({
        type: 'basic',
        username: auth.GITHUB.USERNAME,
        password: auth.GITHUB.PASSWORD
    });
    
    return gh;
}

module.exports = {
    authenticate: authenticate
}