// Required npm modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const app = express();
const newPosts = [];

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Pages to be rendered using ejs
app.get("/", function(req, res) {;
  res.render("blog", {
    newPosts: newPosts,
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/ash-before-you-pass", function(req, res) {
  res.render("ash");
});

app.get("/funny-how-high-stories", function(req, res) {
  res.render("funny");
});

app.get("/compose", function(req, res) {
  res.render("compose");
});


// Rendering multiple created blog pages using express routing params
app.get("/posts/:topic", function(req, res) {
  let postTopic = _.lowerCase(req.params.topic);

  newPosts.forEach(function(post) {
    const postTitle = _.lowerCase(post.title);

    if (postTopic === postTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    } else {
      res.send("<h1>Error 404!!!</h1>")
    }
  });
});


// Stores new blog post title and content and pushes to newPosts array
app.post("/compose", function(req, res) {
  let newPost = {
    title: req.body.title,
    content: req.body.content,
  }
  newPosts.push(newPost);

  res.redirect("/");
});


app.listen(process.env.PORT || 4000, function() {
  console.log("Server started on port 4000");
});
