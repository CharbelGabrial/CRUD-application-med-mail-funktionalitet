// We use "require" to be able to use and load modules from separate files.
const mongoose = require("mongoose");

// The different "inputs", their type and required that they are a must to post.
const PostSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  projectname: {
    type: String,
    required: true,
  },
  projectstatus: {
    type: String,
    required: true,
  },
});

// To be able to use ("Post", PostSchema) by other files we need to export it.
module.exports = mongoose.model("Post", PostSchema);
