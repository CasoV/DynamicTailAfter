/**
 * Created by RedLi on 2018/9/3
 */

import React, {Component} from 'react';
import {Select, Table, Popconfirm, Button, Tabs, Input, Divider} from 'antd';
import {connect} from 'dva/index';
import ProjectInfoView from '../../components/ProjectInfoView'
import {Spread} from '@grapecity/spread-sheets';
import {Form} from "antd/lib/index";

const TabPane = Tabs.TabPane;
const TextArea = Input.TextArea;

@Form.create()
@connect(({halfMonthFormSubmitDetail}) => ({
  halfMonthFormSubmitDetail
}))

export default class HalfMonthFormSubmitDetail extends Component {

  constructor(props){
    super(props);
    this.state = {};
    this.columns = [{
        title: '序号',
        dataIndex: 'key',
      }, {
        title: '文件名称',
        dataIndex: 'fileName',
        width: '40%',
      }, {
        title: '文件类型',
        dataIndex: 'fileType',
        // editable:true,
      }, {
        title: '文件大小',
        dataIndex: 'fileSize',

      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <div style={{}}>
              <a onClick={()=>this.handleModalVisible(true)}>查看</a>
              <Divider type='vertical'/>
              <a onClick={()=>this.handleModalVisible(true)}>下载</a>
            </div>
          );
        }
      }
    ];
  }

  componentDidMount() {

  }

  handleForm = (type) => {
    switch (type) {
      case 'add':

        break;
      case 'save':

        break;
      case 'delete':

        break;
      case 'export':

        break;
      default:

        break;
    }
  }

  render() {

    const {files} = this.props.halfMonthFormSubmitDetail;

    return (
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10}}>
          <span style={{fontSize: 15}}>2018年第6期填报内容</span>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Button type='primary' style={{}} onClick={() => this.handleForm('export')}>导出Excel</Button>
          </div>
        </div>

        <Tabs defaultActiveKey="1" tabPosition='top' type='card' tabBarStyle={{margin:0}}>
          <TabPane tab="进度数据" key="1">
            <Tabs defaultActiveKey="11" tabPosition='top' animated={false} size='small'>
              <TabPane tab="路基工程" key="11">
                Content of Tab Pane 11
              </TabPane>
              <TabPane tab="路面工程" key="12">Content of Tab Pane 12</TabPane>
              <TabPane tab="桥梁工程" key="13">Content of Tab Pane 13</TabPane>
              <TabPane tab="隧道工程" key="14">Content of Tab Pane 14</TabPane>
              <TabPane tab="进场路" key="15">Content of Tab Pane 15</TabPane>
              <TabPane tab="资金到位" key="16">Content of Tab Pane 16</TabPane>
              <TabPane tab="征地拆迁" key="17">Content of Tab Pane 17</TabPane>
              <TabPane tab="投资完成" key="18">Content of Tab Pane 18</TabPane>
              <TabPane tab="安全生产" key="19">Content of Tab Pane 19</TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="项目情况一览" key="2">
            <ProjectInfoView {...this}/>
          </TabPane>
          <TabPane tab="存在的问题" key="3">
            <div style={{display:'flex', flexDirection:'column', padding:10}}>
              <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <span style={{width:'15%'}}>存在的问题及解决措施：</span>
                <Divider></Divider>
              </div>
              <span>完成计划的措施</span>
              <TextArea rows={5}/>
              <span style={styles.span}>目前施工情况：</span>
              <TextArea rows={5}/>
              <span style={styles.span}>目前存在的问题：</span>
              <TextArea rows={5}/>
              <span style={styles.span}>解决的措施：</span>
              <TextArea rows={5}/>
              <span style={styles.span}>备注：</span>
              <TextArea rows={5}/>
            </div>
          </TabPane>
          <TabPane tab="文档" key="4">Content of Tab Pane 4</TabPane>
          <TabPane tab="半月报审批单" key="5">
            <Table
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={files}
              columns={this.columns}/>
          </TabPane>
          <TabPane tab="更新选项" key="6">Content of Tab Pane 5</TabPane>
        </Tabs>
      </div>);
  }
}

const styles = {
  span:{
    marginTop:15
  }
}
