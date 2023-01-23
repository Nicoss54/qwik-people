import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

import headerStyle from './header.css?inline';

export const Header = component$(() => {
  useStylesScoped$(headerStyle);
  const location = useLocation();
  return (
    <header class="header-people">
      <img
        class="header-people__image"
        alt="sfeir-logo"
        height="120"
        width="125"
        src="/logo-sfeir.svg"
      />

      <ul role="list" class="header-people__menu">
        <li
          role="listitem"
          class={{
            'header-people__menu__item': true,
            active: location.pathname === '/peoples/random/'
          }}
        >
          <a href="/peoples/random">Random</a>
        </li>
        <li
          role="listitem"
          class={{
            'header-people__menu__item': true,
            active: location.pathname === '/peoples/list/'
          }}
        >
          <a href="/peoples/list">List</a>
        </li>
      </ul>
    </header>
  );
});
