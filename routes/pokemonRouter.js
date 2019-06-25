const express = require("express");
const router = express.Router();
const pokemon = require("../pokemon");

router.get("/", async (req, res) => {
  console.log("get /");

  const foundAllPokemon = await pokemon.findAll().catch(err => {
    console.log(err);
    next(err);
  });

  res.status(200).send(foundAllPokemon);
});

router.post("/", async (req, res, next) => {
  // console.log(req.body);

  const newPokemon = await pokemon.insertOne(req.body).catch(err => {
    console.log(err);
    next(err);
  });

  res.status(201).send(newPokemon);
});

module.exports = router;
