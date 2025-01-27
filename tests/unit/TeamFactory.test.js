const TeamFactory = require("../../backend/factories/TeamFactory");

describe("TeamFactory", () => {
  it("should create a car model object", () => {
    const model = TeamFactory.createModel("W15", 1060, 798);
    expect(model).toEqual({ name: "W15", power: 1060, weight: 798 });
  });

  it("should handle invalid inputs gracefully", () => {
    const model = TeamFactory.createModel(null, null, null);
    expect(model).toEqual({ name: null, power: null, weight: null });
  });
});
