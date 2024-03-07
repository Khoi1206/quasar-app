<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      @submit="onSubmit"
      class="col-10 col-md-4 shadow-1 q-pa-md rounded-borders"
    >
      <div class="text-h4 text-center">WELCOME BACK</div>
      <q-input
        v-model="email"
        type="email"
        :label="$t('email')"
        :rules="[vRequired, vEmail]"
      />
      <q-input
        v-model="password"
        type="password"
        :label="$t('password')"
        :rules="[vRequired, (val) => vMinLen(val, 3)]"
      />
      <div class="q-pt-md text-center">
        <q-btn :label="$t('login')" type="submit" color="primary" />
      </div>
      <div class="q-pt-md row">
        <q-select
          class="col-6 offset-6 col-md-3 offset-md-9 bg-red"
          :label="$t('language')"
          v-model="locale"
          :options="localeOptions"
          emit-value
          map-options
          borderless
        />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { vRequired, vEmail, vMinLen } from '../libs/validators';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginPage',
  components: {},
  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    const router = useRouter();
    const email = ref('admin@admin.com');
    const password = ref('123');
    return {
      vRequired,
      vEmail,
      vMinLen,
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'vi-VN', label: 'Vietnamese' },
      ],
      email,
      password,
      onSubmit() {
        const authStore = useAuthStore();
        authStore.user = {
          email: email.value,
        };
        router.push({ name: 'dashboard' });
        return true;
      },
    };
  },
});
</script>

<style scoped>

</style>
