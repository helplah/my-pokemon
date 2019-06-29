const express = require("express");
const router = express.Router();
const controller = require("../pokemon.controller");

router.get("/", async (req, res, next) => {
  const getAllPokemon = await controller.findAll().catch(err => {
    console.log(err);
    next(err);
  });

  res.status(200).send(getAllPokemon);
});

router.post("/", async (req, res, next) => {
  const postOnePokemon = await controller.insertOne(req.body).catch(err => {
    console.log(err);
    next(err);
  });

  res.status(201).send(postOnePokemon);
});

router.get("/:id", async (req, res, next) => {
  const getOnePokemon = await controller.findOne(req.params.id).catch(err => {
    console.log(err);
    next(err);
  });

  res.status(200).send(getOnePokemon);
});

router.put("/:id", async (req, res, next) => {
  const updateOnePokemon = await controller
    .updateOne(req.params.id, req.body)
    .catch(err => {
      console.log(err);
      next(err);
    });

  res.status(200).send(updateOnePokemon);
});

router.delete("/:id", async (req, res, next) => {
  const deleteOnePokemon = await controller
    .deleteOne(req.params.id)
    .catch(err => {
      console.log(err);
      next(err);
    });

  res.status(200).send(deleteOnePokemon);
});

module.exports = router;
