const pokemon = require("../pokemon");
const { MongoClient } = require("mongodb");

describe("insert", () => {
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

  it("insertOne and findOne should return one pokemon", async () => {
    const pikachu = {
      _id: "5d0b3dd4da9a863b78902c8b",
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

    await pokemon.insertOne(pikachu);
    const pokemonCollection = db.collection("pokemons");
    const mockPokemon = { id: 25 };

    const foundPokemon = await pokemonCollection.findOne(mockPokemon);
    expect(foundPokemon.name.english).toEqual("Pikachu");
  });
});
