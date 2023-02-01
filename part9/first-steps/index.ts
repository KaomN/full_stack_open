import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ValidateInput } from './exerciseCalculator';
const app = express();
app.use(express.json());

// 9.4 Express
app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

// 9.5 WebBMI
app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);
	if (isNaN(height) || isNaN(weight)) {
		res.status(400).send({ error: 'malformatted parameters' });
	} else {
		const bmi = calculateBmi(height, weight);
		res.send({ weight, height, bmi });
	}
});

// 9.7 WebExercises
app.post('/exercises', (req, res) => {
	//eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;
	if (!daily_exercises || !target) {
		res.status(400).send({ error: 'parameters missing' });
	}
	try {
		const {validatedTarget, validatedDailyExerciseHours} = ValidateInput(target, daily_exercises);
		res.send(calculateExercises(validatedTarget, validatedDailyExerciseHours));
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});