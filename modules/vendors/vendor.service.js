const db = require("../../bin/db");

const vendorService = {
  getAllVendors: async function () {
    const dbQuery = `SELECT * FROM "vendorRisk"`;
    const getQuery = db.query(dbQuery);
    return getQuery;
  },
  insertVendor: async function (
    vendorName,
    risk,
    vendorDescription,
    vendorAnalysis
  ) {
    const risks = Object.values(risk).map((value) => convertRiskWord(value));
    const riskAverage = risks.reduce((a, b) => a + b) / risks.length;
    const riskAverageWord = convertRiskValue(riskAverage);
    const dbQuery = `INSERT INTO "vendorRisk" ("vendorName","vendorDescription","vendorAnalysis","vendorRisk","stratRisk", "operRisk", "finRisk", "compRisk", "repRisk", "legalRisk") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning "id","vendorName","vendorDescription","vendorAnalysis","vendorRisk","stratRisk", "operRisk", "finRisk", "compRisk", "repRisk", "legalRisk"`;
    const insertQuery = await db.query(dbQuery, [
      vendorName,
      vendorDescription,
      vendorAnalysis,
      riskAverageWord,
      risk.stratRisk,
      risk.operRisk,
      risk.finRisk,
      risk.compRisk,
      risk.repRisk,
      risk.legalRisk,
    ]);
    if (insertQuery.length >= 1) {
      return insertQuery[0];
    } else {
      return "oops";
    }
  },

  deleteVendor: async function (id) {
    const dbQuery = `DELETE FROM "vendorRisk" WHERE id=$1 `;
    const deleteQuery = db.query(dbQuery, [id]);
    return "ok";
  },
};

const convertRiskWord = function (riskWord) {
  switch (riskWord.toLowerCase()) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      break;
  }
};

const convertRiskValue = function (riskValue) {
  switch (Math.round(riskValue)) {
    case 1:
      return "low";
    case 2:
      return "medium";
    case 3:
      return "high";
    default:
      break;
  }
};

module.exports = vendorService;
