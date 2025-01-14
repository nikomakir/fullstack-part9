import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'Malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);

  res.send({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  const daily_exercises = req.body.daily_exercises;
  const target = req.body.target;
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.map(Number).some(isNaN)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  };

  res.send(calculateExercises(daily_exercises.map(Number), Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
