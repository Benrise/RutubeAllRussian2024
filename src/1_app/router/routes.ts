import { AppLayoutsEnum } from '@/1_app/layouts';
import type { RouteRecordRaw } from 'vue-router';
import { AppPages } from './types';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/:catchAll(.*)*',
        redirect: { name: AppPages.home },
    },
    {
        name: AppPages.home,
        path: '/',
        component: () => import('@/2_pages/home'),
        meta: {
            layout: AppLayoutsEnum.default,
            authRequired: true,
        },
    },
    {
        name: AppPages.login,
        path: '/login',
        component: () => import('@/2_pages/login'),
        meta: {
            layout: AppLayoutsEnum.login,
        },
    },
    {
        name: AppPages.projects,
        path: '/projects',
        component: () => import('@/2_pages/projects'),
        meta: {
            layout: AppLayoutsEnum.default,
            authRequired: true,
        },
    },
    {
        name: AppPages.workspaces,
        path: '/workspaces',
        component: () => import('@/2_pages/workspaces'),
        meta: {
            layout: AppLayoutsEnum.default,
            authRequired: true,
        },
    },
];

export default routes;
