import type { Context } from 'koa';
import { PLUGIN_ID } from '../pluginId';

export default () => ({
  async findMany(ctx: Context) {
    const { query } = ctx.request;

    const fragments = strapi.plugin(PLUGIN_ID).service('fragments');
    const body = await fragments.findMany(query);

    ctx.send(body);
  },

  async findOne(ctx: Context) {
    const { id } = ctx.params;

    const fragments = strapi.plugin(PLUGIN_ID).service('fragments');
    const body = await fragments.findOne(id);

    ctx.send(body);
  },
});
