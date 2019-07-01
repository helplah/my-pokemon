require("../src/utils/db");
const { MongoClient } = require("mongodb");
const app = require("../src/app");
const request = require("supertest");
const pokemonData = require("../data/pokemon.data");

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

  beforeEach(async () => {
    await db.dropDatabase();
  });

  it("GET / should return Hello world", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Hello world");
  });

  describe("/pokemon", () => {
    it("/GET should find all pokemon from database", async () => {
      const collection = db.collection("pokemons");
      await collection.insertMany(pokemonData);

      const response = await request(app).get("/pokemon");
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(pokemonData);
    });

    it("/POST should create a pokemon in database", async () => {
      const onePokemon = pokemonData[pokemonData.length - 1];
      const collection = db.collection("pokemons");
      await collection.insertOne(onePokemon);

      const response = await request(app)
        .post("/pokemon")
        .send(onePokemon);

      expect(response.status).toEqual(201);
      expect(response.body.id).toEqual(onePokemon.id);
      expect(response.body.name.english).toEqual(onePokemon.name.english);
    });
  });

  describe("/pokemon/:id", () => {
    const id = 25; // Pikachu id

    it("/GET should return a pokemon", async () => {
      const collection = db.collection("pokemons");
      await collection.insertMany(pokemonData);
      const response = await request(app).get(`/pokemon/${id}`);

      expect(response.status).toEqual(200);
      expect(response.body.name.english).toEqual("Pikachu");
    });

    it("/PUT should modify a pokemon from database", async () => {
      const collection = db.collection("pokemons");
      await collection.insertMany(pokemonData);
      const response = await request(app)
        .put(`/pokemon/${id}`)
        .send({ "base.HP": 1 });

      expect(response.status).toEqual(200);
      expect(response.body.name.english).toEqual("Pikachu");
      expect(response.body.base.HP).toEqual(1);
    });

    it("/DELETE should remove a pokemon from database", async () => {
      const collection = db.collection("pokemons");
      await collection.insertMany(pokemonData);
      const response = await request(app).delete(`/pokemon/${id}`);

      expect(response.status).toEqual(200);
      expect(response.body.name.english).toEqual("Pikachu");
    });
  });
});
