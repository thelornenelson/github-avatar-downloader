var request = require('request');
var secrets = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, result, body){
    cb(err, body);
  })
}

getRepoContributors("nodejs", "node", function(err, result){
  console.log("Errors: ", err);
  var results = JSON.parse(result);
  results.forEach(function(element){
    console.log("Avatar URL for " + element.login + " is " + element.avatar_url);
  });

});
