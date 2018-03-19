var request = require('request');
var fs = require('fs');
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

function downloadImageByURL(url, filePath) {
  var options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request.get(options)
  .on('error', function(err){
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("nodejs", "node", function(err, result){
  // log errors, or null if no errors
  console.log("Errors: ", err);

  // parse the results string
  var results = JSON.parse(result);

  // iterate over results and output avatar urls
  results.forEach(function(element){
    console.log("Avatar URL for " + element.login + " is " + element.avatar_url);

    // download and save avatar, assuming jpg format
    downloadImageByURL(element.avatar_url, "avatars/" + element.login + ".jpg");
  });

});
