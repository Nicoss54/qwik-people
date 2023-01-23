import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { Header } from '~/core/components/header/header';

import layoutStyle from './layout.css?inline';

export default component$(() => {
  useStylesScoped$(layoutStyle);
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
