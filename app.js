const express = require("express");
const pokemonRouter = require("./routes/pokemonRouter");

const app = express();

app.use(express.json());
app.get("/", (req, res) => res.send("Hello world"));
app.use("/pokemon", pokemonRouter);

app.use((err, res, req, next) => {
  console.log("error", err);
  res.sendStatus(500);
});

module.exports = app;
