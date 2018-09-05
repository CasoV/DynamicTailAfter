/**
 * Created by RedLi on 2018/9/3
 */

import React, {Component} from 'react';
import {Select, Table, Popconfirm, Button, Tabs} from 'antd';
import {connect} from 'dva/index';
import { Spread } from '@grapecity/spread-sheets'

const TabPane = Tabs.TabPane;

@connect((monthScheduleDetail) => {
  monthScheduleDetail
})

export default class MonthScheduleDetail extends Component {

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
    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop:10}}>
          <span style={{marginLeft:10, fontSize:15}}>2018年九月进度计划</span>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight:10}}>
            <Button style={styles.button} onClick={()=>this.handleForm('add')}>新增</Button>
            <Button style={styles.button} onClick={()=>this.handleForm('save')}>保存</Button>
            <Button style={styles.button} type='danger' onClick={()=>this.handleForm('delete')}>删除</Button>
            <Button style={styles.button} onClick={()=>this.handleForm('export')}>导出Excel</Button>
          </div>
        </div>

        <Tabs defaultActiveKey="1" tabPosition='top'>
          <TabPane tab="工程形象进度计划" key="1">

          </TabPane>
          <TabPane tab="控制性工程计划" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="资金到位计划" key="3">Content of Tab Pane 3</TabPane>
          <TabPane tab="征地拆迁计划" key="4">Content of Tab Pane 4</TabPane>
          <TabPane tab="投资计划" key="5">Content of Tab Pane 5</TabPane>
        </Tabs>
      </div>);
  }
}

const styles = {
  button: {
    marginLeft: 10,
  }
}
