import { defineStore } from 'pinia';

export type UserRowType = {
  id: number;
  email: string;
  username: string;
  passwd: string;
};

export type UserRowsType = UserRowType[];

export const useUserStore = defineStore('user', {
  state: (): {
    rows: UserRowsType;
  } => ({
    rows: [],
  }),

  getters: {},

  actions: {
    defaultList() {
      this.$state.rows = [
        {
          id: 1,
          email: 'admin@admin.com',
          username: 'Tran Xuan Admin',
          passwd: '123',
        },
        {
          id: 2,
          email: 'xuanphu',
          username: 'Tran Xuan Phu',
          passwd: '123',
        },
        {
          id: 3,
          email: 'xuanngoc',
          username: 'Tran Xuan Ngoc',
          passwd: '123',
        },
      ];
    },
    deleteRow(id: number) {
      const newRows = this.$state.rows.filter((item) => item.id !== id);
      this.$state.rows = newRows;
    },
    updateRow(updatedTask: UserRowType) {
      const index = this.$state.rows.findIndex((item) => item.id === updatedTask.id);
      if (index !== -1) {
        this.$state.rows.splice(index, 1, updatedTask);
      }
    },
  },
});
