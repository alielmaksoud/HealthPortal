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
// Ideally should like this
router.get('/api/tables/:tableName', db.getTable);

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