<template>
  <div>
    <q-btn flat>
      <q-avatar size="26px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      </q-avatar>
      <q-menu anchor="bottom start">
        <q-item clickable v-ripple>
          <q-item-section>New tab</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>New incognito tab</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="logout" v-ripple>
          <q-item-section avatar>
            <q-avatar icon="arrow_forward" color="primary" size="md" text-color="white"/>
          </q-item-section>
          <q-item-section >{{$t('logout')}}</q-item-section>
        </q-item>
      </q-menu>
    </q-btn>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';

export default defineComponent({
  name: 'AvatarComponent',
  components: {},
  setup () {
    const authStore = useAuthStore();
    const router = useRouter();

    return {
      logout() {
        authStore.logout();
        router.push({ name: 'auth.login' });
      },
    };
  }

});

</script>
