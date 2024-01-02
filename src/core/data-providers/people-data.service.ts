import axios from 'axios';
import { type Person, type PersonForm } from '~/shared/models/person.model';

const BASE_URL = import.meta.env.VITE_SERVER;

export const getPeopleRandom = async () => (await axios.get<Person>(`${BASE_URL}/peoples/random`)).data;

export const getPeople = async () => (await axios.get<Person[]>(`${BASE_URL}/peoples`)).data;

export const deletePerson = async (personId: string) => (await axios.delete<void>(`${BASE_URL}/peoples/${personId}`)).data;

export const postPerson = async (person: PersonForm) => await axios.post<void>(`${BASE_URL}/peoples`, person);
