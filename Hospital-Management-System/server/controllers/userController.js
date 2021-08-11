const express = require("express");
const User = require("../models/user");
const shared = require("../shared");

const router = express.Router();

// Gets all patients
router.get("/users", (req, res) => {
    User.find((err, patients) => {
        return res.json(patients);
    });
});

// Gets a single patient from the database
router.get("/users/:id", function (req, res) {
    const id = { id: req.params.id };
    User.findOne(id, function (err, patient) {
        if (err) return res.json({ success: false, error: err });
        return res.json(patient);
    });
});

router.put("/users/:id", (req, res) => {
    const id = { id: req.params.id };
    const update = req.body;
    User.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// Add new Patient
router.post("/users", (req, res) => {    
    let user = new User();
    
    user.id = (shared.maxPatientId += 1);
    user.name = req.body.username
    user.password = req.body.password
    user.role = req.body.role
    
    user.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// delete a patient
router.delete("/users/:id", (req, res) => {
    const id = { id: req.params.id };
    Patient.findOneAndDelete(id, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});



router.get("/users/:id/admit", function (req, res) {
    const id = { id: req.params.id };
    const update = {
        admitted: true,
        dateAdmitted: Date.now()
    };
    User.findOneAndUpdate(id, update, function (err, patient) {
        if (err) return res.json({ success: false, error: err });
        return res.json(patient);
    });
});

router.get("/users/:id/discharge", function (req, res) {
    const id = { id: req.params.id };
    const update = {
        admitted: false,
        dateDischarged: Date.now(),
        //nurseId: null,
        //roomId: null
    };
    User.findOneAndUpdate(id, update, function (err, patient) {
        if (err) return res.json({ success: false, error: err });
        return res.json(patient);
    });
});


module.exports = router;