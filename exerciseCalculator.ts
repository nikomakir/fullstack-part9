interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  exercises: number[];
}

const parseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const values = args.slice(2);

  values.forEach((arg) => {
    if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!');
  })

  const argsAsNumbers = values.map(Number);

  return { target: argsAsNumbers[0], exercises: argsAsNumbers.slice(1) }
}

const calculateExercises = (days: number[], target: number): Result => {
  const periodLength = days.length;
  const trainingDays = days.filter((hours) => hours != 0).length;
  const average = days.reduce((a, b) => a + b) / periodLength;
  const success = average > target;
  let rating = 1;
  let ratingDescription = '';

  if (success) {
    rating = 3;
  } else if (average > target / 2) {
    rating = 2;
  }

  switch(rating) {
    case 3:
      ratingDescription = 'Great job!';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;
    default:
      ratingDescription = 'try better next time';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, exercises } = parseArgs(process.argv);
  console.log(calculateExercises(exercises, target));
}  catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message)
  }
}
