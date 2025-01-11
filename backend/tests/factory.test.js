const TeamFactory = require("../factories/TeamFactory");

test("Creează corect un model de mașină", () => {
  const model = TeamFactory.createModel("W14", 1060, 798);
  expect(model).toEqual({ name: "W14", power: 1060, weight: 798 });
});

test("Creează corect o echipă", () => {
  const team = TeamFactory.createTeam("Mercedes", [
    TeamFactory.createModel("W14", 1060, 798),
  ]);
  expect(team.team).toBe("Mercedes");
  expect(team.models.length).toBe(1);
});
