export interface IHandlePagination {
  fetchFunction: () => Promise<void>;
  itemsCount: number;
  itemsLength: number;
}

export type IHandleScroll = {
  event: any;
  fetchFunction: () => Promise<void>;
  itemsCount: number;
  itemsLength: number;
  state: any;
  scrollElement: string;
  doc?: Document;
};

export type OptionsObject = {
  key: string;
  value: string;
};

export interface IDataTestidProp {
  dataTestid?: string;
}

export interface IDataBaseEntity {
  createdAt: string;
  updatedAt: string;
}

export interface IPagination<T> {
  count: number;
  rows: T[];
}

export interface TooltipConfig {
  label: string;
  position: string;
}

export interface TableHeaderItem {
  parentLabel?: string;
  label: string;
  colspan?: number;
  rowspan?: number;
  tooltip?: TooltipConfig;
}

export type TableHeaderConfig = Record<
  'header' | 'subHeader',
  TableHeaderItem[]
>;

export type ClassValue =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];
