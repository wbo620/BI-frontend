
import {Button, Card, Form, Upload} from 'antd';
import { ProForm,PageContainer, ProFormText ,ProFormTextArea,ProFormUploadButton,ProFormSelect} from '@ant-design/pro-components';
import { message} from 'antd';
import React, { useState } from 'react';
import {useForm} from "antd/es/form/Form";
import {genChartMqByAiAsyncUsingPOST} from "@/services/icebi/chartController";
import {FontSizeOutlined, UploadOutlined} from "@ant-design/icons";

/**
 *  添加图表（异步）页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  /**
   * 提交
   * @param values
   */
  const [form] = useForm();
  const [file] = useState<File | undefined>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(false);
  return (
    <div>
      <PageContainer title="分析需求">
        <Card>
          <ProForm
            form={form}
            name="AddChart"
            submitter={{
              searchConfig: {
                resetText: '重置',
                submitText: '提交',
              },
            }}

            onFinish={async (values: any) => {
              // 避免重复提交
              if (submitting) {
                return;
              }
              setSubmitting(true);
              console.log('表单内容', values);
              // 对接后端
              const params = {
                ...values,
                file: file,
              };
              try {
                const res = await genChartMqByAiAsyncUsingPOST(params, {}, values.file.file.originFileObj);
                if (!res?.data) {
                  message.error('分析失败');
                } else {
                  message.success('生成成功，请移步我的图表进行查看。');
                  form.resetFields();
                }
              } catch (e: any) {
                message.error('分析失败' + e.message);
              }
              setSubmitting(false);
            }}
            loading={submitting}
            disabled={submitting}
            initialValues={{}}
          >
            <ProFormTextArea
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
                width={200}
                request={async () => [
                  { label: '折线图', value: '折线图' },
                  { label: '柱状图', value: '柱状图' },
                  { label: '饼图', value: '饼图' },
                  { label: '堆叠图', value: '堆叠图' },
                  { label: '雷达图', value: '雷达图' },
                  { label: '动态排序折线图', value: '动态排序折线图' },
                ]}
              />
              <Form.Item  name="file" label="原始数据" extra="支持扩展名：.xls .xlsx" required>
                <Upload name="file" maxCount={1}>
                  <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
                </Upload>
              </Form.Item>

            </ProForm.Group>
          </ProForm>
        </Card>
        <Card >提交后，请在我的图表中进行查看。</Card>
      </PageContainer>
    </div>
  );
};

export default AddChartAsync;
