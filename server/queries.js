const promise = require('bluebird');
const config = require('./config');

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const db = pgp(config);

// Improve: indicate if there are more
// seems like only the owner of DB can query information.columns and get the column name
function getTable(req, res) {
	const table = {};
	const tableName = req.params.tableName;
	let sql = `SELECT * FROM ${tableName} LIMIT 25`;
	console.log(sql);
	db.any(sql)
	.then(data => {
		table.data = data;
		sql = `SELECT column_name FROM information_schema.columns WHERE table_name='${tableName}'`;
		return db.any(sql);
	})
	.then(data => {
		table.column_name = data;
		res.send(table);
	})
	.catch(err => {
		res.send({error: err});
	})
}

function getTables(req, res) {
	const schema = "public";
	db.any("SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema=$1", schema)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(404).send({error: err});
		})
}

function getDoctor(req, res) {
	console.log("Get Doctor", req.params.docId);
	const docId = req.params.docId;
	const data = {};
	const patientList = [];
	const batch = [];
	let k = 0;

	data.patients = [];
	data.doctor_id = docId;

	db.one("SELECT name FROM doctors WHERE doctor_id=$1", docId)
		.then(doc => {
			data.name = doc.name;
		})
		.catch(e => {
			res.status(401).send({error: e});
		});

	db.any("SELECT patient_id FROM patients_doctors WHERE doctor_id=$1", docId)
		.then(patients => {
			patients.map(i => {
				const patient = {};
				patientList.push(i.patient_id);
				patient.patient_id = i.patient_id;
				data.patients.push(patient);
			});
			patientList.map(i => {
				const info = `SELECT name FROM patients WHERE patient_id=${i}`;
				const heart_rate = `SELECT heart_rate, timestamp FROM heart_rate WHERE patient_id=${i} LIMIT 10`;
				const temperature = `SELECT temperature, timestamp FROM temperature WHERE patient_id=${i} LIMIT 10`;
				batch.push([info, heart_rate, temperature]);
			});
			return batch;
		})
		.then((batch) => {
			const numOfPatient = batch.length;
			return batch.map((p) => {
				db.task(t => {
					return t.batch(
						p.map( (i) => {
							return t.any(i);
						})
					);
				})
				.then(d => {
					data.patients[k].name = d[0][0].name;
					data.patients[k].temperature = d[2].map(i => {
						return {temperature: i.temperature, timestamp: i.timestamp};
					});
					data.patients[k++].heart_rate = d[1].map(i => {
						return {heart_rate: i.heart_rate, timestamp: i.timestamp};
					});
					if(numOfPatient === k) {
						k = 0;
						res.send(data);
					}
				})
			})
		})
		.catch(err => {
			console.log(err);
			res.status(404).send({error: err})
		});
}

function getPatient(req, res) {
	console.log("Get Patient", req.params.patientId);
	const patientId = req.params.patientId;
	const data = {};
	data.patientId = patientId;

	db.one("SELECT name FROM patients WHERE patient_id=$1", patientId)
	 .then (p => {
	 		data.name = p.name;
	 		data.med_rec_num = p.med_rec_num;

	 		return db.task(t => {
				return t.batch([
					t.any(`SELECT heart_rate, timestamp FROM heart_rate WHERE patient_id=${patientId}`),
					t.any(`SELECT temperature, timestamp FROM temperature WHERE patient_id=${patientId}`)
				])			
			})
	 })
	 .then(p => {
			const hr = p[0].map( h => {
				return { heart_rate: h.heart_rate, timestamp: h.timestamp }
			});
			const ts = p[1].map( t => {
				return {temperature: t.temperature, timestamp: t.timestamp}
			})
			data.heart_rate = hr;
			data.temperature = ts;
			res.send(data);
	 })
}

function addRow(req, res) {
	const table = req.body.table;
	const data = req.body.data;

	const head = `INSERT INTO ${table} VALUES`;
	const sql = buildQuery(head, data);

	console.log(sql);

	db.any(sql)
	.then(() => {res.status(201).send({Message: "Created"})})
  .catch(error => {res.status(400).send({error: error})});
}

// need to add colType check
// need to add column check
function addCol(req, res) {
	const table = req.body.table;
	const column = req.body.column;
	const colType = req.body.colType;

	let sql = `ALTER TABLE ${table} ADD COLUMN ${column} ${colType}`
	db.none(sql)
		.then( () => {
			res.status(201).send({message: "Created"});
		})
		.catch(err => {
			res.status(400).send({error: err});
		})
} 


function delRow(req, res) {
	const table = req.body.table;
	const column = req.body.column;
	const id = req.body.id;

	const sql = `DELETE FROM ${table} WHERE ${column}=${id}`
	db.none(sql)
		.then( () => {
			res.status(202).send({message: "Deleted"});
		})
		.catch(err => {
			res.status(400).send({error: err});
		})
}

function delCol(req, res) {
	const table = req.body.table;
	const column = req.body.column;
	let sql = `ALTER TABLE ${table} DROP COLUMN IF EXISTS ${column}`;

	db.none(sql)
		.then( () => {
			res.status(202).send({message: "Deleted"});
		})
		.catch(err => {
			res.status(400).send({error: err});
		})
}

// id cannot be updated
function updateInfo(req, res) {
	// data = [{column: column, data: data}]
	const table = req.body.table;
	const data = req.body.data;
	const id = req.body.id;

	const head = `UPDATE ${table} SET `;
	const tail = ` WHERE ${id.column}=${id.id}`;

	const sql = buildQuery(head, data, true) + tail;

	db.none(sql)
		.then( () => res.status(202).send({message: "Updated"}))
		.catch( (err) => { res.status(404).send({error: err})});
}

function buildQuery(q, arr, complex) {
	if(complex) {
		arr.map( (d, i) => {
			const string = d.column + " = " + addSingleQuote(d.data);
			q += string;
			if(i !== arr.length - 1) {
				q += ", "
			}
		})
	} else {
		q += " ("
		arr.map( (d, i) => {
			q += addSingleQuote(d);
			i === arr.length - 1? q += ")" : q += ", ";
		});
	}

	return q;
}

function addSingleQuote(s) {
	if(typeof s === 'string') {
		return "'" + s + "'";
	}

	return s;
}

module.exports = {
  getTable: getTable,
  getTables: getTables,
  getDoctor: getDoctor,
  getPatient: getPatient,
  addRow: addRow,
	addCol: addCol,
	delRow: delRow,
	delCol: delCol,
	updateInfo: updateInfo
};
