<template>
  <q-expansion-item
    v-if="item?.childs && item?.childs.length > 0"
    :icon="item.icon"
    :label="$t(item.label)"
  >
    <MenuItemComponent
      class="q-ml-md"
      v-for="(child, index) in item.childs"
      :key="index"
      :item="child"
    >
    </MenuItemComponent>
  </q-expansion-item>
  <q-item
    v-else
    clickable
    :to="item.to"
    :active="
      $route.name?.toString() ===
      (typeof item.to == 'string' ? item.to : item.to.name)"
  >
    <q-item-section avatar>
      <q-icon :name="item.icon" />
    </q-item-section>
    <q-item-section>{{ $t(item.label) }}</q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type ItemType = {
  label: string;
  to: string | { name: string };
  icon: string;
  childs?: ItemType[];
};

export default defineComponent({
  name: 'MenuItemComponent',
  components: {},
  props: {
    item: {
      type: Object as PropType<ItemType>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
