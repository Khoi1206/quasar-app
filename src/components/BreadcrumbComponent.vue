<template>
  <div class="q-pa-sm q-gutter-sm" v-show="showBreadcrumb">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :label="$t(breadcrumb.label)"
        :to="breadcrumb.to"
        :disable="index === breadcrumbs.length - 1 ? true : false"
        class="text-white text-weight-light"
        :icon="breadcrumb.icon"
      />
    </q-breadcrumbs>
  </div>
</template>

<style lang="scss">
.q-breadcrumbs {
  font-size: medium;
}
</style>

<script lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { defineComponent, watch } from 'vue';
import { RouteLocationMatched, useRoute } from 'vue-router';
export default defineComponent({
  name: 'BreadcrumbComponent',
  setup() {
    const route = useRoute();
    const breadcrumbs = ref<
      {
        label: string;
        icon?: string;
        to: {
          name: string;
        };
      }[]
    >([]);
    const showBreadcrumb = ref(true);
    const generateBreadcrumbs = (matched: RouteLocationMatched[]) => {
      breadcrumbs.value.length = 0;
      breadcrumbs.value.push({
        to: { name: 'dashboard' },
        label: 'dashboard',
        icon: 'dashboard',
      });
      for (const routeItem of matched) {
        if (routeItem.meta?.breadcrumb) {
          let toName = routeItem.name ? routeItem.name?.toString() : '';
          if (routeItem.meta?.append_name) {
            toName += routeItem.meta?.append_name;
          }
          breadcrumbs.value.push({
            to: { name: toName },
            label: String(routeItem.meta.breadcrumb),
          });
        }
      }
      if (
        breadcrumbs.value[breadcrumbs.value.length - 1].to.name === 'dashboard'
      ) {
        showBreadcrumb.value = false;
      } else {
        showBreadcrumb.value = true;
      }
    };
    watch(
      () => route.name,
      () => {
        generateBreadcrumbs(route.matched);
      }
    );
    onMounted(() => {
      generateBreadcrumbs(route.matched);
    });
    return {
      breadcrumbs,
      showBreadcrumb,
    };
  },
});
</script>
