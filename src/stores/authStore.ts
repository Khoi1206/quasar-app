import { defineStore } from 'pinia';

export type UserAuthType = {
  email: string
};

export const useAuthStore = defineStore('auth', {
  state: (): {
    user: UserAuthType | null
  } => ({
    user: null
  }),

  getters: {
    isLogin(state) {
      return state.user !== null;
    }
  },

  actions: {
    logout() {
      this.user = null;
    }
  },
  persist: true
});
