import {listMyChartByPageUsingPOST} from "@/services/icebi/chartController";
import {useEffect, useState} from "react";
import {message} from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, List, Space } from 'antd';
import ReactECharts from "echarts-for-react";
/**
 * 我的图表页面
 * @constructor
 */
const MyList: React.FC = () => {
  const initSearchParams = {
  pageSize:12,
  }
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>();
  const [option,setOption]=useState();
  const loadData = async () => {
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取图表失败');
      }
    } catch (e: any) {
      message.error('获取用户图表失败' + e);
    }

  }
  useEffect(()=>{
    loadData();
  },[searchParams])

  return (
    <div className='my-chart'>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}

        dataSource={chartList}
        footer={
          <div>
          </div>
        }
        renderItem={(item) => (
          <List.Item
            actions={[
            ]}
            extra={
            <ReactECharts option={option}/>
            }
          >
            <List.Item.Meta
            />
          </List.Item>
        )}
      />

    </div>
  );
};

export default MyList;
