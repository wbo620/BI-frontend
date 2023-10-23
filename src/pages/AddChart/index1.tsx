import { genChartByAiUsingPOST } from '@/services/icebi/chartController';

import { PageContainer, ProFormText } from '@ant-design/pro-components';
import { ProFormUploadButton } from '@ant-design/pro-form';
import { ProForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form/lib';
import { Card, message } from 'antd';

const AddChart: React.FC = () => {
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiUsingPOST(params, {}, values.file);
      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('图表代码解析错误');
        }
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
    }
  };

  return (
    <PageContainer className="add_chart" title="分析需求">
      <Card>
        <ProForm
          name="AddChart"
          submitter={{
            // render: (_, dom) => <div>{dom}</div>,
            searchConfig: {
              resetText: '重置',
              submitText: '提交',
            },
          }}
          onFinish={async (values: any) => {
            console.log('表单内容', values);
            // 对接后端
            const params = {
              ...values,
              file: undefined,
            };
            try {
              const res = await genChartByAiUsingPOST(params, {}, values.file);
              console.log(res);
              message.success('分析成功');
            } catch (e: any) {
              message.error('分析失败' + e.message);
            }
          }}
        >
          <ProFormTextArea
            width="xl"
            label="分析需求"
            name="goal"
            placeholder={'请输入你的分析需求，比如：分析网站用户增长情况。'}
            rules={[{ required: true, message: '请先输入分析需求!' }]}
          />
          <ProForm.Group>
            <ProFormText
              name="name"
              label="图表名称"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
            />
            <ProFormSelect
              name="chartType"
              label="图表类型"
              request={async () => [
                { label: '折线图', value: '折线图' },
                { label: '柱状图', value: '柱状图' },
                { label: '饼图', value: '饼图' },
                { label: '堆叠图', value: '堆叠图' },
                { label: '雷达图', value: '雷达图' },
                { label: '3D图', value: '3D图' },
              ]}
            />
            <ProFormUploadButton
              extra="支持扩展名：.xml .xmlx"
              label="CSV数据文件"
              name="file"
              title="上传文件"
            />
          </ProForm.Group>
        </ProForm>
      </Card>
    </PageContainer>
  );
};
export default AddChart;
