import { PersonForm } from '~/shared/models/person.model';
import { deletePerson, getPeople, getPeopleRandom, postPerson } from '../data-providers/people-data.service';

export const retrieveRandomPerson = () => getPeopleRandom();
export const retrievePeople = () => getPeople();

export const removePerson = (personId: string) => deletePerson(personId).then(() => retrievePeople());

export const createPerson = (person: PersonForm) => postPerson(person).then(() => retrievePeople());
