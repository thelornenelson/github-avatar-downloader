var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors("nodejs", "node", function(err, result){
  console.log("Errors: ", err);
  console.log("Result: ", result);
});
