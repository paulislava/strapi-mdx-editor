export default [
  {
    method: 'GET',
    path: '/components',
    handler: 'components.index',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/fragments',
    handler: 'fragment.findMany',
    config: {
      auth: false,
    },
  },
];
