var express = require("express");
var router = express.Router();
const vendorController = require("./vendor.controller");
//get all vendors

router.get("/", vendorController.getAllVendors);

//get vendor by id
router.get("/");

//get vendor by id
// router.get("/:id")

//insert vendor
router.post("/", vendorController.insertVendor);

//update vendor
// router.put("/:id")

// delete vendor
router.delete("/:id", vendorController.deleteVendor);

module.exports = router;
