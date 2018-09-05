import React from "react";
import {DatePicker, Card, Divider, Form, Col, Input, Select, Checkbox, Table} from 'antd';
import moment from 'moment';

const TabPane = Table.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const CheckboxGroup = Checkbox.Group;
const MonthPicker = DatePicker.MonthPicker;


const ProjectInfoView = Form.create()(props => {
  const { form } = props;

  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12, offset: 0 },
    style: { width: '100%' },
  }

  const formInputItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12, offset: 0 },
    style: { width: '100%' },
  }

  const config = {
    rules: [{ type: 'object', message: '请选择时间' }],
  };

  const monthFormat = 'YYYY.MM';

  return <div>
    <Card title="基本信息" type="inner" bordered={true} style={{ width: '100%', margin:10}}>
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Col span={12}>
          <FormItem {...formItemLayout} label={'建设单位'}>
            {getFieldDecorator('field-0-1', {
              rules: [{ message: '请输入建设单位' }],
            })(
              <Input />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label={'建设规模（KM）'}  >
            {getFieldDecorator('field-0-2', {
              rules: [{ message: '请输入建设规模' }],
            })(
              <Input />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label={'计划工期（月）'}>
            {getFieldDecorator('field-0-3', {
              rules: [{ message: '请输入计划工期' }],
            })(
              <Input />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label={'概算投资（亿元）'}>
            {getFieldDecorator('field-0-4', {
              rules: [{ message: '请输入概算投资' }],
            })(
              <Input />
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label="计划开工年月">
            {getFieldDecorator('month-picker-0', config)(
              <MonthPicker defaultValue={moment('2015.01', monthFormat)} format={monthFormat} style={{width:'100%'}}/>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label="实际开工年月">
            {getFieldDecorator('date-picker-1', config)(
              <MonthPicker defaultValue={moment('2015.02', monthFormat)} format={monthFormat} style={{width:'100%'}}/>
            )}
          </FormItem>
        </Col>
      </Form>
    </Card>
    <Card title="汇总（半月报）项目建设情况一览" type="inner" bordered={true} style={{ width: '100%',margin:10 }}>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'本期完成投资（亿元）'}>
          {getFieldDecorator('field-1-1', {
            rules: [{ message: '请输入本期完成投资' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'本年完成投资（亿元）'}  >
          {getFieldDecorator('field-1-2', {
            rules: [{ message: '请输入本年完成投资' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'累计完成投资（亿元）'}  >
          {getFieldDecorator('field-1-3', {
            rules: [{ message: '请输入累计完成投资' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'累计完成投资占概算百分比'}  >
          {getFieldDecorator('field-1-4', {
            rules: [{ message: '请输入累计完成投资占概算百分比' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'本年计划完成投资（亿元）'}  >
          {getFieldDecorator('field-1-5', {
            rules: [{ message: '请输入本年计划完成投资' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'本年计划完成投资占计划百分比'}  >
          {getFieldDecorator('field-1-6', {
            rules: [{ message: '请输入本年计划完成投资占计划百分比' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'本年到位资金（亿元）'}  >
          {getFieldDecorator('field-1-7', {
            rules: [{ message: '请输入本年到位资金' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'累计到位资金（亿元）'}  >
          {getFieldDecorator('field-1-8', {
            rules: [{ message: '请输入累计到位资金' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'累计到位资金占概算百分比'}  >
          {getFieldDecorator('field-1-9', {
            rules: [{ message: '请输入累计到位资金占概算百分比' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'本年银行贷款到位资金（亿元）'}  >
          {getFieldDecorator('field-1-10', {
            rules: [{ message: '请输入本年银行贷款到位资金' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem {...formInputItemLayout} label={'累计银行贷款到位资金（亿元）'}  >
          {getFieldDecorator('field-1-11', {
            rules: [{ message: '请输入累计银行贷款到位资金' }],
          })(
            <Input />
          )}
        </FormItem>
      </Col>

      <Divider orientation='left' style={{}}></Divider>

      <div style={{display:'flex', flexDirection:'column'}}>
        <span>填写说明:</span>

        <span style={{marginTop:10}}>1、本期各项数值不能小于上一次填报的值；</span>
        <span style={{marginTop:5}}>2、各项数据累计值不能超过项目总概算投资；</span>
      </div>

    </Card>
  </div>
})

export default ProjectInfoView
