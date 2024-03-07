import { defineStore } from 'pinia';

export type TodoRowType = {
  id: number;
  name: string;
  description: string;
};

export type TodoRowsType = TodoRowType[];

export const useTodoStore = defineStore('todo', {
  state: (): {
    rows: TodoRowsType ;
  } => ({
    rows: [],
  }),

  getters: {
},

  actions: {
    defaultList() {
      this.$state.rows = [
        {
          id: 1,
          name: 'Single line item 1',
          description: 'Single line item 1'
        },
        {
          id: 2,
          name: 'Single line item 2',
          description: 'Single line item 2'
        },
        {
          id: 3,
          name: 'Single line item 3',
          description: 'Single line item 3'
        },
      ];
    },
    deleteRow(id: number) {
      this.$state.rows = this.$state.rows.filter((item) => item.id !== id);
    },
    updateRow(updatedTask: TodoRowType) {
      const index = this.$state.rows.findIndex((item) => item.id === updatedTask.id);
      if (index !== -1) {
        this.$state.rows.splice(index, 1, updatedTask);
      }
    },
    addRow(newTask: TodoRowType) {
      this.$state.rows.push(newTask);
    },

  },
});
