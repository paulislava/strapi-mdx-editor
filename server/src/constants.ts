import { PLUGIN_ID } from './pluginId';

export const fragmentTypeId = `plugin::${PLUGIN_ID}.fragment`;

export type TypeConfig = {
  url: string;
  authProxyToken?: string;
  authHeader?: string;
};

export type PluginConfig = {
  typesUrl?: string;
  typesAuthProxyToken?: string;
  typesAuthHeader?: string;
  typesConfigs?: TypeConfig[];
};

export function getConfigValue<T>(key: keyof PluginConfig): T {
  return strapi.plugin(PLUGIN_ID).config(key);
}
