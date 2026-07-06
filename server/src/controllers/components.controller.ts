import { TypeConfig, getConfigValue } from '../constants';
import { PLUGIN_ID } from '../pluginId';
import merge from 'deepmerge';

const fetchStandComponents = async (url: string | URL, authHeader?: string) => {
  try {
    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: authHeader ? authHeader : undefined,
      },
      redirect: 'manual',
    });

    if (!result.ok) {
      console.error(
        `Error while fetch components from ${url} with status ${result.status} ${result.statusText}`
      );
      return null;
    }

    const parsed = await result.json();

    return parsed;
  } catch (e) {
    console.error(`Error while fetch components from ${url}:`, e);
    return null;
  }
};

const authProxyTokenQuery = 'pr_auth_proxy_token';

export default () => ({
  index: async function fetchComponents(ctx: { send(val: any): void }) {
    const configUrl: string = getConfigValue('typesUrl');
    const authHeader: string = getConfigValue('typesAuthHeader');

    const typesConfigs: TypeConfig[] = getConfigValue('typesConfigs');

    if (!configUrl && !typesConfigs) {
      throw new Error(`mdx.config.typesUrl and mdx.config.typesConfigs weren't defined!`);
    }

    if (typesConfigs && Array.isArray(typesConfigs) && typesConfigs.length > 0) {
      const componentInfos: Record<string, any>[] = await Promise.all(
        typesConfigs.map(async (config) => {
          const typesUrl = new URL(config.url);
          if (config.authProxyToken) {
            typesUrl.searchParams.set(authProxyTokenQuery, config.authProxyToken as string);
          }

          return fetchStandComponents(typesUrl, config.authHeader);
        })
      );

      const mergedComponentInfos = componentInfos
        .filter(Boolean)
        .reduce((acc, current) => merge(acc, current), {});
      ctx.send(mergedComponentInfos);

      return;
    } else if (!configUrl) {
      throw new Error(`mdx.config.typesUrl and mdx.config.typesConfigs weren't defined properly!`);
    }

    const authProxyToken: string =
      getConfigValue('typesAuthProxyToken') || process.env.FRONTEND_AUTH_PROXY_TOKEN;

    const finalUrl = new URL(configUrl);

    if (authProxyToken) {
      finalUrl.searchParams.set(authProxyTokenQuery, authProxyToken);
    }

    console.log(`MDX Types Url: `, configUrl);

    const mdxComponents = await fetchStandComponents(finalUrl, authHeader);

    ctx.send(mdxComponents);
  },
});
