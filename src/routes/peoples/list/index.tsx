import { $, component$, QRL, Resource, useResource$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { createPerson, removePerson, retrievePeople } from '~/core/providers/people.service';
import { DialogPersonForm, MuiAddButton, MuiCircular, MuiPeopleCard } from '~/integrations/react/ui-react';
import { Person, PersonForm } from '~/shared/models/person.model';

import listStyle from './index.css?inline';

export function useListPeople() {
  const peopleStore = useStore({ people: [] as Person[] });

  const peopleResource = useResource$<Person[]>(() => retrievePeople().then(people => (peopleStore.people = people)));

  const deletePerson = $((personId: string) => removePerson(personId!).then(people => (peopleStore.people = people)));

  const addPerson = $((data: PersonForm) => createPerson(data).then(people => (peopleStore.people = people)));

  return { deletePerson, peopleStore, peopleResource, addPerson };
}

export function useDialog<T>(callbackClosing: QRL<(data: T) => Promise<any>>) {
  const dialogStore = useStore({ isOpen: false });

  const closeDialog = $((data?: T) => {
    Boolean(data) ? callbackClosing(data!).then(() => (dialogStore.isOpen = false)) : (dialogStore.isOpen = false);
  });

  return { dialogStore, closeDialog };
}

export default component$(() => {
  useStylesScoped$(listStyle);
  const { deletePerson, peopleStore, peopleResource, addPerson } = useListPeople();
  const { dialogStore, closeDialog } = useDialog<PersonForm>(addPerson);

  return (
    <Resource
      value={peopleResource}
      onPending={() => <MuiCircular />}
      onRejected={() => <div>An Error occurred</div>}
      onResolved={() => {
        return (
          <>
            <article class="people-list-page">
              {peopleStore.people.map(person => (
                <div class="people-list-page__card-person">
                  <MuiPeopleCard client:visible person={person} onDelete$={deletePerson} />
                </div>
              ))}
              <div class="people-list-page__add-button">
                <MuiAddButton client:visible onClick$={() => (dialogStore.isOpen = true)} />
              </div>
            </article>
            <DialogPersonForm client:visible open={dialogStore.isOpen} onClose$={closeDialog} />
          </>
        );
      }}
    ></Resource>
  );
});
