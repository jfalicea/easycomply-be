const vendorService = require("./vendor.service");

const getAllVendors = async (req, res) => {
  const allVendors = await vendorService.getAllVendors();
  res.status(200).json(allVendors);
};

const insertVendor = async (req, res) => {
  const { vendorName, risk, vendorDescription, vendorAnalysis } = req.body;
  const xx = await vendorService.insertVendor(
    vendorName,
    risk,
    vendorDescription,
    vendorAnalysis
  );
  res.status(200).json(xx);
};

const deleteVendor = async (req, res) => {
  const { id } = req.params;
  await vendorService.deleteVendor(parseInt(id));
  res.status(200).json("ok");
};

module.exports = {
  getAllVendors,
  insertVendor,
  deleteVendor,
};
