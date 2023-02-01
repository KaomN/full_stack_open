import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatientData, NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';
import { v1 as uuid } from 'uuid';

// const patients: Array<Patient> = patientData;

const patients: Patient[] = patientData.map(obj => {
	const object = toNewPatientEntry(obj) as Patient;
	object.id = obj.id;
	return object;
});

const getEntries = (): Array<NonSensitivePatientData> => {
	return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries
	}));
};

const findById = (id: string): Patient | undefined => {
	const entry = patients.find(p => p.id === id);
	return entry;
};


const addEntry = (patient: NewPatientEntry ): Patient => {
	const id = uuid();
	const newPatient = { id, ...patient };
	patientData.push(newPatient);
	return newPatient;
};

export default {
	getEntries,
	addEntry,
	findById
};