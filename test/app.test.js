const app = require("../app");
const request = require("supertest");

// do i need to tear it down everytime

// get, post, put, delete

describe("Pokemon routes", () => {
  it("GET /pokemon should return all pokemon objects", async () => {
    const requestBody = {
      id: 2,
      name: { english: "postPokemon" },
      type: ["Electric"],
      base: {
        HP: 1,
        Attack: 1,
        Defense: 1,
        SpAttack: 1,
        SpDefence: 1,
        Speed: 1
      }
    };

    // .set('Content-Type', 'application/json')
    
    await request(app)
      .post("/pokemon")
      .send(requestBody);

    const response = await request(app).get("/pokemon");
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(requestBody.id);
    expect(response.body.name.english).toEqual(requestBody.name.english);
  });

  it("POST /pokemon should return a new pokemon object", async () => {
    const requestBody = {
      id: 2,
      name: { english: "postPokemon" },
      type: ["Electric"],
      base: {
        HP: 1,
        Attack: 1,
        Defense: 1,
        SpAttack: 1,
        SpDefence: 1,
        Speed: 1
      }
    };

    const response = await request(app)
      .post("/pokemon")
      .send(requestBody);

    expect(response.status).toEqual(201);
    expect(response.body.name.english).toEqual(requestBody.name.english);
  });
});
