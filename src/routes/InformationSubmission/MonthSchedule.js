/**
 * Created by RedLi on 2018/8/31
 */

import React, {Component} from 'react';
import {Select, Table, Popconfirm, Button} from 'antd';
import {connect} from "dva/index";
import {routerRedux} from 'dva/router';
import {stringify} from "qs";

const Option = Select.Option;
const curYear = (new Date).getFullYear()


@connect(({monthSchedule}) => ({
  monthSchedule,
}))

export default class MonthSchedule extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.tableColumns = [
      {
        title: '计划月份',
        dataIndex: 'month',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '录入日期',
        dataIndex: 'date',
        editable: true,
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <a onClick={this.handleDerail}>查看</a>
          );
        }
      }
    ]
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({
      type: 'monthSchedule/addYear',
      payload: {
        curYear: curYear,
      },
    });
  }

  handleDerail = () => {
    const { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: '/InformationSubmission/MonthScheduleDetail',
        search: stringify({
          redirect: window.location.href,
        }),
      })
    )
  }

  renderOptions = (arr) => {
    return arr.map((value, index) => {
      return <Option key={index} value={index}>{value}</Option>
    })
  }

  render() {
    const {years, tableData} = this.props.monthSchedule
    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <span>年份：</span>
          <Select defaultValue={curYear} style={{width: '30%'}}>
            {this.renderOptions(years)}
          </Select>
        </div>

        <Table
          style={{marginTop: 10}}
          bordered
          columns={this.tableColumns}
          dataSource={tableData}/>

      </div>);
  }
}
