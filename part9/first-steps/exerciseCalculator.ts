interface ParsedArguments {
	validatedTarget: number;
	validatedDailyExerciseHours: Array<number>;
}

interface ResultInterface {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export function ValidateInput(target: number, dailyExerciseHours:  Array<number> ): ParsedArguments { 
	if (isNaN(target)) {
		throw new Error('malformatted parameters');
	}
	if (dailyExerciseHours.some(isNaN)) {
		throw new Error('malformatted parameters');
	}
	if (target < 0) {
		throw new Error('malformatted parameters');
	}
	if (dailyExerciseHours.some((element) => element < 0)) {
		throw new Error('malformatted parameters');
	}
	return {
		validatedTarget: target,
		validatedDailyExerciseHours: dailyExerciseHours
	};
}

export const calculateExercises = (target: number, dailyExerciseHours:  Array<number>): ResultInterface => {
	let count = 0;
	dailyExerciseHours.forEach((element) => {
		if (element > 0) {
			count++;
		}
	});
	const periodLength: number = dailyExerciseHours.length;
	const trainingDays= count;
	// target = 2;
	const average: number = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
	const success: boolean = average >= target ? true : false;

	let rating: number;
	let description: string;

	if (average < target) {
		rating = 1;
		description = "You need to work harder!";
	} else if (average === target) {
		rating = 2;
		description = "You are doing good!";
	} else {
		rating = 3;
		description = "You are doing great!";
	}
	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		success: success,
		rating: rating,
		ratingDescription: description,
		target: target,
		average: average
	};
	
};