/**
 * Created by RedLi on 2018/8/30
 */

import React from 'react';
import {connect} from "dva/index";
import {Table, Button, Form, Modal, AutoComplete, Select, Input} from 'antd';
import EditableCell from '../../components/EditableCell';
import {message} from "antd/lib/index";

const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const CreateForm = Form.create()(props => {
  const {modalVisible, form, handleAdd, handleModalVisible} = props;

  const prefixSelector = form.getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{width: 70}}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="变更联系人"
      visible={modalVisible}
      onCancel={() => handleModalVisible()}
      footer={[
        <Button key="back" onClick={() => handleModalVisible()}>取消</Button>,
        <Button key="submit" type="primary" htmlType="submit" onClick={okHandle}>
          修改
        </Button>,
      ]}
    >
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="姓名">
        {form.getFieldDecorator('name', {
          rules: [{required: true, message: '请输入姓名'}],
        })(<Input placeholder=""/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="角色">
        {form.getFieldDecorator('role', {
          rules: [{required: true, message: '请选择角色'}],
        })(<Select style={{width: '100%'}} onChange={() => {
        }}>
          <Option value="1">数据上报员1</Option>
          <Option value="2">数据上报员2</Option>
          <Option value="3">数据上报员3</Option>
        </Select>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="电话号码">
        {form.getFieldDecorator('phone', {
          rules: [{required: true, message: '请输入电话号码'}],
        })(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="手机号码类型">
        {form.getFieldDecorator('phone_type', {
          rules: [{required: true, message: '请选择号码类型'}],
        })(<Select style={{width: '100%'}} onChange={() => {
          }}>
            <Option value="yi_dong">中国移动</Option>
            <Option value="lian_tong">中国联通</Option>
            <Option value="dian_xin">中国电信</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});

@Form.create()
@connect(({contactsMaintenance}) => ({
  contactsMaintenance,
}))

export default class ContactsMaintenance extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.columns = [
      {
      title: '序号',
      dataIndex: 'key',
    }, {
      title: '角色',
      dataIndex: 'role',
    }, {
      title: '姓名',
      dataIndex: 'name',
      // editable:true,
    }, {
      title: '手机号',
      dataIndex: 'phone',
    }, {
      title: '手机号码类型',
      dataIndex: 'phoneType',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
            <a onClick={()=>this.handleModalVisible(true)}>变更</a>
        );
      }
    }]
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const {dispatch} = this.props;
    console.log(fields);
    // dispatch({
    //   type: 'rule/add',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    //
    // message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleSave = () => {

  }

  render() {
    const {dataSource} = this.props.contactsMaintenance
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const {getFieldDecorator} = this.props.form;

    const {modalVisible} = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <div>
        <div style={{flexDirection: 'row', justifyContent: 'space-between', display: 'flex', marginBottom: 16}}>
          <Button onClick={() => this.handleModalVisible(true)} type="primary" style={{display:'none'}}>
            添加联系人
          </Button>
          <Button onClick={() => this.handleSave()} type="primary" style={{display:'none'}}>
            保存
          </Button>
        </div>

        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={this.columns}
        />

        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
      </div>
    );
  }
}

const styles = {
  formItem: {
    flex: 1,
  },

  input: {
    width: 200,
  }
}
