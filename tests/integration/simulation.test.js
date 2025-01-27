const request = require("supertest");
const app = require("../../backend/server");

describe("POST /api/simulation", () => {
  it("should return lap time and max speed for valid data", async () => {
    const response = await request(app)
      .post("/api/simulation")
      .send({
        team: "Mercedes",
        model: "W15",
        circuit: "Monaco",
        weather: "soare",
        downforce: "ridicat",
        tires: "soft",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("lapTime");
    expect(response.body).toHaveProperty("maxSpeed");
    expect(typeof response.body.lapTime).toBe("string");
    expect(typeof response.body.maxSpeed).toBe("string");
  });

  it("should return an error for invalid team", async () => {
    const response = await request(app)
      .post("/api/simulation")
      .send({
        team: "Unknown Team",
        model: "W15",
        circuit: "Monaco",
        weather: "soare",
        downforce: "ridicat",
        tires: "soft",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "Echipă invalidă");
  });
});
