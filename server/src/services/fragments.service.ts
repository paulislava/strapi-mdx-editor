import { fragmentTypeId } from '../constants';

export const fragmentsService = {
  async findMany(query: unknown) {
    const results = await strapi.db?.query(fragmentTypeId).findMany({
      populate: ['Preview.url'],
      orderBy: { Weight: 'desc', id: 'desc' },
      ...strapi.get('query-params').transform(fragmentTypeId, query),
    });

    return results;
  },

  async findOne(id: unknown) {
    const result: any = await strapi.db?.query(fragmentTypeId).findOne({
      where: { id },
      populate: ['Preview.url'],
    });

    if (!result) {
      return null;
    }

    return result;
  },
};
