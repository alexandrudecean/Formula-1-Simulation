const request = require("supertest");
const app = require("../server"); 

test("Returnează echipele din API", async () => {
  const response = await request(app).get("/api/teams");
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThan(0); 
});
