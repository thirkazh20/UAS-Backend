// import PatientController
const PatientController = require('../Controller/PatientController');

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.index);

// Route untuk menambahkan data patient
router.post("/patients", PatientController.store);

//Route untuk mengedit data patient
router.put("/patients/:id", PatientController.update);

//Route untuk menghapus data patient
router.delete("/patients/:id", PatientController.destroy);

//Route untuk menemukan data patient
router.get("/patients/:id", PatientController.show);

//Route untuk menampilkan data patient dengan status dead
router.get("/patients/status/dead", PatientController.showDead);

//Route untuk menampilkan data patient dengan status positive
router.get("/patients/status/positive", PatientController.showPositive);

//Route untuk menampilkan data patient dengan status recovered
router.get('/patients/status/recovered', PatientController.showRecovered);

// export router
module.exports = router;
