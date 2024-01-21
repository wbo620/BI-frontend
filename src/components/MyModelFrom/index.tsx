import React from 'react';
import {Button, message, Modal} from 'antd';
import {ModalForm} from "@ant-design/pro-form";
import MyCard from "@/components/Mychart";
import {deleteChartUsingPOST} from "@/services/icebi/chartController";

// 将详情，删除按钮封装
const MyModelFrom = ({item, onChartDeleted}) => {

  // 删除图表
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteChartUsingPOST({id});

      if (res.code !== 0) {
        message.error('删除失败')
      }
      // 调用回调函数刷新 MyChartPage 中的数据
      onChartDeleted();
      message.success('删除成功');

    } catch (error) {
      console.error('删除图表时出错:', error);
      message.error('删除失败');
    }
  };


  return (
    <div style={{textAlign: 'right'}}>
      <Button danger key="delete"
              style={{marginLeft: '10px', marginRight: '10px', bottom: '1'}}
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
        trigger={<Button type="primary">详情</Button>}
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
        {item.genChart && <MyCard genChart={item.genChart}/>}
        <div>{item.genResult ?? ''}</div>
      </ModalForm>
    </div>
  );
};

export default MyModelFrom;
