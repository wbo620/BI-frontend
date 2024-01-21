// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** sendQuestion GET /api/test/sendQuestion */
export async function sendQuestionUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendQuestionUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/test/sendQuestion', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
