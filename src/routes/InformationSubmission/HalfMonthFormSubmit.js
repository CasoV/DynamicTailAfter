/**
 * Created by RedLi on 2018/8/31
 */

import React, {Component} from 'react';
import {Tabs, Select, Table, Popover, Modal, Input, Form, Divider, Button} from 'antd';
import {connect} from "dva/index";
import {routerRedux} from "dva/router";
import {stringify} from "qs";

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

const UpOpinionModel = Form.create()(props => {
  const {modalVisible, handleModalVisible, opinion, form} = props;
  return (
    <Modal
      centered
      title="查看交通局审核意见"
      visible={modalVisible}
      onOk={() => handleModalVisible()}
      onCancel={() => handleModalVisible()}
      footer={[
        <Button key="shutdown" type="primary" onClick={() => handleModalVisible()}>
          关闭
        </Button>,
      ]}>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="审核状态">
        {form.getFieldDecorator('status', {
          rules: [{required: true, message: ''}],
        })(<Input style={{fontColor:'red'}} disabled={true} value="已上报"/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="审核人">
        {form.getFieldDecorator('person', {
          rules: [{required: true, message: ''}],
        })(<Input disabled={true} value=""/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="联系方式">
        {form.getFieldDecorator('phone', {
          rules: [{required: true, message: ''}],
        })(<Input disabled={true} value=""/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="审核时间">
        {form.getFieldDecorator('time', {
          rules: [{required: true, message: ''}],
        })(<Input disabled={true} value=""/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="审核单位">
        {form.getFieldDecorator('unit', {
          rules: [{required: true, message: ''}],
        })(<Input disabled={true} value=""/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="审核意见">
        {form.getFieldDecorator('opinion', {
          rules: [{required: true, message: ''}],
        })(<TextArea rows={4} disabled={true} value=""/>)}
      </FormItem>
    </Modal>
  );
});

@Form.create()
@connect(({halfMonthFormSubmit}) => ({
  halfMonthFormSubmit
}))

export default class HalfMonthFormSubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    this.handlePopover = (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <a onClick={this.handleDetail}>填报内容详情</a>
        <Divider type="horizontal" style={{marginTop:8, marginBottom:8}} />
        <a onClick={() => this.handleModalVisible(true)}>上级处理意见</a>
      </div>
    )
    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
      }, {
        title: '期数',
        dataIndex: 'periods',
      }, {
        title: '审核状态',
        dataIndex: 'status',
      }, {
        title: '录入人',
        dataIndex: 'role',
      }, {
        title: '录入时间',
        dataIndex: 'time',
        width: '30%',
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <Popover content={this.handlePopover} trigger="hover">
              <a>查看</a>
            </Popover>

          );
        }
      }
    ];
  }

  handleDetail = () => {
    const { dispatch } = this.props
    dispatch(
      routerRedux.push({
        pathname: '/InformationSubmission/HalfMonthFormSubmitDetail',
        search: stringify({
          redirect: window.location.href,
        }),
      })
    )
  }

  handleSelectChange = (value) => {
    console.log(value)
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {

    const {tableData} = this.props.halfMonthFormSubmit
    const {modalVisible} = this.state

    const upOpinion = {
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <div>
        <div style={{
          display: 'flex',
          displayDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 10
        }}>
          <span>审核状态</span>
          <Select defaultValue="all" style={{width: '30%', marginLeft: 10}} onChange={this.handleSelectChange}>
            <Option value="all">全部</Option>
            <Option value="update">待上报</Option>
            <Option value="back">退回</Option>
          </Select>
        </div>
        <Table
          bordered
          dataSource={tableData}
          columns={this.columns}
        />

        <UpOpinionModel {...upOpinion} modalVisible={modalVisible}/>
      </div>);
  }
}
