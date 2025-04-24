import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let articles = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//Make the get route work and render the index.ejs file.
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
  const image = "most-recent-article.jpg"
  const imageDescription = req.body["submitted-image-description"];
  const summary = req.body["submitted-summary"];
  const article = req.body["submitted-article"];

  const newArticle = {
    title: title,
    image: image,
    imageDescription: imageDescription,
    summary: summary,
    article: article
  };

  articles.push(newArticle);

  res.render("./index.ejs", {articles});
 })

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


  let firstArticle = {
    title: "Article Title",
    articleImage: "article1.jpg",
    imageDescription: "Picture of a coffee",
    summary: "Fusce varius, justo eu ullamcorper congue, ante mi elementum massa, eget hendrerit odio elit in lacus. Nam lacinia nisi quis hendrerit tincidunt. Integer magna dui, bibendum quis tortor et, venenatis pretium justo.",
    article: "This is an example article"
  };

  let secondArticle = {
    title: "Article Title",
    articleImage: "article2.jpg",
    imageDescription: "Lake landscape",
    summary: "Vivamus ut rutrum ex, quis feugiat dolor. Nam vel felis dui. Maecenas viverra ex vel augue porta, non porttitor mi condimentum. Integer lobortis sapien tortor, sed tempor eros interdum vel. Phasellus vel suscipit ligula.",
    article: "This is an example article"
  };

  let thirdArticle = {
    title: "Article Title",
    articleImage: "article3.jpg",
    imageDescription: "Picture of a camera",
    summary: "Sed luctus enim non mauris sodales, ac molestie odio porttitor. In auctor ornare sodales. Mauris hendrerit dolor neque, id sodales purus porttitor eget. Vestibulum molestie dictum euismod.",
    article: "This is an example article"
  };

  articles.push(firstArticle);
  articles.push(secondArticle);
  articles.push(thirdArticle);