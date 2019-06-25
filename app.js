const express = require("express");
const app = express();
const pokemonRouter = require("./routes/pokemonRouter");

app.use(express.json());
app.use("/pokemon", pokemonRouter);

app.use((err, res, req, next) => {
  console.log("error", err);
  res.sendStatus(500);
});

module.exports = app;
