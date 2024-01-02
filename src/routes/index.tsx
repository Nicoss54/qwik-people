import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ redirect }) => {
  throw redirect(302, '/peoples/random/');
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
