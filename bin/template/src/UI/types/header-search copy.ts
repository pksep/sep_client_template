import { ActionEntityTypes } from '@pksep/zod-shared';

export type ResultSearchType = {
  nameArea: string;
  searchResult: string;
  id: string;
  type: ActionEntityTypes;
  banned: boolean;
  isRemain?: boolean;
};
