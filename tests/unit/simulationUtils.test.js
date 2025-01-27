const { calculateMaxSpeed, calculateLapTime } = require("../../backend/utils/simulationUtils");

describe("Simulation Utils", () => {
    describe("calculateMaxSpeed", () => {
        it("should calculate the correct max speed", () => {
          const params = {
            power: 1060,
            weight: 798,
            tireSpeedFactor: 6.04,
            downforceFactor: 6.00,
            weatherPenalty: 6.75,
            drsSpeedBonus: 15,
          };
    
          const maxSpeed = calculateMaxSpeed(params);
          expect(maxSpeed).toBeCloseTo(339.93, 2); 
        });
      });

      describe("calculateLapTime", () => {
        it("should calculate the correct lap time", () => {
          const params = {
            length_km: 5.891,
            averageSpeed: 225.5,
            weight: 798,
            turns: 18,
            weather: "soare",
            tireSpeedFactor: 6.04,
          };
      
          const lapTime = calculateLapTime(params);
          expect(lapTime).toBeCloseTo(97.02, 2); 
        });
    });
});
