import { genChartByAiUsingPOST } from '@/services/icebi/chartController';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

import { PageContainer, ProFormText } from '@ant-design/pro-components';
import { ProFormUploadButton } from '@ant-design/pro-form';
import { ProForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form/lib';
import { message, Spin } from 'antd';
import React, { useState } from 'react';

/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  /**
   * 提交
   * @param values
   */
  const load = {
    graphic: {
      elements: [
        {
          type: 'group',
          left: 'center',
          top: 'center',
          children: new Array(7).fill(0).map((val, i) => ({
            type: 'rect',
            x: i * 20,
            shape: {
              x: 0,
              y: -40,
              width: 10,
              height: 80,
            },
            style: {
              fill: '#5470c6',
            },
            keyframeAnimation: {
              duration: 1000,
              delay: i * 200,
              loop: true,
              keyframes: [
                {
                  percent: 0.5,
                  scaleY: 0.3,
                  easing: 'cubicIn',
                },
                {
                  percent: 1,
                  scaleY: 1,
                  easing: 'cubicOut',
                },
              ],
            },
          })),
        },
      ],
    },
  };

  const [chart, setChart] = useState<API.BiResponse>();
  const [option, setOption] = useState<any>();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(false);
  return (
    <div>
      <PageContainer className="add_chart" title="分析需求">
        <Card>
          <ProForm
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
              // 清空图表数据和可视化图表
              setChart(undefined);
              setOption(null);
              console.log('表单内容', values);
              // 对接后端
              const params = {
                ...values,
                file: file,
              };
              try {
                const res = await genChartByAiUsingPOST(params, {}, file);
                console.log(res);
                if (!res?.data) {
                  message.error('分析失败');
                  // 清空图表数据和可视化图表
                  setChart(undefined);
                  setOption(null);
                } else {
                  message.success('分析成功');
                  const chartOption = JSON.parse(res.data.genChart ?? '');
                  if (!chartOption) {
                    throw new Error('图代码解析错误');
                  } else {
                    setChart(res.data);
                    setOption(null);
                    setOption(chartOption);
                  }
                }
              } catch (e: any) {
                message.error('分析失败' + e.message);
                // 清空图表数据和可视化图表
                setChart(undefined);
                setOption(null);
              }
              setSubmitting(false);
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
                width={200}
                request={async () => [
                  { label: '折线图', value: '折线图' },
                  { label: '柱状图', value: '柱状图' },
                  { label: '饼图', value: '饼图' },
                  { label: '堆叠图', value: '堆叠图' },
                  { label: '雷达图', value: '雷达图' },
                  { label: '3D图', value: '3D图' },
                  { label: '动态排序折线图', value: '动态排序折线图' },
                ]}
              />
            </ProForm.Group>
            <ProFormUploadButton
              extra="支持扩展名：.xls .xlsx"
              label="CSV数据文件"
              name="file"
              title="上传文件"
              max={1}
              onChange={({ fileList }: { fileList: any }) => {
                if (fileList && fileList.length > 0) {
                  setFile(fileList[0].originFileObj);
                }
              }}
            />
          </ProForm>
        </Card>
      </PageContainer>

      <PageContainer title="图表和结论">
        <div>
          {option ? (
            <div>
              <Card title="分析结论">
                {chart?.genResult ?? <div>请先提交数据</div>}
                <Spin spinning={submitting} />
              </Card>
              {/*图表数据存在才渲染图表*/}
              <Card title="可视化图表">
                {option ? <ReactECharts option={option} /> : <div>请先提交数据</div>}
              </Card>
            </div>
          ) : (
            <Card>{submitting ? <ReactECharts option={load} /> : <div>请先提交数据</div>}</Card>
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default AddChart;
