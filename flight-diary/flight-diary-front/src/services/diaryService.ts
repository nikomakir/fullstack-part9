import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createDiary = (object: NewDiaryEntry) => {
  return axios
    .post<NonSensitiveDiaryEntry>(baseUrl, object)
    .then(response => response.data)
}