import { defineStore } from 'pinia';
import { client, IGlobalSearchSchema } from '@/services/typesense-client';
import { SearchParams } from 'typesense/lib/Typesense/Documents';
import Schemas from '@/services/schemas';
import { ActionEntityTypes } from '@pksep/zod-shared';

export const useSearchStore = defineStore('search', {
  state: () => ({
    _results: [],
    _allCount: 0
  }),
  getters: {
    allResults: state => state._results,
    allResultsCount: state => state._allCount
  },
  actions: {
    async fetchSearchData(query: string, page: number) {
      const findSearchFields = Schemas.find(
        el => el.schema.name === 'global_index'
      );

      const searchParameters: SearchParams = {
        q: query.replace(/[-+&|!(){}[\]^"~*?:]/g, '\\$&'),
        query_by: findSearchFields.searchFields.join(','),
        per_page: 25,
        page: page,
        num_typos: 0,
        drop_tokens_threshold: 2,
        infix: 'always',
        query_by_weights: '1,1,1',
        sort_by: '_text_match:desc',
        prioritize_exact_match: true,
        prioritize_token_position: true
      };

      const res = await client
        .collections('global_index')
        .documents()
        .search(searchParameters);

      this._allCount = res.found;

      const correctedResponse = {
        rows: res.hits.map(hit => {
          return {
            ...(hit.document as IGlobalSearchSchema),
            searchInfo: {
              snippets: hit.highlights.map(highlight => highlight.snippet)
            }
          };
        })
      };
      const newResults = [];
      correctedResponse.rows.forEach(row => {
        let nameArea = '';
        let icon = 'base-detail';
        if (row.ban) {
          nameArea += 'Архив / ';
        }

        if (row.type === ActionEntityTypes.material) {
          nameArea += 'База материалов';
          icon = 'theDatabaseOfMaterials';
        } else {
          if (row.type === ActionEntityTypes.product) {
            nameArea += 'База изделий';
          }
          if (row.type === ActionEntityTypes.cbed) {
            nameArea += 'База сборок';
          }
          if (row.type === ActionEntityTypes.detal) {
            nameArea += 'База деталей';
          }
        }

        if (row.ban) {
          icon = 'menu-archive';
        }

        const attributes = {
          nameArea,
          icon,
          searchResult: row.name,
          id: row.id.split('-')[0],
          type: row.type
        };

        newResults.push({
          ...attributes,
          banned: row.ban
        });

        if (!row.ban && row.type !== ActionEntityTypes.material) {
          nameArea += ' / Остатки ';

          newResults.push({
            ...attributes,
            icon: 'remains',
            nameArea,
            isRemain: true
          });
        }
      });

      if (page === 1) {
        this._results = newResults;
      } else {
        this._results.push(...newResults);
      }

      return this._results;
    },

    setResults(results): void {
      this._results = results;
      this._allCount = results.length;
    }
  }
});
