import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import styles from './styles.css?inline';
import { Header } from '~/core/components/header/header';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};
export default component$(() => {
  useStyles$(styles);
  return (
    <main class="layout-page">
      <section class="layout-page__header">
        <Header />
      </section>
      <section class="layout-page__slot">
        <Slot />
      </section>
    </main>
  );
});
