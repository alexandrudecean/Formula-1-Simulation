const request = require("supertest");
const app = require("../server"); // Importă serverul tău

test("Returnează echipele din API", async () => {
  const response = await request(app).get("/api/teams");
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThan(0); // Verifică dacă există echipe
});
