require("../models/pokemon.model");
const mongoose = require("mongoose");

const PokemonModel = mongoose.model("Pokemon");

const findAll = async () => {
  return await PokemonModel.find();
};

const findOne = async id => {
  const pokemonId = { id };
  return await PokemonModel.findOne(pokemonId);
};

const insertOne = async pokemon => {
  const newPokemon = new PokemonModel(pokemon);
  return await newPokemon.save();
};

const updateOne = async (id, payload) => {
  const pokemonId = { id };
  return await PokemonModel.findOneAndUpdate(pokemonId, payload, {
    new: true
  });
};

const deleteOne = async id => {
  const pokemonId = { id };
  return await PokemonModel.findOneAndDelete(pokemonId);
};

module.exports = {
  findAll,
  findOne,
  insertOne,
  updateOne,
  deleteOne
};
