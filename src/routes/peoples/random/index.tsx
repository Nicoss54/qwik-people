import { $, component$, useSignal, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import { retrieveRandomPerson } from '~/core/providers/people.service';
import { MuiPeopleCard, MuiRandomButton } from '~/integrations/react/ui-react';

import peopleStyle from './index.css?inline';
import { type Person } from '~/shared/models/person.model';

export function useRandomPerson() {
  const people = useSignal<Person | null>(null);

  useTask$(async () => {
    people.value = await retrieveRandomPerson();
  });

  return { people };
}

export default component$(() => {
  useStylesScoped$(peopleStyle);
  const { people } = useRandomPerson();
  const retrieveNewRandomPerson = $(async () => {
    return retrieveRandomPerson().then(person => (people.value = person));
  });

  return (
    <>
      {people.value && (
        <article class="random-people-page">
          <div class="random-people-page__container-card">
            <MuiPeopleCard client:visible person={people.value} onDelete$={retrieveNewRandomPerson} />
          </div>
          <span class="random-people-page__container-button ">
            <MuiRandomButton client:visible onClick$={retrieveNewRandomPerson} />
          </span>
        </article>
      )}
    </>
  );
});
