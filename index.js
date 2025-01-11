const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

app.set("View engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

dbConnect();

app.get("/", function (req, res) {
  res.render("LoginForm.ejs");
});

app.use("/newjoin", require("./routes/contactRoutes"));

app.listen(4000, () => {
  console.log("서버 가동");
});
