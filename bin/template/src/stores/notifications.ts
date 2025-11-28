import { defineStore } from 'pinia';
import { AddUserActionNotifiedDto } from '@/stores/dto/notifications/notifications.dto';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    _userActionNotified: [],
    _timeout: 3000
  }),
  getters: {
    getUserActionNotified: state => state._userActionNotified,
    getTimeout: state => state._timeout / 1000
  },
  actions: {
    addUserActionNotified(action: AddUserActionNotifiedDto): void {
      const lastItem = this._userActionNotified.at(-1);
      const existingIndex = this._userActionNotified.findIndex(
        item => item.id === action.id
      );
      if (this._userActionNotified.length >= 4) {
        this._userActionNotified.shift();
      }

      if (existingIndex !== -1) {
        this._userActionNotified[existingIndex] = { ...action };
      } else {
        if (action.message !== lastItem?.message) {
          this._userActionNotified.push({ ...action });
        }
      }
      setTimeout(() => {
        this.removeUserActionNotified(action.id);
      }, this._timeout);
    },

    removeUserActionNotified(_id: number): void {
      this._userActionNotified = this._userActionNotified.filter(
        item => item.id !== _id
      );
    },

    removeAllUserActionNotified(): void {
      this._userActionNotified = [];
    }
  }
});
