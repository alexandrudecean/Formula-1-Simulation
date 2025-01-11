const { calculateLapTime } = require("../utils/simulationUtils");

test("Calculează corect timpul pe tur", () => {
  const result = calculateLapTime(5.891, 220, 18, 1.2);
  expect(result).toBeCloseTo(95.22, 2); // Aproximativ 95.22 secunde
});
