import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	return ssn;
};


const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
		throw new Error('Incorrect or missing date of birth');
	}
	return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error(`Incorrect or missing gender`);
	}
	return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatientEntry => {
	const newEntry: NewPatientEntry = {
		name: parseName(object.name),
		ssn: parseSsn(object.ssn),
		dateOfBirth: parseDateOfBirth(object.dateOfBirth),
		occupation: parseOccupation(object.occupation),
		gender: parseGender(object.gender),
	};
	return newEntry;
};

export default toNewPatient;