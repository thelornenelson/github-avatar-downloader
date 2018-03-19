// these are required for https and filesystem handling
var request = require('request');
var fs = require('fs');

// this loads environment variables, in this case the GITHUB_TOKEN
require('dotenv').config();

// retrieves list of GitHub repo contributors for <repoOwner>/<repoName> and executes
// cb function on returned body (body is JSON array of objects corresponding to contributors)
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };

  request(options, function(err, result, body){
    cb(err, body);
  })
}

// downloads and saves image stored at url to local filePath.
function downloadImageByURL(url, filePath) {
  var options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };

  request.get(options)
  .on('error', function(err){
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

var saveAvatars = function(err, result){
  // set directory to save avatars
  var avatarDir = "./avatars/";

  // log errors, or null if no errors
  console.log("Errors: ", err);

  // parse the results string
  var results = JSON.parse(result);

  // attempt to read the desired destination directory
  fs.readdir(avatarDir, function(err){
    if(err){
      // if unable to read, create directory
      fs.mkdir(avatarDir, function(){
        console.log("Directory not found, creating directory" + avatarDir);
      });
    } else {
      // if directory read was successful, directory already exists
      // iterate over results and download and save images
      results.forEach(function(element){
        console.log("Avatar URL for " + element.login + " is " + element.avatar_url);

        // download and save avatar, assuming jpg format
        downloadImageByURL(element.avatar_url, avatarDir + element.login + ".jpg");
      });
    }

  });
};


// check to make sure 2 inputs were read from command line.
if(process.argv[2] && process.argv[3]){

  getRepoContributors(process.argv[2], process.argv[3], saveAvatars);

} else {
  console.log("Error: include repo owner and repo name");
}
