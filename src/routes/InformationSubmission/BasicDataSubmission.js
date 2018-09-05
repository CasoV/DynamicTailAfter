/**
 * Created by RedLi on 2018/8/30
 */

import React from 'react';
import { Tabs, Form, Input, Select, Col, Checkbox, DatePicker, Table, Button, Popconfirm} from 'antd';
import { connect } from "dva/index";
import EditableCell from '../../components/EditableCell';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const MonthPicker = DatePicker.MonthPicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const citys = [
  { label: '昆明市', value: '昆明市' },
  { label: '曲靖市', value: '曲靖市' },
  { label: '玉溪市', value: '玉溪市' },
  { label: '保山市', value: '保山市' },
  { label: '昭通市', value: '昭通市' },
  { label: '丽江市', value: '丽江市' },
  { label: '普洱市', value: '普洱市' },
  { label: '临沧市', value: '临沧市' },
  { label: '文山壮族苗族自治州', value: '文山壮族苗族自治州' },
  { label: '红河哈尼族彝族自治州', value: '红河哈尼族彝族自治州' },
  { label: '西双版纳傣族自治州', value: '西双版纳傣族自治州' },
  { label: '楚雄彝族自治州', value: '楚雄彝族自治州' },
  { label: '大理白族自治州', value: '大理白族自治州' },
  { label: '德宏傣族景颇族自治州', value: '德宏傣族景颇族自治州' },
  { label: '怒江傈僳族自治州', value: '怒江傈僳族自治州' },
  { label: '迪庆藏族自治州', value: '迪庆藏族自治州' },
];
const EditableContext = React.createContext();
const EditableRow = ({form,index,...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

@Form.create()

@connect(({ basicDataSubmission}) => ({
  basicDataSubmission,
}))

export default class BasicDataSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '序号',
      dataIndex: 'num',
      width: '10%',
    }, {
      title: '类别',
      dataIndex: 'type',
      editable: 1,
    }, {
      title: '责任单位',
      dataIndex: 'unit',
      editable: 2,
      options:["中交云南高速公路发展有限公司","中铁建设集团有限公司"]
    }, {
      title: '责任人',
      dataIndex: 'name',
      editable: 1,
    }, {
      title: '联系方式',
      dataIndex: 'phone',
      editable: 3,
    }
    // {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   render: (text, record) => {
    //     return (
    //       this.state.dataSource.length >= 1
    //         ? (
    //           <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
    //             <a href="javascript:;">Delete</a>
    //           </Popconfirm>
    //         ) : null
    //     );
    //   },
    // }
  ];
    this.state = {
      dataSource: [{
        key: '0',
        num: '1',
        type: '项目责任主体',
        unit: '中交云南嵩昆高速公路建设指挥部',
        name:'贾凌庆',
        phone:'2018-01'
      }, {
        key: '1',
        num: '2',
        type: '质量监督责任人',
        unit: '中交云南嵩昆高速公路建设指挥部',
        name:'吴镇',
        phone:'2018-07'
      }],
      count: 2,
    };
  }
  // handleDelete = (key) => {
  //   const dataSource = [...this.state.dataSource];
  //   this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  // }
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          options: col.options,
        }),
      };
    });

    // const {mode} = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12, offset: 0 },
      style: { width: '100%' },
    }
    const formInputItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18, offset: 0 },
      style: { width: '100%' },
    }
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object', message: 'Please select time!' }],
    };
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="项目基本信息" key="1">
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'序号'}>
                  {getFieldDecorator('field-0', {
                    rules: [{ message: '请输入序号!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'项目编码'}  >
                  {getFieldDecorator('field-1', {
                    rules: [{ message: '请输入项目编码!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'项目名称'}>
                  {getFieldDecorator('field-2', {
                    rules: [{ message: '请输入项目名称!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'项目简称'}>
                  {getFieldDecorator('field-3', {
                    rules: [{ message: '请输入项目简称!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'项目类型'}>
                  {getFieldDecorator('status-0')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">国高</Option>
                      <Option value="1">地高</Option>
                      <Option value="2">其他</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'项目性质'}>
                  {getFieldDecorator('status-1')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">新建</Option>
                      <Option value="1">改扩建</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'是否为滇中项目'}>
                  {getFieldDecorator('remember-0', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox></Checkbox>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'规划期'}>
                  {getFieldDecorator('status-2')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">“十二五”</Option>
                      <Option value="1">“十三五“</Option>
                      <Option value="2">”十四五”</Option>
                      <Option value="3">“十五五”</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'建设单位'}>
                  {getFieldDecorator('status-3')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">中交云南高速公路发展有限公司</Option>
                      <Option value="1">中铁建设集团有限公司</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'项目工期（月）'}>
                  {getFieldDecorator('field-4', {
                    rules: [{ message: '请输入项目工期!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'建设里程（km）'}>
                  {getFieldDecorator('field-5', {
                    rules: [{ message: '请输入建设里程!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'概算总投资（亿元）'}>
                  {getFieldDecorator('field-6', {
                    rules: [{ message: '请输入概算总投资!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'桥隧比%'}>
                  {getFieldDecorator('field-7', {
                    rules: [{ message: '请输入桥隧比!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'项目布局'}>
                  {getFieldDecorator('status-4')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">五纵</Option>
                      <Option value="1">五横</Option>
                      <Option value="2">一边</Option>
                      <Option value="3">两环</Option>
                      <Option value="4">二十联</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="计划开工年月">
                  {getFieldDecorator('month-picker-0', config)(
                    <MonthPicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="实际开工日期">
                  {getFieldDecorator('date-picker-0', config)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="计划通车年月">
                  {getFieldDecorator('month-picker-1', config)(
                    <MonthPicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="实际通车日期">
                  {getFieldDecorator('date-picker-1', config)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'起点'}>
                  {getFieldDecorator('field-8', {
                    rules: [{ message: '请输入起点!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'止点'}>
                  {getFieldDecorator('field-9', {
                    rules: [{ message: '请输入止点!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'所属线路'}>
                  {getFieldDecorator('field-10', {
                    rules: [{ message: '请输入所属线路!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'项目状态'}>
                  {getFieldDecorator('status-5')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">前期</Option>
                      <Option value="1">开工</Option>
                      <Option value="2">交工</Option>
                      <Option value="3">通车</Option>
                      <Option value="4">竣工</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'技术标准（车道数）'}>
                  {getFieldDecorator('status-6')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">双向四车道</Option>
                      <Option value="1">双向六车道</Option>
                      <Option value="2">双向六（四）车道</Option>
                      <Option value="3">双向二车道</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'试验段是否开工'}>
                  {getFieldDecorator('remember-1', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox></Checkbox>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'是否受理质量监督'}>
                  {getFieldDecorator('remember-2', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox></Checkbox>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="监督日期">
                  {getFieldDecorator('date-picker-2', config)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'监督受理单位'}>
                  {getFieldDecorator('field-11', {
                    rules: [{ message: '请输入监督受理单位!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'统计阶段'}>
                  {getFieldDecorator('status-7')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">前期工作</Option>
                      <Option value="1">进度</Option>
                      <Option value="2">所有</Option>
                      <Option value="3">不统计</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <FormItem {...formInputItemLayout} label={'所属城市'}>
                {getFieldDecorator('remember-3', {

                })(
                  <CheckboxGroup options={citys} defaultValue={['昆明市']} onChange={this.onChange} />
                )}
              </FormItem>
              <FormItem {...formInputItemLayout} label={'控制点'}>
                {getFieldDecorator('field-12', {
                  rules: [{ message: '请输入控制点!' }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
              <FormItem {...formInputItemLayout} label={'项目概况'}>
                {getFieldDecorator('field-13', {
                  rules: [{ message: '请输入项目概况!' }],
                })(
                  <TextArea rows={8} />
                )}
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="实验段信息" key="2"><Form layout="inline" onSubmit={this.handleSubmit}>
            <Col span={12}>
              <FormItem {...formItemLayout} label={'建设单位'}>
                {getFieldDecorator('exper-status-0')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="0">中交云南高速公路发展有限公司</Option>
                    <Option value="1">中铁建设集团有限公司</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
                <FormItem {...formItemLayout} label={'项目工期（月）'}>
                  {getFieldDecorator('exper-field-0', {
                    rules: [{ message: '请输入项目工期!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'建设里程（km）'}>
                  {getFieldDecorator('exper-field-1', {
                    rules: [{ message: '请输入建设里程!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'概算总投资（亿元）'}>
                  {getFieldDecorator('exper-field-2', {
                    rules: [{ message: '请输入概算总投资!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="计划开工年月">
                  {getFieldDecorator('exper-month-picker-0', config)(
                    <MonthPicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="实际开工日期">
                  {getFieldDecorator('exper-date-picker-0', config)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="计划通车年月">
                  {getFieldDecorator('exper-month-picker-1', config)(
                    <MonthPicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="实际通车日期">
                  {getFieldDecorator('exper-date-picker-1', config)(
                    <DatePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label={'状态'}>
                  {getFieldDecorator('exper-status-1')(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value="0">前期</Option>
                      <Option value="1">开工</Option>
                      <Option value="2">交工</Option>
                      <Option value="3">通车</Option>
                      <Option value="4">竣工</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <FormItem {...formInputItemLayout} label={'试验段概况'}>
                {getFieldDecorator('exper-field-3', {
                  rules: [{ message: '请输入试验段概况!' }],
                })(
                  <TextArea rows={8} />
                )}
              </FormItem>
          </Form>
          </TabPane>
          <TabPane tab="责任人信息" key="3">
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns}
            />
          </TabPane>
          <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
          <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
          <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
          <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
          <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
          <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
          <TabPane tab="Tab 10" key="10">Content of tab 10</TabPane>
          <TabPane tab="Tab 11" key="11">Content of tab 11</TabPane>
        </Tabs>
      </div>
    );
  }
}