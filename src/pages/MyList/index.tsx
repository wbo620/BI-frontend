import {listMyChartByPageUsingPOST} from "@/services/icebi/chartController";


import {useModel} from '@@/exports';
import {Card, List, message} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';
import Search from "antd/es/input/Search";


/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    pageSize: 4,
    current: 1,
  }
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const loadData = async () => {
    setLoading(true)
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
        // 隐藏图表的 title
        if (res.data.records) {
          res.data.records.forEach(data => {
            const chartOption = JSON.parse(data.genChart ?? '{}');
            chartOption.title = undefined;
            data.genChart = JSON.stringify(chartOption);

          })
        }
      } else {
        message.error('获取图表失败');
      }
    } catch (e: any) {
      message.error('获取用户图表失败' + e);
    }
    setLoading(false)
  }
  useEffect(() => {
    loadData();
  }, [searchParams])

  return (
    <div className='my-chart'>
      <div>
        <Search placeholder="请输入图表名称" enterButton onSearch={(value) => {
          // 设置搜索条件
          setSearchParams({
            ...initSearchParams,
            name: value,
          })
        }}/>
      </div>
      <div className="margin-16"/>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        size="large"
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            })
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        dataSource={chartList}

        renderItem={(item) => (
          // 图表标题
          <List.Item
            key={item.id}
            style={{marginBottom: 10}}
          >
            <Card>
              {/*图表的信息*/}
              <List.Item.Meta
                title={item.name}
                description={item.chartType ? '图表类型: ' + item.chartType : undefined}
              />
              {/* 图表展示*/}
              {<div>
                <div className='margin-16'/>
                <p>{'分析目标: ' + item.goal}</p>
                <div className='margin-16'/>
                <ReactECharts option={item.genChart && JSON.parse(item.genChart)}/>

                <p>{'分析结论： ' + item.genResult}</p>
              </div>
              }
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyChartPage;
