const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/book-router");
const warehouseDetailRouter = require("./routes/warehouse-detail-router");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", bookRouter);
app.use("/api", warehouseDetailRouter);
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.send("Welcom to kr-workshops-backend");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
