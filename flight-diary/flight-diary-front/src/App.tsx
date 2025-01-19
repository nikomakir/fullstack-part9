import React, { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import axios from 'axios';


const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, []);

  const newDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date,
      visibility,
      weather,
      comment
    }).then(data => {
      setDiaries(diaries.concat(data));
      setDate('');
      setComment('');
      setVisibility('');
      setWeather('');
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      } else {
        console.log(error);
        setError('Unknown error occured');
      }
      setTimeout(() => {
        setError('');
      }, 5000);
    })
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={newDiary}>
        <div>
          date<input type='date'
          onChange={({ target }) => setDate(target.value)}
          value={date} required />
        </div>
        <div>
          visibility great
          <input type='radio' name='visibility' onChange={() => setVisibility('great')}/>
          good<input type='radio' name='visibility' onChange={() => setVisibility('good')}/>
          ok<input type='radio' name='visibility' onChange={() => setVisibility('ok')}/>
          poor<input type='radio' name='visibility' onChange={() => setVisibility('poor')}/>
        </div>
        <div>
          weather sunny
          <input type='radio' name='weather' onChange={() => setWeather('sunny')}/>
          rainy<input type='radio' name='weather' onChange={() => setWeather('rainy')}/>
          cloudy<input type='radio' name='weather' onChange={() => setWeather('cloudy')}/>
          stormy<input type='radio' name='weather' onChange={() => setWeather('stormy')}/>
          windy<input type='radio' name='weather' onChange={() => setWeather('windy')}/>
        </div>
        comment<input value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>
        {diaries.map((d) => (
          <div key={d.id}>
          <h3>{d.date}</h3>
          <p>
            visibility: {d.visibility}<br/>
            weather: {d.weather}
          </p>
          </div>
        ))}
    </div>
  )
};

export default App
