function calculateMaxSpeed({ power, weight, tireSpeedFactor, downforceFactor, weatherPenalty, drsSpeedBonus }) {
    return (power / weight) * tireSpeedFactor * downforceFactor * weatherPenalty + drsSpeedBonus;
  }
  
  function calculateLapTime({ length_km, averageSpeed, weight, turns, weather, tireSpeedFactor }) {
    return (
      (length_km / averageSpeed) * 3600 +
      turns * (weight / 800) * (weather === "ploaie" ? 1.2 : 1.0) * (1 / tireSpeedFactor) * (turns > 20 ? 1.1 : 1.0)
    );
  }
  
  module.exports = {
    calculateMaxSpeed,
    calculateLapTime,
  };
  