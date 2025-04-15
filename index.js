import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//Make the get route work and render the index.ejs file.
app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.get("/index.ejs", (req, res) => {
  res.render("index.ejs");
});

app.get("/about.ejs", (req, res) => {
   res.render("about.ejs");
 });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });