// We use "require" to be able to use and load modules from separate files.
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

// Can be utilized in any custom email function that we need to send various sorts of email.
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_KEY,
  })
);

// Function that utilizes our transport variable to send a specific sort of email.
const postAddedEmail = (post) => {
  transport
    .sendMail({
      from: "CG <chabster99@hotmail.com>",
      to: `${post.username} <${post.email}>`,
      subject: "Message received",
      text: `Hi ${post.username}, your project (${post.projectname}) has been created`,
      html: `<h1>Your project has been created</h1> 
            <p>Hi ${post.username}, your project (${post.projectname}) with id (${post.userid}) has been successfully created</p>
            <p>Enjoy Our Services!</p>
            <p>Have a great day!</p>`,
    })
    .then(() => console.log("Email has been sent successfully"))
    .catch((err) => console.log(err));
};

// Syntax used to have the option to send out different functions from a similar module.
exports.postAddedEmail = postAddedEmail;
