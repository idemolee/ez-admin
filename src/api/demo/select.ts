import { defHttp } from '/@/utils/http/axios';
import { DemoOptionsItem, selectParams } from './model/optionsModel';
enum Api {
  OPTIONS_LIST = '/select/getDemoOptions',
  OPTIONS_TEST = '/test'
}

/**
 * @description: Get sample options value
 */
export const optionsListApi = (params?: selectParams) =>
  defHttp.get<DemoOptionsItem[]>({ url: Api.OPTIONS_TEST, params });
