const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'Public')));
let posts = [{
    id: uuidv4(),
    name: "internship",
    area: "Example",
}];

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});

app.get("/add", (req, res) => {
    res.render("form.ejs");
});

app.post("/post", (req, res) => {
    let { name, area } = req.body;
    let id = uuidv4();
    posts.push({ id, name, area });
    res.redirect("/");
});

app.get("/", (req, res) => {
    res.render("Home.ejs", { posts });
});

app.get("/home/:id", (req, res) => {
    let { id } = req.params;
    let postid = posts.find((p) => id === p.id);
    console.log(postid);
    res.render("detail.ejs", { postid })
});

app.patch("/home/:id", (req, res) => {
    let { id } = req.params;
    let content = req.body.area;
    let postid = posts.find((p) => id === p.id);
    postid.area = content;
    console.log(postid);
    res.redirect("/");
});

app.delete("/home/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/");
})

app.get("/home/:id/edit", (req, res) => {
    let { id } = req.params;
    let postid = posts.find((p) => id === p.id);
    res.render("edit.ejs", { postid });
});
