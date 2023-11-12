
import {Avatar, Button, Card, List, message, Modal, Result} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';
import Search from "antd/es/input/Search";
import {deleteChartUsingPOST, listMyChartByPageUsingPOST} from "@/services/icebi/chartController";
import {ModalForm} from "@ant-design/pro-form";
import MyCard from "@/components/Mychart";

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    pageSize: 4,
    current: 1,
    sortField: 'createTime',
    sortOrder: 'desc',
  }
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initSearchParams});

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
            if (data.status === 'succeed') {
              const chartOption = JSON.parse(data.genChart ?? '{}');
              chartOption.title = undefined;
              data.genChart = JSON.stringify(chartOption);
            }
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

  // 删除图表
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteChartUsingPOST({id});
      if (res.code !== 0) {
        message.error('删除失败')
      }
      message.success('删除成功');
      loadData(); // 刷新数据
    } catch (error) {
      console.error('删除图表时出错:', error);
      message.error('删除失败');
    }
  };

  return (
    <div className='my-chart'>
      <div>
        <Search placeholder="请输入图表名称" enterButton loading={loading} onSearch={(value) => {
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
        loading={loading}
        renderItem={(item) => (
          // 图表标题
          <List.Item
            key={item.id}
            style={{marginBottom: 10}}
          >
            <Card style={{ width: '100%' }}>
              {/*图表的信息*/}
              <List.Item.Meta
                title={item.name}
                description={item.chartType ? '图表类型: ' + item.chartType : undefined}
              />
              {/* 图表展示*/}
              <>
                {
                  item.status === 'wait' && <>
                    <Result
                      status="warning"
                      title="待生成"
                      subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                    />
                  </>
                }
                {
                  item.status === 'running' && <>
                    <Result
                      status="info"
                      title="图表生成中"
                      subTitle={item.execMessage}
                    />
                  </>
                }
                {
                  item.status === 'succeed' && <>
                    <div style={{marginBottom: 16}}/>
                    <p>{'分析目标：' + item.goal}</p>
                    <div style={{marginBottom: 16}}/>
                    <div>
                      <ReactECharts option={item.genChart && JSON.parse(item.genChart)} />
                    </div>
                    <div>{item.genResult}</div>
                  <div className='margin-16'/>
                    <div style={{textAlign: 'right'}}>
                      <Button danger key="delete"
                              style={{ marginLeft: '10px', marginRight: '10px', bottom: '1' }}
                              onClick={() => {
                                Modal.confirm({
                                  title: '确认删除',
                                  content: '确定要删除这个图表吗？',
                                  onOk: () => handleDelete(item.id ?? 0), // Convert id to a number
                                });
                              }}>
                        删除
                      </Button>

                      <ModalForm
                        title="详情"
                        trigger={<Button type="primary" >详情</Button>}
                        width="80%"
                        submitter={{
                          render: () => {
                            return [
                              <Button danger key="delete" onClick={() => {
                                Modal.confirm({
                                  title: '确认删除',
                                  content: '确定要删除这个图表吗？',
                                  onOk: () => handleDelete(item.id ?? 0), // Convert id to a number
                                });
                              }}>
                                删除
                              </Button>,
                            ];
                          }
                        }}
                        onFinish={async (values) => {
                          console.log(values);
                          message.success('删除成功');
                          return true;
                        }}
                      >
                        <div style={{marginBottom: 16}}/>
                        <div>{'图表标题: ' + item.name}</div>
                        <div>{'图表ID: ' + item.id}</div>
                        <div>{'创建时间: ' + new Date(item.createTime).toLocaleString('zh-CN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}</div>
                        <div>{'分析目标：' + item.goal}</div>
                        <div style={{marginBottom: 16}}/>
                        {/*修复bug 把ReactECharts放入Card标签中*/}
                        {/*出现bug的原因可能是，option的加载比div的加载速度快，导致第一次加载没有挂在到div里，再次点开，才被挂载到*/}

                       <MyCard item={item}/>


                        <div>{item.genResult}</div>
                      </ModalForm>
                    </div>
                  </>
                }
                {
                  item.status === 'failed' && <>
                    <Result
                      status="error"
                      title="图表生成失败"
                      subTitle={item.execMessage}
                    />
                    <div style={{textAlign:"right"}}>
                      <Button danger key="delete"
                              onClick={() => {
                                Modal.confirm({
                                  title: '确认删除',
                                  content: '确定要删除这个图表吗？',
                                  onOk: () => handleDelete(item.id ?? 0), // Convert id to a number
                                });
                              }}>
                        删除
                      </Button>
                    </div>
                  </>
                }
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyChartPage;

