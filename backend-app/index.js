const express = require("express");
const bookRouter = require("./routes/book-router");

const app = express();
const port = process.env.PORT || 3000;

app.use("/api", bookRouter);
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.send("Welcom to kr-workshops-backend");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
