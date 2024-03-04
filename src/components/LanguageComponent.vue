<template>
  <q-item-section class="row">
    <q-select
      v-model="locale"
      :options="localeOptions"
      emit-value
      map-options
      borderless
      hide-dropdown-icon
      dark
      color="white"
    >
      <template v-slot:prepend>
        <q-icon name="language" class="text-white"/>
      </template>
    </q-select>
  </q-item-section>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'LanguageComponent',
  components: {},
  setup(){
    const { locale } = useI18n({ useScope: 'global' });

    return{
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'vi-VN', label: 'Vietnamese' },
      ],
    }
  }

});
</script>

<style scoped>
</style>
