var getRepoAvatars = require('./getRepoAvatars');

// check to make sure 2 inputs were read from command line.
if(process.argv[2] && process.argv[3]){
  getRepoAvatars(process.argv[2], process.argv[3]);
} else {
  console.log("Error: include repo owner and repo name");
}
