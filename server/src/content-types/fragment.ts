import { PLUGIN_ID } from '../pluginId';

export default {
  schema: {
    kind: 'collectionType',
    collectionName: 'fragment',
    info: {
      singularName: 'fragment',
      pluralName: 'fragments',
      displayName: 'MDX-Fragment',
      description: 'MDX fragments',
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {
      'content-manager': {
        visible: true,
      },
      'content-type-builder': {
        visible: false,
      },
    },
    attributes: {
      Title: {
        type: 'string',
        required: true,
      },
      Content: {
        type: 'customField',
        customField: `plugin::${PLUGIN_ID}.mdx`,
      },
      Description: {
        type: 'text',
      },
      Weight: {
        type: 'integer',
        required: true,
        default: 0,
      },
      Preview: {
        allowedTypes: ['images'],
        type: 'media',
        multiple: false,
      },
    },
  },
};
