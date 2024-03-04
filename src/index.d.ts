// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    require_auth: true | false,
    breadcrumb?: string,
    append_name?: string
  }
}
