<template>
  <q-page class="q-pa-md q-mt-md">
    <q-table
      :title="$t('user')"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="ids"
      :pagination="{ rowsPerPage: 10 }"
    >
      <template v-slot:top>
        <div class="col-12 q-pb-sm">
          <div class="row q-gutter-md">
            <div class="col">
              <q-btn
                color="primary"
                icon="add_circle"
                :title="$t('create')"
                @click="addRecord"
                size="lg"
                dense
                class="q-mr-xs q-pa-none"
              />
              <q-btn
                color="negative"
                icon="delete"
                :title="$t('bulk_delete')"
                @click="deleteRecords"
                size="lg"
                dense
                class="q-mr-xs q-pa-none"
              />
            </div>
            <div class="col">
              <div class="row justify-end q-gutter-md">
                <q-input
                  v-model="searchParams.email"
                  type="text"
                  :placeholder="$t('email')"
                />
                <q-input
                  v-model="searchParams.username"
                  type="text"
                  :placeholder="$t('username')"
                />
                <q-btn
                  color="primary"
                  icon="search"
                  :title="$t('search')"
                  @click="onSearch"
                  size="lg"
                  dense
                />
              </div>
            </div>
          </div>
        </div>

      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width>
            <q-checkbox v-model="props.selected" />
          </q-th>
          <q-th :props="props" v-for="col in props.cols" :key="col.name" >
            {{ $t(col.label) }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            @click="editRow(props.row.id)"
            color="primary"
            icon="edit"
            :title="$t('edit')"
            dense outline size="md"
          />
          <q-btn
            @click="deleteRow(props.row.id)"
            color="negative"
            icon="delete"
            :title="$t('delete')"
            dense outline size="md"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { QTableProps } from 'quasar';
import { useUserStore } from 'src/stores/userStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { dialogDelete } from 'src/libs/utils';

export default defineComponent({
  name: 'UserPage',
  components: {},
  setup() {
    const userStore = useUserStore();
    const { rows } = storeToRefs(useUserStore());
    const columns: QTableProps['columns'] = [
      {
        name: 'id',
        label: 'id',
        field: (row) => row.id,
        align: 'left',
      },
      {
        name: 'email',
        label: 'email',
        field: (row) => row.email,
        align: 'left',
      },
      {
        name: 'username',
        label: 'username',
        field: (row) => row.username,
        align: 'left',
      },
      {
        name: 'action',
        label: 'action',
        field: '',
        align: 'center',
      },
    ];
    const searchParams = ref({
      email: '',
      username: '',
    });
    const ids = ref<number[]>([]);
    // For test
    onMounted(() => {
      console.log('onmounted');
      if (rows.value.length == 0) {
        userStore.defaultList();
      }
    });

    return {
      columns,
      rows,
      userStore,
      searchParams,
      ids,
    };
  },
  methods: {
    addRecord() {
      this.$router.push({ name: 'user.create' });
    },
    deleteRecords() {
      dialogDelete().onOk(() => {
        console.log('deleteRecords', this.ids);
        // this.userStore.deleteRow(id);
      });
    },
    editRow(id: number) {
      console.log('editRow');
      this.$router.push({ name: 'user.edit', params: { id: id } });
    },
    deleteRow(id: number) {
      dialogDelete().onOk(() => {
        console.log('deleteRow', id);
        this.userStore.deleteRow(id);
      });
    },
    onSearch() {
      //
    },
  },
});
</script>
