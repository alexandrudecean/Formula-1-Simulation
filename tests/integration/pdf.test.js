const request = require("supertest");
const app = require("../../backend/server");
const fs = require("fs");

describe("POST /api/generate-pdf", () => {
  it("should generate a PDF successfully", async () => {
    const payload = {
      lapTime: "1:23.456",
      maxSpeed: "340.56",
      bestLapTime: "1:20.345",
      circuit: "Monaco",
      team: "Mercedes",
      model: "W15",
      downforce: "ridicat",
      weather: "soare",
      tires: "soft",
    };

    const response = await request(app)
      .post("/api/generate-pdf")
      .send(payload)
      .expect("Content-Type", /application\/pdf/);

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-disposition"]).toContain("attachment; filename=Formula1_Report.pdf");

    fs.writeFileSync("test_output.pdf", response.body);
  });

  it("should return 400 for missing required fields", async () => {
    const payload = {
      circuit: "Monaco",
      team: "Mercedes",
    };

    const response = await request(app).post("/api/generate-pdf").send(payload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
