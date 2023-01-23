import { $, component$, useStore, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import { retrieveRandomPerson } from '~/core/providers/people.service';
import { MuiPeopleCard, MuiRandomButton } from '~/integrations/react/ui-react';
import { Person } from '~/shared/models/person.model';

import peopleStyle from './index.css?inline';

export function useRandomPerson() {
  const peopleStore = useStore({ people: null as unknown as Person });
  const queryStore = useStore({ query: retrieveRandomPerson() });

  useTask$(async ({ track }) => {
    track(() => queryStore.query);
    peopleStore.people = await queryStore.query;
  });

  return { queryStore, people: peopleStore.people };
}

export default component$(() => {
  useStylesScoped$(peopleStyle);
  const { queryStore, people } = useRandomPerson();
  const retrieveNewRandomPerson = $(() => (queryStore.query = retrieveRandomPerson()));

  return (
    <>
      {people && (
        <article class="random-people-page">
          <div class="random-people-page__container-card">
            <MuiPeopleCard client:visible person={people} onDelete$={retrieveNewRandomPerson} />
          </div>
          <span class="random-people-page__container-button ">
            <MuiRandomButton client:visible onClick$={retrieveNewRandomPerson} />
          </span>
        </article>
      )}
    </>
  );
});
