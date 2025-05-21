import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
let articles = [];
let images = ["random_article1.jpg", "random_article2.jpg", "random_article3.jpg", "random_article4.jpg", "random_article5.jpg", "random_article6.jpg", "random_article7.jpg", "random_article8.jpg", "random_article9.jpg", "random_article10.jpg", "random_article11.jpg", "random_article12.jpg"]

function getRandomImage(){
  let imageChosen = images[Math.floor(Math.random() * 12)];
  return imageChosen;
}

app.use(express.static("public"));

// MIDDLEWARES

app.use(bodyParser.urlencoded({ extended: true }));

//middleware to handle 'DELETE' and 'PUT' http requests
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      //console.log(method,req.body._method)
      delete req.body._method
      return method
    }
  }))

// ROUTES

app.get("/", (req, res) => {
    res.render("index.ejs", {articles});
  });

app.get("/index.ejs", (req, res) => {
  res.render("index.ejs", {articles});
});

app.get("/about.ejs", (req, res) => {
   res.render("about.ejs");
 });

 app.post("/submit", (req, res) => {
  const title = req.body["submitted-title"];
  const image = getRandomImage();
  const summary = req.body["submitted-summary"];
  const article = req.body["submitted-article"];

  const newArticle = {
    title: title,
    articleImage: image,
    summary: summary,
    article: article
  };

  articles.push(newArticle);

  res.render("./index.ejs", {articles});
 })

 app.post("/article", (req, res) => {
  const articleIndex = req.body["article-index"];

  res.render("./article.ejs", {articleIndex, articles});
 })

 app.post("/edit", (req, res) => {
  const articleIndex = req.body["index"];

  res.render("./edit.ejs", {articleIndex, articles});
 })

 app.post("/save", (req, res) => {
  const articleIndex = req.body.index;

  const title = req.body["edited-title"];
  const image = articles[articleIndex].articleImage;
  const summary = req.body["edited-summary"];
  const article = req.body["edited-article"];

  const newArticle = {
    title: title,
    articleImage: image,
    summary: summary,
    article: article
  };

  articles.splice(articleIndex, 1, newArticle);

  res.render("./article.ejs", {articleIndex, articles});
 })

 app.delete("/delete", (req, res) => {
  const articleIndex = req.body.id;

  articles.splice(articleIndex, 1);

  res.redirect("/");
 })

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


// EXAMPLES ARTICLES

  let firstArticle = {
    title: "Article Title 1",
    articleImage: getRandomImage(),
    summary: "Fusce varius, justo eu ullamcorper congue, ante mi elementum massa, eget hendrerit odio elit in lacus. Nam lacinia nisi quis hendrerit tincidunt. Integer magna dui, bibendum quis tortor et, venenatis pretium justo.",
    article: "This is an example article"
  };

  let secondArticle = {
    title: "Article Title 2",
    articleImage: getRandomImage(),
    summary: "Vivamus ut rutrum ex, quis feugiat dolor. Nam vel felis dui. Maecenas viverra ex vel augue porta, non porttitor mi condimentum. Integer lobortis sapien tortor, sed tempor eros interdum vel. Phasellus vel suscipit ligula.",
    article: "This is an example article"
  };

  let thirdArticle = {
    title: "Article Title 3",
    articleImage: getRandomImage(),
    summary: "Sed luctus enim non mauris sodales, ac molestie odio porttitor. In auctor ornare sodales. Mauris hendrerit dolor neque, id sodales purus porttitor eget. Vestibulum molestie dictum euismod.",
    article: "This is an example article"
  };

  articles.push(firstArticle);
  articles.push(secondArticle);
  articles.push(thirdArticle);