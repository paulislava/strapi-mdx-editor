import { PluginConfig } from '../constants';

export default {
  default: ({ env }) =>
    ({ typesUrl: env('MDX_TYPES_URL'), typesConfigs: undefined }) satisfies PluginConfig,
  validator: (config: PluginConfig) => {
    if (config.typesUrl && typeof config.typesUrl !== 'string') {
      throw new Error('config.mdx.typesUrl should be a string or undefined');
    }

    if (config.typesAuthHeader && typeof config.typesAuthHeader !== 'string') {
      throw new Error('config.mdx.typesAuthHeader should be a string or undefined');
    }

    if (config.typesAuthProxyToken && typeof config.typesAuthProxyToken !== 'string') {
      throw new Error('config.mdx.typesAuthProxyToken should be a string or undefined');
    }

    if (config.typesConfigs) {
      if (!Array.isArray(config.typesConfigs)) {
        throw new Error(`config.mdx.typesConfig should be an array of TypeConfig`);
      }

      config.typesConfigs.forEach((val, index) => {
        if (typeof val !== 'object' || !('url' in val)) {
          throw new Error(
            `config.mdx.typesConfig[${index}] should have type "object" and properties [url, authProxyToken (optional)]`
          );
        }

        if (typeof val.url !== 'string') {
          throw new Error(`config.mdx.typesConfig[${index}].url should be a string`);
        }

        if (val.authProxyToken && typeof val.authProxyToken !== 'string') {
          throw new Error(
            `config.mdx.typesConfig[${index}].authProxyToken should be a string or undefined`
          );
        }

        if (val.authHeader && typeof val.authHeader !== 'string') {
          throw new Error(
            `config.mdx.typesConfig[${index}].authHeader should be a string or undefined`
          );
        }
      });
    }
  },
};
