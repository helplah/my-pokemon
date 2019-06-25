const express = require("express");
const router = express.Router();
const controller = require("../pokemon.controller");

router.get("/", async (req, res) => {
  const foundAllPokemon = await controller.findAll().catch(err => {
    console.log(err);
    next(err);
  });

  // console.log("foundAllPokemon", foundAllPokemon);
  res.status(200).send(foundAllPokemon);
});

router.post("/", async (req, res, next) => {
  // console.log(req.body);

  const newPokemon = await controller.insertOne(req.body).catch(err => {
    console.log(err);
    next(err);
  });

  res.status(201).send(newPokemon);
});

module.exports = router;
