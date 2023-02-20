// Required npm modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

//mongo connection
mongoose.set("strictQuery", false);
const mongoURL = "mongodb+srv://martinelli:0GpBqEXRrBhmSJFB@clusterm.glfywxd.mongodb.net/blogDB";
mongoose.connect(mongoURL, {useNewUrlParser: true});


// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MongoSchema and model
const postSchema = {
  title: {
    type: String,
    required: [true, "Provide a post title"]
  },
  content: {
    type: String,
    required: [true, "Your content page cannot be empty"]
  },
}

const Post = mongoose.model("Post", postSchema);


// Pages to be rendered using ejs
app.get("/", function(req, res) {
  Post.find({}, function(err, result) {
    res.render("blog", {
      newPosts: result,
    });
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
app.get("/posts/:postId", function(req, res) {
  const newPostId = req.params.postId;

  Post.findOne({_id: newPostId}, function(err, result) {
    if (!err) {
      res.render("post", {
        title: _.toUpper(result.title),
        content: result.content,
      });
    } else {
      res.send("<h1>Couldn't retrieve post from the database</h1>")
    }
  });
});


// Stores new blog post title and content and pushes to newPosts array
app.post("/compose", function(req, res) {
  const newPost = new Post ({
    title: req.body.title,
    content: req.body.content,
  });

  newPost.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});


app.listen(process.env.PORT || 4000, function() {
  console.log("Server started on port 4000");
});
