import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import { LAYOUT } from '/@/router/constant';
const search: AppRouteModule = {
  path: '/search',
  name: 'Search',
  component: LAYOUT,
  redirect: '/search/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ri:search-line',
    title: t('routes.search.search'),
    orderNo: 20,
  },
  children: [
    {
      path: 'index',
      name: 'SearchPage',
      component: () => import('/@/views/search/index.vue'),
      meta: {
        title: t('routes.search.search'),
        icon: 'ri:search-line',
        hideMenu: true,
      },
    },
  ],
};

export default search;
