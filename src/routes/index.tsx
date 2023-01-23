import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler<void> = async ({ response }) => {
  throw response.redirect('/peoples/random', 302);
};

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
