<template>
  <q-card>
    <q-dialog :v-model="item.model">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ item.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="item.label" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

type ItemType = {
  model: string;
  title: string;
  to: string | { name: string };
  label: string;
};

export default defineComponent({
  name: 'DialogComponent',
  props: {
    item: {
      type: Object as PropType<ItemType>,
      required: true,
    },
  },
  setup() {
    return {};
  },
})
</script>
