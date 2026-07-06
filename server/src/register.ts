import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from './pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({ name: 'mdx', type: 'richtext', plugin: PLUGIN_ID });
};

export default register;
