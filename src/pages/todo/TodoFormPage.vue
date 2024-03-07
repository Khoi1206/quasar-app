<template>
  <q-page class="q-pa-md q-mt-md">
    <q-card>
      <q-card-section class="q-pa-md">
        <q-form @submit="onSubmit" class="q-gutter-md q-pa-md">
          <div class="row">
            <div class="col-xs-6 col-sm-12">
              <q-input
                v-model="data.id"
                type="number"
                label="ID"
                class="q-pr-lg"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-6 col-sm-12">
              <q-input
                v-model="data.name"
                type="text"
                :label="$t('name')"
                class="q-pr-lg"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-6 col-sm-12">
              <q-input
                v-model="data.description"
                type="text"
                :label="$t('description')"
                class="q-pr-lg"
              />
            </div>
          </div>

          <div class="text-center q-gutter-sm">
            <q-btn
              :title="$t('back')"
              icon="undo"
              type="button"
              color="dark"
              :to="{ name: 'todo.list' }"
            />
            <q-btn
              :title="$t('save')"
              icon="save"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
      <pre>{{data}}</pre>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useTodoStore } from 'src/stores/todoStore';
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'TodoFormPage',
  setup() {
    const route = useRoute();
    const todoStore = useTodoStore();
    const data = ref({
      id: 0,
      name: '',
      description: '',
    });
    if (route.params.id) {
      const item = todoStore.rows.find(
        (item) => item.id == Number(route.params.id)
      );
      if (item) {
        data.value = item;
      }
    }
    return {
      data,
      todoStore,
    };
  },
  methods: {
    onSubmit() {
      this.todoStore.updateRow(this.data);
      this.$router.push({ name: 'todo.list' });
    },
  },
});
</script>
