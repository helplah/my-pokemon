require("./pokemon.model");
const mongoose = require("mongoose");

const PokemonModel = mongoose.model("Pokemon");

const findAll = async () => {
  try {
    return await PokemonModel.find();
  } catch (err) {
    console.log("err", err);
  }
};

const findOne = async id => {
  try {
    const pokemonId = { id };
    return await PokemonModel.findOne(pokemonId);
  } catch (err) {
    console.log("err", err);
  }
};

const insertOne = async pokemon => {
  try {
    const newPokemon = new PokemonModel(pokemon);
    return await newPokemon.save();
  } catch (err) {
    console.log("err", err);
  }
};

const updateOne = async (id, payload) => {
  try {
    const pokemonId = { id };
    return await PokemonModel.findOneAndUpdate(pokemonId, payload, {
      new: true
    });
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  findAll,
  findOne,
  insertOne,
  updateOne
};

// updateOne, deleteOne
