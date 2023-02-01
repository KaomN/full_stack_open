import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);
	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatient(req.body);
		const addedEntry = patientService.addEntry(newPatientEntry);
		res.json(addedEntry);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).send({ error: err.message });
		}
	}
});

export default router;