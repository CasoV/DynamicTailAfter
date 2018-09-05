/**
 * 参数 editable: 0 || false:不能编辑输入
 *                1 || true:普通输入框
 *                2: 选择输入框,可传入options配合使用
 *                3:年月输入框
 *                4:CheckBox -- true||false
 */

import React from 'react';
import { Input, Form, Select, DatePicker, Checkbox} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const EditableContext = React.createContext();
const monthFormat = 'YYYY-MM';

@Form.create()

export default class EditableCell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
    }
  }


  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing && this.props.editable == 1) {
        this.input.focus();
      } else if (editing && this.props.editable == 2) {
        this.select.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    const {
      dataIndex,
      record,
    } = this.props;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      if (this.props.editable == 1) this.save();
      else if (this.props.editable == 3) {
        setTimeout(() => {this.changeState()}, 200)
      }
    }
  }
  changeState = () => {
    const editing = false;
    this.setState({ editing }, () => {
    });
  }
  save = () => {
    if (this.props.editable == 1) {
      const { record, handleSave } = this.props;
      this.props.form.validateFields((error, values) => {
        if (error) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    }
  }
  handleChange = (value) => {
    const { record, handleSave } = this.props;
    var selectValue = new Array();
    selectValue[this.props.dataIndex] = value;
    this.toggleEdit(value);
    if (value) {
      handleSave({ ...record, ...selectValue });
    }
  }
  dateMonthChange = (date, dateString) => {
    const { record, handleSave } = this.props;
    var selectValue = new Array();
    selectValue[this.props.dataIndex] = dateString;
    this.toggleEdit(dateString);
    if (dateString) {
      handleSave({ ...record, ...selectValue });
    }
  }
  checkBoxChange = (e) =>{
    const { record, handleSave } = this.props;
    var selectValue = new Array();
    selectValue[this.props.dataIndex] = e.target.checked;
    handleSave({ ...record, ...selectValue });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      options,
      ...restProps
    } = this.props;
    const optionChildren = [];

    if (this.props.options) {
      for (let i = 0; i < this.props.options.length; i++) {
        optionChildren.push(<Option key={this.props.options[i]}>{this.props.options[i]}</Option>);
      }
    }

    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable == 1 ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : editable == 2 ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Select placeholder="请选择" style={{ width: '100%' }} ref={node => (this.select = node)}
                        onBlur={this.handleChange}>
                        {optionChildren}
                      </Select>
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : editable == 3 ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex)(
                      <MonthPicker defaultValue={moment(record[dataIndex], monthFormat)} format={monthFormat} ref={node => (this.monthPicker = node)}
                        onChange={this.dateMonthChange} />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ): editable == 4 ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex)(
                        <Checkbox defaultChecked={record[dataIndex]} onChange={this.checkBoxChange}/>
                    )}
                  </FormItem>
                )
            }}
          </EditableContext.Consumer>
        ): (restProps.children)}
      </td>
    );
  }
}
