
const _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-mohit:8890475019@cluster0.4m2x4.mongodb.net/journalDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const journalSchema = new mongoose.Schema({
  Title: String,
  Content: String
});

const Journal = mongoose.model("Journal", journalSchema);




app.get("/", function(req, res) {

  const posts = Journal.find({}, function(err, found) {
    if (!err) {
      res.render("home", {
        homeContent: homeStartingContent,
        blogPosts: found
      });
    }
  });

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutPlace: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactPlace: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postId", function(req,res){
const id = req.params.postId;

Journal.findOne({_id: id}, function(err, found){
  if(!err){
    if(!found){
      console.log("ERROR");
    }else{
    res.render("post", {title:found.Title, content:found.Content});
  }
  }
});

});

app.post("/compose", function(req, res) {

  const title = req.body.blogTitle;
  const content = req.body.blogPost;


        const post = new Journal({
          Title: title,
          Content: content
        });
        post.save(function(err) {
          if (!err) {
            res.redirect("/");
          }
        });


});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
