var getRepoAvatars = require('./getRepoAvatars');

// extract command line input parameters
var params = process.argv.slice(2);

// if only one input, assume repo owner and repo name are the same
if(params.length == 1){
  console.log("You only provided one input: attempting to retrieve for " + params[0] + "/" + params[0]);
  getRepoAvatars(params[0], params[0]);
} else if(params.length > 1){
  // if we have more than 1 input, we have enough info to attempt retrieval
  if(params.length > 2){
    console.log("Too many input parameters - ignoring all but the first 2")
  }
  getRepoAvatars(params[0], params[1]);
} else {
  console.log("Error: include repo owner and repo name");
}
