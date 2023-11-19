import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';
// 延迟加载详情页的图表，修复第一次打开图表不显示的问题
const MyCard = ({ genChart }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // 清理定时器以避免内存泄漏
    return () => clearTimeout(timer);
  }, []); // 空数组表示只在组件挂载时运行

  return (
    <Card>
      {isLoaded && (
        <ReactECharts
          option={genChart && JSON.parse(genChart)}
        />
      )}
    </Card>
  );
};

export default MyCard;
