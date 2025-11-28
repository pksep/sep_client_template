import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    _titleInform: '',
    _messageInform: '',
    _typeInform: '',
    _keyInform: 999,
    _isCollapsedMenu: localStorage.getItem('collapsedMenu') === 'true',

    _historySearch: localStorage.getItem('historySearch')
      ? JSON.parse(localStorage.getItem('historySearch'))
      : []
  }),
  getters: {
    getTitleInform: state => state._titleInform,
    getMessageInform: state => state._messageInform,
    getTypeInform: state => state._typeInform,
    getKeyInform: state => state._keyInform,
    getHistorySearch: state => state._historySearch,
    getCollapsedMenu: state => state._isCollapsedMenu
  },
  actions: {
    addHistorySearch(search_item: string): void {
      if (search_item) {
        if (this._historySearch.length && this._historySearch[0] == search_item)
          return;
        this._historySearch.unshift(search_item);
      }

      if (this._historySearch.length > 20) this._historySearch.pop();

      localStorage.setItem(
        'historySearch',
        JSON.stringify(this._historySearch)
      );
    },

    toggleMenu(): void {
      this._isCollapsedMenu = !this._isCollapsedMenu;
      localStorage.setItem('collapsedMenu', this._isCollapsedMenu);
    }
  }
});
