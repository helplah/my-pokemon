require("./pokemon.model");
const mongoose = require("mongoose");

const PokemonModel = mongoose.model("Pokemon");

module.exports.findAll = async () => {
  try {
    return await PokemonModel.find();
  } catch (error) {
    console.log("err", error);
  }
};

module.exports.insertOne = async pokemon => {
  try {
    const newPokemon = new PokemonModel(pokemon);
    return await newPokemon.save();
  } catch (error) {
    console.log("err", error);
  }
};

// findOne, findAll, updateOne, deleteOne
