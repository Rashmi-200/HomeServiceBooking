const express = require("express");
const router =express.Router();

//Insert Model
const complaint = require("../Model/ComplaintModel");
//Insert Complaint controller
const ComplaintController = require("../Controllers/ComplaintController");
router.get("/",ComplaintController.getAllComplaints);//worked
router.post("/",ComplaintController.addComplaints);//worked
router.get("/:id",ComplaintController.getById);//worked
router.put("/:id",ComplaintController.updateComplaint);//worked
router.delete("/:id",ComplaintController.deleteComplaint);//worked

//export
module.exports =router;