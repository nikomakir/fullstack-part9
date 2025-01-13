const calculateBmi = (height: number, mass: number) : string => {
  const bmi = mass / (height / 100) **2;

  if (bmi < 18.4) {
    return 'Underweight';
  } else if (bmi < 24.9) {
    return 'Normal range';
  } else if (bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

console.log(calculateBmi(180, 74));