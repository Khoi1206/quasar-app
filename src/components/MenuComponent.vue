<template>
  <div>
    <q-list>
      <MenuItemComponent
        v-for="(item, index) in menuItems"
        :key="index"
        :item="item"
      ></MenuItemComponent>
      <!-- <q-separator /> -->

    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuItemComponent from './MenuItemComponent.vue';

export default defineComponent({
  name: 'MenuComponent',
  components: {
    MenuItemComponent,
  },
  setup() {
    const menuItems = [
      {
        label: 'dashboard',
        to: { name: 'dashboard' },
        icon: 'dashboard',
      },
      {
        label: 'settings',
        to: { name: 'setting' },
        icon: 'settings',
        childs: [
          {
            label: 'user',
            to: { name: 'user.list' },
            icon: 'people',
          },
          {
            label: 'general',
            to: { name: 'general.form' },
            icon: 'settings',
          },
          {
            label: 'history',
            to: { name: 'history.list' },
            icon: 'history',
          },
        ],
      },
    ];

    return {
      menuItems,

    };
  },
});
</script>
