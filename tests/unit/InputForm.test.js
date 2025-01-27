const validateForm = (formData) => {
    const errors = {};
    if (!formData.team) errors.team = "Selectați o echipă.";
    if (!formData.model) errors.model = "Selectați un model.";
    if (!formData.circuit) errors.circuit = "Selectați un circuit.";
    if (!formData.weather) errors.weather = "Selectați condițiile meteo.";
    if (!formData.tires) {
      errors.tires = "Selectați pneurile.";
    } else if (
      (formData.weather === "ploaie" && !["inters", "wet"].includes(formData.tires)) ||
      (formData.weather === "soare" && ["inters", "wet"].includes(formData.tires))
    ) {
      errors.tires = "Selectați pneurile corecte pentru condiții meteo.";
    }
    return errors;
  };
  
  describe("Form Validation", () => {
    it("should return errors if required fields are missing", () => {
      const formData = {
        team: "",
        model: "",
        circuit: "",
        weather: "",
        tires: "",
      };
      const errors = validateForm(formData);
      expect(errors).toEqual({
        team: "Selectați o echipă.",
        model: "Selectați un model.",
        circuit: "Selectați un circuit.",
        weather: "Selectați condițiile meteo.",
        tires: "Selectați pneurile.",
      });
    });
  
    it("should pass if all fields are filled", () => {
      const formData = {
        team: "Mercedes",
        model: "W15",
        circuit: "Monaco",
        weather: "soare",
        tires: "soft",
      };
      const errors = validateForm(formData);
      expect(errors).toEqual({});
    });
  
    it("should return an error if tires are invalid for the weather", () => {
      const formData = {
        team: "Red Bull",
        model: "RB20",
        circuit: "Suzuka",
        weather: "ploaie",
        tires: "soft", // Invalid for "ploaie"
      };
      const errors = validateForm(formData);
      expect(errors).toEqual({
        tires: "Selectați pneurile corecte pentru condiții meteo.",
      });
    });
  
    it("should pass if tires are valid for the weather", () => {
      const formData = {
        team: "Red Bull",
        model: "RB20",
        circuit: "Suzuka",
        weather: "ploaie",
        tires: "wet", // Valid for "ploaie"
      };
      const errors = validateForm(formData);
      expect(errors).toEqual({});
    });
  });
  