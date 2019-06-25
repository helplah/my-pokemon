const controller = require("../pokemon.controller");
const { MongoClient } = require("mongodb");

describe("Pokemon", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const mongoURI = global.__MONGO_URI__;
    console.log(mongoURI);
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true
    });

    const uriArray = mongoURI.split("/");
    const dbName = uriArray[uriArray.length - 1];
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  describe("/pokemon", () => {
    it("/GET should return all pokemon from database", () => {});

    it("/POST should create a pokemon in database", () => {});
  });

  describe("/pokemon/:id", () => {
    it("/GET should return a pokemon", async () => {
      const pikachu = {
        id: 25,
        name: { english: "Pikachu", japanese: "ピカチュウ", chinese: "皮卡丘" },
        type: ["Electric"],
        base: {
          HP: 35,
          Attack: 9999,
          Defense: 40,
          SpAttack: 50,
          SpDefence: 50,
          Speed: 90
        }
      };

      await controller.insertOne(pikachu);
      const pokemonCollection = db.collection("pokemons");
      const mockPokemon = { id: 25 };

      const foundPokemon = await pokemonCollection.findOne(mockPokemon);
      expect(foundPokemon.name.english).toEqual("Pikachu");
    });

    it("/PUT should modify a pokemon from database", () => {});

    it("/DELETE should remove a pokemon from database", () => {});
  });
});
