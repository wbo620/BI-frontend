import { PageContainer } from '@ant-design/pro-components';
import {Card, Divider, Image, theme} from 'antd';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import examplePic from '../components/Picture/example2.png';

const Welcome: React.FC = () => {
  const { token } = theme.useToken();

  const example1 = {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text:'智能BI',
            fontSize: 70,
            fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#000',
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: 3500,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transarent',
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent',
                },
              },
              {
                percent: 0.8,
                style: {
                  fill: 'black',
                },
              },
            ],
          },
        },
      ],
    },
  };
  const colors = ['#5470C6', '#EE6666'];
  const example2 = {
    color: colors,
    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {},
    grid: {
      top: 70,
      bottom: 50,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            },
          },
        },
        // prettier-ignore
        data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'],
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            },
          },
        },
        // prettier-ignore
        data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Precipitation(2015)',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: 'series',
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: 'Precipitation(2016)',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series',
        },
        data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
      },
    ],
  };
  return (
    <PageContainer>

      <div>
        <ReactECharts option={example1} />
      </div>
      <Card >

        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '24px',
              color: token.colorTextHeading,
            }}
          ></div>

          <Divider />
          <article
            style={{
              fontSize: '16px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
            }}
          >
            <h2>传统 BI 系统</h2>
            <p>
              传统的 BI
              系统主要依赖于存储的数据和预定义的报表。数据分析师通常需要提出特定的查询，并手动分析数据以产生有价值的见解。这个过程通常需要时间，并且容易受到分析师的主观判断的影响。传统
              BI 系统通常限制于静态数据，而且无法处理大规模、复杂的数据。
            </p>
            <Divider />
            <h1>AI 驱动的 BI 系统</h1>
            <p>
              我们公司的 BI 系统采用了最新的 AI
              技术，实现了智能数据分析和生成。以下是我们系统的一些关键特点：
            </p>
            <ul>
              <li>
                <strong>自动分析与预测</strong>: 我们的系统使用 AI 算法对数据进行实时分析和预测，并给出结论以供参考。
              </li>
              <li>
                <strong>生成可视化和报表</strong>: AI 驱动的 BI 系统可以自动生成交互式可视化和报表。
              </li>
              <li>
                <strong>节省时间和人力成本</strong>: 我们的 BI 系统，可以减少相应工作人员的负担，减少不必要的成本。
              </li>
            </ul>
            <Divider />
            <h2>异同对比</h2>
            <ol>
              <li>
                <strong>速度和效率</strong>: 传统 BI 系统需要大量的人工干预，而 AI
                驱动的系统可以快速自动执行数据分析，提供及时的见解。
              </li>
              <li>
                <strong>准确性</strong>: AI
                驱动的系统通过减少人工错误和主观偏见，提高了数据分析的准确性。
              </li>
              <li>
                <strong>自动化</strong>: AI 驱动的 BI
                系统能够自动执行分析数据和图表生成，减轻了数据分析师的工作负担。
              </li>
              <li>
                <strong>可扩展性</strong>: AI 驱动的系统更容易扩展，以适应不断增长的数据需求。
              </li>
              <li>
                <strong>实时性</strong>: AI 驱动的系统可以提供实时数据分析，而传统 BI
                系统通常需要时间来生成报表。
              </li>
            </ol>
            <Divider />
            <div>
              <h2>实例演示</h2>
              <p>
                只要提交数据，还有想要分析的想法，以及所要生成的图表类型，您就可能会得到以下图表。
              </p>
              <p>
                比如：您的分许需求为:『对比两年内的月平均降水量的变化』，图表类型：『动态折线图』，你只要提交以下示例数据，那么AI就可以代替分析师给出建议和图表展示
              </p>
            </div>
            <Image src={examplePic} />
            <div>
              <ReactECharts option={example2} />
            </div>
              <div>
                <strong>分析结论:</strong>
                <br />
                <br />
                <p>根据这些数据，我们可以得出以下降水量的增长趋势： </p>
                <p> 从1月到3月，两年的降水量都在增加，但2016年的增幅较大。 </p>
                <p> 在4月，2016年的降水量继续增加，但2015年的也有显著增长。 </p>
                <p>
                  从5月到7月，2016年的降水量迅速增加，特别是7月，降水量急剧上升，而2015年的降水量相对较低。{' '}
                </p>
                <p>从8月到12月，两年的降水量都有所下降，但2015年的降水量大部分时间都高于2016年。 </p>
                <p>
                  总体来说，2015年和2016年的降水量数据显示出季节性变化，但2016年的降水量在某些月份明显高于2015年，尤其是夏季。这可能反映了气象条件的年度变化，或者是其他因素导致的降水量波动。{' '}
                </p>
              </div>


          </article>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
