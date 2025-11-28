import { ActionEntityTypes } from '@pksep/zod-shared';
export enum SearchIndexesEnum {
  globalIndex = 'global_index'
}

export interface IGlobalSearchSchema {
  id: string;
  type:
    | ActionEntityTypes.product
    | ActionEntityTypes.cbed
    | ActionEntityTypes.detal;
  name: string;
  ban: boolean;
  designation?: string;
  articl?: string;
  child_id?: string;
}

export interface IGlobalSearchSchemaResponce extends IGlobalSearchSchema {
  searchInfo: { snippets: string[] };
}

const globalSearchSchema = {
  name: SearchIndexesEnum.globalIndex,
  fields: [
    { name: 'id', type: 'string' as const, facet: true },
    { name: 'type', type: 'string' as const, facet: true },

    {
      name: 'name',
      type: 'string' as const,
      facet: false,
      infix: true,
      locale: 'ru',
      index: true,
      case_sensitive: false
    },
    {
      name: 'articl',
      type: 'string' as const,
      facet: false,
      optional: true,
      infix: true,
      locale: 'ru',
      index: true,
      case_sensitive: false
    },
    {
      name: 'designation',
      type: 'string' as const,
      facet: false,
      optional: true,
      locale: 'ru',
      infix: true,
      case_sensitive: false,
      index: true
    },
    { name: 'child_id', type: 'string' as const, facet: false, optional: true },
    { name: 'ban', type: 'bool' as const, facet: true }
  ]
};

const searchFields = ['name', 'designation', 'articl'];

const GlobalSearchSchema = {
  schema: globalSearchSchema,
  searchFields: searchFields
};

export default GlobalSearchSchema;
