import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';
const task: AppRouteModule = {
  path: '/task',
  name: 'Task',
  component: LAYOUT,
  redirect: '/task/report',
  meta: {
    orderNo: 2,
    icon: 'tabler:align-left',
    title: t('routes.task.task'),
  },
  children: [
    {
      path: 'input',
      name: 'Input',
      component: () => import('/@/views/task/input/index.vue'),
      meta: {
        title: t('routes.task.input'),
        keepAlive:false,
      },
    },
    {
      path: 'report',
      name: 'Report',
      component: () => import('/@/views/task/report/index.vue'),
      meta: {
        title: t('routes.task.report'),
        keepAlive:true,
      },
    },
    {
      path: 'next',
      name: 'Next',
      component: () => import('/@/views/task/report/next.vue'),
      meta: {
        title:'',
        currentActiveMenu:'/task/report',
        hideMenu: true,
        hideTab: true,
      },
    },
    {
      path: 'praise',
      name: 'Praise',
      component: () => import('/@/views/task/praise/index.vue'),
      meta: {
        roles: [RoleEnum.SUPER],
        title: t('routes.task.praise'),
        keepAlive:true,
      },
    },
  ],
};

export default task;
