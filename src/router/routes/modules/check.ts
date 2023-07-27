import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
const check: AppRouteModule = {
  path: '/check',
  name: 'Check',
  component: LAYOUT,
  redirect: '/check/index',
  meta: {
    hideChildrenInMenu: true,
    roles: [RoleEnum.SUPER,RoleEnum.ADMIN,RoleEnum.MANAGE],
    icon: 'material-symbols:check',
    title: t('routes.check.check'),
    orderNo: 10,
  },
  children: [
    {
      path: 'index',
      name: 'CheckPage',
      component: () => import('/@/views/check/index.vue'),
      meta: {
        title: t('routes.check.check'),
        icon: 'material-symbols:check',
        hideMenu: true,
      },
    },
  ],
};

export default check;
