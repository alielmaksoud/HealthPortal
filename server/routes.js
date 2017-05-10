var express = require('express');
var router = express.Router();

var db = require('./queries');


// return all recent info of a doctor, including name, patients 
router.get('/api/doctors/:docId', db.getDoctor);
// return all info of a patient
router.get('/api/patients/:patientId', db.getPatient);

/*
	Admin
 */

// Read
router.get('/api/tables', db.getTables);
router.get('/api/doctors', db.getTable("doctors"));
router.get('/api/patients', db.getTable("patients"));
router.get('/api/heartRates', db.getTable("heart_rate"));
router.get('/api/temperature', db.getTable("temperature"));
router.get('/api/patientsDoctors', db.getTable("patients_doctors"));

// Create
router.post('/api/tables/:tableId/row', db.addRow);
router.post('/api/tables/:tableId/col', db.addCol);

// Update
// column name cannot be changed
router.put('/api/tables/:tableId/row', db.updateInfo);

//Delete
router.delete('/api/tables/:tableId/row', db.delRow);
router.delete('/api/tables/:tableId/col', db.delCol);



router.get('/', function (req, res) {
    res.send({title: 'Welcome to HealthPortal'});
});

module.exports = router;