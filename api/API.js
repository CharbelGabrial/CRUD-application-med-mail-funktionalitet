// We use "require" to be able to use and load modules from separate files.

const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { postAddedEmail } = require("../services/EmailService");

/*
  Through "router" we again "require" the information in the diffrent inputs
  depending how it goes well we display a massage
*/
router.post("/newpost", (req, res) => {
  console.log(req.body);
  const newPost = new Post({
    username: req.body.username,
    email: req.body.email,
    userid: req.body.userid,
    projectname: req.body.projectname,
    projectstatus: req.body.projectstatus,
  });
  newPost.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: "An error occured while saving Project",
          msgError: true,
        },
      });
    } else {
      postAddedEmail(req.body);
      res.status(201).json({
        message: {
          msgBody:
            "<p style=' padding: 5px 15px; border-radius: 20px; background-color: #06d6a0; color: white;'>Project successfully created</p>",
          msgError: false,
        },
      });
    }
  });
});

/*
  Through "router" we use "get" to get the information this time from "Post" form our db
  depending how it goes well we display a massage
*/
router.get("/getposts", (req, res) => {
  Post.find({}, (err, documents) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "An error occured while getting Project data",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ posts: documents });
    }
  });
});

/*
  Through "router" we use "put" and the uniqe id that the post have to update the information
  depending how it goes well we display a massage
*/
router.put("/updatepost/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      userid: req.body.userid,
      projectname: req.body.projectname,
      projectstatus: req.body.projectstatus,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "An error occured while updeting Project",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody:
              "<p style=' padding: 5px 15px; border-radius: 20px; background-color: deepskyblue; color: white;'>Project successfully updeted</p>",
            msgError: false,
          },
        });
      }
    }
  );
});

/*
  Through "router" we use "delete" and the uniqe id that the post have to update the information
  depending how it goes well we display a massage
*/
router.delete("/deletepost/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "An error occured while deleting Project",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: {
          msgBody:
            "<p style=' padding: 5px 15px; border-radius: 20px; background-color: red; color: white;'>Project successfully deleted</p>",
          msgError: false,
        },
      });
    }
  });
});

module.exports = router;
