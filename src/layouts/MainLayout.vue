<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-ma-md rounded-borders bg-white shadow-1">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          color="dark"
        />

        <q-toolbar-title>
          <BreadcrumbComponent />
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <LanguageComponent />
          <AvatarComponent/>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <MenuComponent />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MenuComponent from '../components/MenuComponent.vue';
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue';
import AvatarComponent from '../components/AvatarComponent.vue';
import LanguageComponent from '../components/LanguageComponent.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuComponent,
    BreadcrumbComponent,
    AvatarComponent,
    LanguageComponent,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      text: ref(''),
      ph: ref(''),
      dense: ref(false)
    };
  },
});
</script>

<style scoped>
.q-page-container{
  background-color: rgb(244, 238, 238);
}
</style>
