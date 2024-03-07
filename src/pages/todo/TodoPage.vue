<template>
  <q-page class="q-pa-md q-mt-md">
    <q-card class="q-pa-lg">
      <q-input outlined bottom-slots rounded color="dark" @keyup.enter="addTask" v-model="newTask" placeholder="What do you want to do?" dense>
        <template v-slot:append>
          <q-btn round dense flat color="dark" icon="add" @click="addTask" class="q-mr-xs" />
        </template>
      </q-input>

      <q-list bordered separator>
        <q-item v-for="item in todoStore.rows" :key="item.id" @click="item.done = !item.done" :class="{ 'done bg-grey-3' : item.done }" clickable v-ripple>
          <q-item-section avatar>
            <q-checkbox v-model="item.done" color="dark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption lines="2">{{ item.description}}</q-item-label>
          </q-item-section>
          <q-item-section v-if="item.done" side>
            <div class="row">
              <q-btn class="q-mr-sm" round dense color="primary" icon="edit" @click.stop="editTask(item.id)" />
              <q-btn round dense color="red" icon="delete" @click.stop="deleteTask(item.id)" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

  </q-page>
</template>

<script lang="ts">
import { defineComponent , onMounted , ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useTodoStore } from 'src/stores/todoStore';
import { dialogDelete } from 'src/libs/utils';

export default defineComponent({
  name: 'TodoPage',
  components: {},
  setup(){
    const todoStore = useTodoStore();
    const { rows } = storeToRefs(useTodoStore());
    const newTask = ref('');

    onMounted(() => {
      if (rows.value.length === 0) {
        todoStore.defaultList();
      }
    });

    return {
      addEditTask: ref(false),
      newTask,
      todoStore
    }
  },
  methods: {
    deleteTask(id: number){
      dialogDelete().onOk(() => {
        this.todoStore.deleteRow(id);
      });
    },
    editTask(id: number) {
      this.$router.push({ name: 'todo.edit', params: { id: id } });
    },
    addTask(){
      const newTodo = {
        id: this.todoStore.rows.length + 1,
        name: this.newTask,
        description: ''
      };
      this.todoStore.addRow(newTodo);
      this.newTask = '';
    },

  }

})
</script>

<style lang="scss" scoped>
  .done {
    .q-item__label {
      text-decoration:line-through;
      color: #bbb;
    }
  }
</style>
