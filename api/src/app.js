import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("An E-commerce application's api");
});

export default app;
