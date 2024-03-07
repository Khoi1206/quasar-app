import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'auth.login',
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          require_auth: false,
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          require_auth: true,
          breadcrumb: 'dashboard',
        },
      },
      // user
      {
        name: 'user',
        path: 'user',
        component: () => import('pages/PassThrough.vue'),
        meta: {
          require_auth: true,
          breadcrumb: 'user',
          append_name: '.list',
        },
        children: [
          {
            name: 'user.list',
            path: '',
            component: () => import('pages/user/UserPage.vue'),
            meta: {
              require_auth: true,
              breadcrumb: 'list',
            },
          },
          {
            name: 'user.create',
            path: 'create',
            component: () => import('pages/user/UserFormPage.vue'),
            meta: {
              require_auth: true,
              breadcrumb: 'create',
            },
          },
          {
            name: 'user.detail',
            path: 'detail/:id',
            component: () => import('pages/user/UserDetailPage.vue'),
            meta: {
              require_auth: true,
              breadcrumb: 'detail',
            },
          },
          {
            name: 'user.edit',
            path: 'edit/:id',
            component: () => import('pages/user/UserFormPage.vue'),
            meta: {
              require_auth: true,
              breadcrumb: 'edit',
            },
          },
        ],
      },
      // todo
      {
        name: 'todo',
        path: 'todo',
        component: () => import('pages/PassThrough.vue'),
        meta: {
          require_auth: true,
          breadcrumb: 'todo',
          append_name: '.list',
        },
        children: [
          {
            name: 'todo.list',
            path: '',
            component: () => import('pages/todo/TodoPage.vue'),
            meta: {
              require_auth: true,
              breadcrumb: 'list',
            },
          },
          {
            name: 'todo.create',
            path: 'create',
            component: () => import('pages/todo/TodoFormPage.vue'),
            meta: {
              require_auth: true,
              breadcrumb: 'create',
            },
          },
          {
            name: 'todo.detail',
            path: 'detail/:id',
            component: () => import('pages/todo/TodoDetailPage.vue'),
            meta: {
              require_auth: true,
              breadcrumb: 'detail',
            },
          },
          {
            name: 'todo.edit',
            path: 'edit/:id',
            component: () => import('pages/todo/TodoFormPage.vue'),
            meta: {
              require_auth: true,
              breadcrumb: 'edit',
            },
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
