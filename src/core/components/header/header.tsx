import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import ImgLogoSfeir from '~/media/logo-sfeir.svg?jsx';
import headerStyle from './header.css?inline';

export const Header = component$(() => {
  const location = useLocation();
  useStylesScoped$(headerStyle);
  return (
    <header class="header-people">
      <ImgLogoSfeir style={{ width: '100px', height: '100px' }} />
      <ul role="list" class="header-people__menu">
        <li
          role="listitem"
          class={{
            'header-people__menu__item': true,
            active: location.url.pathname === '/peoples/random/',
          }}
        >
          <a href="/peoples/random">Random</a>
        </li>
        <li
          role="listitem"
          class={{
            'header-people__menu__item': true,
            active: location.url.pathname === '/peoples/list/',
          }}
        >
          <a href="/peoples/list">List</a>
        </li>
      </ul>
    </header>
  );
});
