import { IDataTestidProp } from '@/utils/types/types';
import {
  ActionEntityTypes,
  EnumCompanyType,
  ModelComment
} from '@pksep/zod-shared';

type listItem = {
  id: number;
  name: string;
  designation: string;
  quantity: number;
  units: number;
};

export interface IYModal extends IDataTestidProp {
  open?: boolean;
  width?: string;
  height?: string;
  animateType?: string;
  position?: 'center' | 'right';
}

export interface IYModalEmit {
  (e: 'unmount-close'): void;
  (e: 'unmount-unmounted'): void;
  (e: 'unmount-end-animation'): void;
}

export interface ITableProps<T extends string | number = string> {
  selectedColumns?: Set<T>;
  searchValue?: string;
}

export interface IModalActionEmit {
  (e: 'unmount-print'): void;
  (e: 'unmount-save'): void;
}

export interface ITableEmit {
  (e: 'unmount-scroll', event: Event): void;
  (e: 'unmount-search', value: string): void;
  (e: 'unmount-paginate', isCanPaginate: boolean): void;
}

export interface ITableSelectEmit {
  (e: 'unmount-select', ids: number[]): void;
}

export interface ITableItemSelected {
  isSelected: boolean;
}

export interface ITableItemPopover {
  popover: {
    value: string;
    function: () => void;
    style?: Record<string, string>;
  }[];
}

export interface ITableItemState extends IAttentionState, IDiscontinuedState {
  isLink?: boolean;
}

export interface IAttentionState {
  attention?: boolean;
  description?: string;
}

export interface IDiscontinuedState {
  discontinued?: boolean;
}

export interface IModalConfirm extends IYModal {
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface IBasePaginationTableProps extends IDataTestidProp {
  type: string;
  width?: string;
  itemsLength?: number;
  isShowResponsibleFilter?: boolean;
  totalItemsCount?: number;
  withOperationsItemsCount?: number;
  listCbed?: listItem[];
  listDetal?: listItem[];
}

export interface ICheckboxProps extends IDataTestidProp {
  defaultValue?: boolean;
  item?: any;
}

export interface IDatePicterProps extends IDataTestidProp {
  // Задается только 1 раз,
  // Формат DD.MM.YYYY
  dateStart?: string;
  noFormat?: boolean;
  isDisabled?: boolean;
}

export interface IDatePicterRangeProps extends IDataTestidProp {
  set_ranges?: {
    end: Date;
    start: Date;
  } | null;
  fromTodayTime?: boolean;
}

export interface IDropZoneProps {
  dropPosition?: 'full' | 'left' | 'right';
  dropTitle?: string;
}

export interface IFileLoaderProps extends IDropZoneProps, IDataTestidProp {
  typeGetFile?: string;
  singleFileMode?: boolean;
  title?: string;
}

export interface IDynamicComponentTableProps extends IDataTestidProp {
  items?: any[];
  type?: string;
  title: string;
  width?: string;
  attention?: boolean;
  hide_filter_responsibil?: boolean;
  selectedItemId?: number;
}

export interface ILoaderProps extends IDataTestidProp {
  description?: string;
}

export interface IMiniNavigationProps extends IDataTestidProp {
  defaultIndex?: number;
  arrData?: any[];
  pos?: 'x' | 'y';
  default_item?: boolean;
}

export interface IModalDescriptionProps extends IDataTestidProp, IYModal {
  parametrs?: string;
}

export interface IModalDescriptionEmit extends IYModalEmit {
  (e: 'unmount-change-first-comment', comment: ModelComment): void;
}

export interface IModalPromptMiniProps extends IDataTestidProp {
  text: string;
}

export interface IQuickFilterProps extends IDataTestidProp {
  hide_filter_responsibil?: boolean;
}

export interface ISearchProps extends IDataTestidProp {
  placeholder?: string;
  search_data?: string;
}

export interface ISelectObjectProps extends IDataTestidProp {
  selectIsMany?: boolean;
  isShowDetal?: boolean;
}

export interface IFilterProps extends IDataTestidProp {
  disableSortByOwn?: boolean;
  label?: string;
  addFilterByDiscontinued?: boolean;
}

export interface IPushNotificationProps {
  isNotApp?: boolean;
}

export interface IFilterOrders extends IDataTestidProp {
  type?: EnumCompanyType[];
  label?: string;
}

export interface IFilterTypeProps {
  label?: string;
  title?: string;
  placeholder?: string;
  is: string;
  selectedValues?: string[];
  maxShowCount?: number;
  showClearButton?: boolean;
}

export interface IFilterSelectProps extends IDataTestidProp {
  title: string;
  selectedLabel: string | null;
  isOpenModal?: boolean;
  defaultValue?: string;
}

export interface IAccordionButton extends IDataTestidProp {
  isOpen: boolean;
  type?: 'default' | 'white';
}

export interface IGetCommentsProps extends IDataTestidProp {
  entityId: number;
  entityType: ActionEntityTypes;
}

export interface IComment {
  comment: ModelComment;
}

export interface ICommentItemView extends IComment, IGetCommentsProps {}

export interface IModalCommentsProps
  extends Partial<ICommentItemView>,
    IYModal {}
