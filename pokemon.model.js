require("./db");
const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, require: true, unique: true },
  name: { english: String, japanese: String, chinese: String },
  type: [{ type: String, require: true }],
  base: {
    HP: { type: Number, require: true },
    Attack: { type: Number, require: true },
    Defense: { type: Number, require: true },
    SpAttack: { type: Number, require: true },
    SpDefence: { type: Number, require: true },
    Speed: { type: Number, require: true }
  }
});

mongoose.model("Pokemon", pokemonSchema);
