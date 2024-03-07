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
          <div class="row justify-between">
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="data.email"
                type="text"
                :label="$t('email')"
                class="q-pr-lg"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="data.username"
                type="text"
                :label="$t('username')"
                class="q-pr-lg"
              />
            </div>
          </div>
          <div class="row justify-between">
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="data.passwd"
                :type="isPwd ? 'password' : 'text'"
                :label="$t('password')"
                class="q-pr-lg"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                ref="confirmPasswd"
                v-model="confirmPasswd"
                :type="isPwd ? 'password' : 'text'"
                :label="$t('confirm_passwd')"
                :rules="[
                  (val) => val === data.passwd || $t('passwd_not_match'),
                ]"
                class="q-pr-lg"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div class="text-center q-gutter-sm">
            <q-btn
              :title="$t('back')"
              icon="undo"
              type="button"
              color="dark"
              :to="{ name: 'user.list' }"
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
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useUserStore } from 'src/stores/userStore';
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UserFormPage',
  setup() {
    const route = useRoute();
    const userStore = useUserStore();
    const data = ref({
      id: 0,
      email: '',
      username: '',
      passwd: '',
    });
    if (route.params.id) {
      const item = userStore.rows.find(
        (item) => item.id == Number(route.params.id)
      );
      if (item) {
        data.value = item;
      }
    }
    return {
      data,
      userStore,
    };
  },
  data() {
    return {
      currentPasswd: ref(''),
      confirmPasswd: ref(''),
      isPwd: ref(true),
    };
  },
  methods: {
    onSubmit() {
      this.userStore.updateRow(this.data);
      this.$router.push({ name: 'user.list' });
    },
  },
});
</script>
