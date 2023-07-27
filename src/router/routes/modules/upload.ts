import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
const uplaod: AppRouteModule = {
  path: '/upload',
  name: 'Upload',
  component: LAYOUT,
  redirect: '/upload/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ph:upload-simple-bold',
    title: t('routes.upload.upload'),
    roles:[RoleEnum.SUPER,RoleEnum.ADMIN],
    orderNo: 20,
  },
  children: [
    {
      path: 'index',
      name: 'UploadPage',
      component: () => import('/@/views/upload/index.vue'),
      meta: {
        title: t('routes.upload.upload'),
        icon: 'ph:upload-simple-bold',
        hideMenu: true,
      },
    },
    {
      path: 'import',
      name: 'ImportPage',
      component: () => import('/@/views/upload/importXls.vue'),
      meta: {
        title: t('routes.upload.upload'),
        icon: 'ph:upload-simple-bold',
        hideMenu: true,
      },
    },
  ],
};

export default uplaod;
