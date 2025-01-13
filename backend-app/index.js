const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const bookRouter = require("./routes/book-router");
const warehouseDetailRouter = require("./routes/warehouse-detail-router");
const authRouter = require("./routes/auth-router");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", bookRouter);
app.use("/api", warehouseDetailRouter);
app.use("/api", authRouter);
app.get("/", (req, res) => {
  res.send("Welcom to kr-workshops-backend");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
