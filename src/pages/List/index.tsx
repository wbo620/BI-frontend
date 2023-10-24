import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

/**
 * 添加图表页面
 * @constructor
 */
const Paa: React.FC = () => {
  /**
   * 提交
   * @param values
   */
  const option = {
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
  return (
    <Card className="result2" title="可视化图表">
      {option ? <ReactECharts option={option} /> : <div>请先提交数据</div>}
    </Card>
  );
};

export default Paa;
