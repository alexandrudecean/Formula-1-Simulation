class TeamFactory {
    /**
     * Creează un model de mașină.
     * @param {string} name - Numele modelului.
     * @param {number} power - Puterea motorului (CP).
     * @param {number} weight - Greutatea mașinii (kg).
     * @returns {Object} Modelul mașinii.
     */
    static createModel(name, power, weight) {
      return { name, power, weight };
    }
  
    /**
     * Creează o echipă de Formula 1.
     * @param {string} name - Numele echipei.
     * @param {Array<Object>} models - Modelele echipei.
     * @returns {Object} Echipa.
     */
    static createTeam(name, models) {
      return { team: name, models };
    }
  }
  
  module.exports = TeamFactory;
  