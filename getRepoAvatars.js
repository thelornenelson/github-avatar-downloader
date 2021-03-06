// these are required for https and filesystem handling
var request = require('request');
var fs = require('fs');

// this loads environment variables, in this case the GITHUB_TOKEN
var dotenv = require('dotenv').config();

// retrieves list of GitHub repo contributors for <repoOwner>/<repoName> and executes
// cb function on returned body (body is array of objects corresponding to contributors)
// this assumes json: true option is passed
function getRepoContributors(repoOwner, repoName, cb, options) {
  options.url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  request(options, function(err, result, body){
    if(err){
      console.log(err);
    } else {
      //check response code, if 404 then log "unable to find user/repo";
      if(result.statusCode == '404'){
        console.log("Unable to find /" + repoOwner + "/" + repoName);
      } else {
        cb(err, body);
      }
    }
  });
}

// downloads and saves image stored at url to local filePath.
function downloadImageByURL(url, filePath, options) {
  options.url = url;

  request.get(options)
  .on('error', function(err){
    throw err;
  })
  .on('end', function(){
    console.log("Downloaded " + url);
  })
  .pipe(fs.createWriteStream(filePath));
}

// callback function to save Avatars to local disk.
var saveAvatars = function(err, result){
  var avatarDir = "./avatars/";

  // log errors, if any
  if(err){
    console.log("Errors: ", err);
  }


  // attempt to read the desired destination directory
  try {
    fs.readdirSync(avatarDir);
  }
  catch (err){
    // if unable to read, readdirSync throws an error. In that case, create directory.
    // Creating synchronously to ensure it's created before we try to save into it.
    fs.mkdirSync(avatarDir, function(){
      console.log("Directory not found, creating directory" + avatarDir);
    });
  }

  // if directory read was successful, directory already exists
  // iterate over results and download and save images
  result.forEach(function(element){
    // console.log("Avatar URL for " + element.login + " is " + element.avatar_url);

    // download and save avatar, assuming jpg format
    downloadImageByURL(element.avatar_url, avatarDir + element.login + ".jpg", options);
  });
};

var options = {
  json: true,
  headers: {
    'User-Agent': 'request',
  }
};

// check to confirm .env loaded correctly
if(dotenv.error){
  console.log(".env file missing or invalid. Let's try to continue without authorization.");
} else {
  options.headers.Authorization = 'token ' + process.env.GITHUB_TOKEN;
}

module.exports = function(repoOwner, repoName){
  getRepoContributors(repoOwner, repoName, saveAvatars, options)
}
