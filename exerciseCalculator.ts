interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: number[], target: number) : Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));