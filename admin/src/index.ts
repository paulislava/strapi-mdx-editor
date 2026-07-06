import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';

import { StrapiApp } from '@strapi/strapi/admin';

export default {
  register(app: StrapiApp) {
    app.customFields.register({
      name: 'mdx',
      pluginId: PLUGIN_ID,
      type: 'richtext',
      intlLabel: {
        id: 'mdx.field.label',
        defaultMessage: 'MDX',
      },
      intlDescription: {
        id: 'mdx.field.description',
        defaultMessage: 'Markdown with JSX',
      },

      components: {
        Input: async () =>
          import(/* webpackChunkName: "mdx-editor" */ './components/Editor/Editor') as any,
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTranslations = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: getTranslation(data),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return importedTranslations;
  },
};
