import React from "react";
import {  Form, Input } from "antd";

class TwitterPipeline extends React.Component {
  // TODO: in the future change to base class, add inheritance
  constructor(props) {
    super(props);
    // TODO: in the future add error check function inside
    this.state = {
    };
    this.formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      }
    };
    this.formButtonLayout = {
      wrapperCol: {
        xs: { span: 8, offset: 4 },
        sm: { span: 8, offset: 4 }
      }
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <Form.Item {...this.formItemLayout} label="Keywords">
          {getFieldDecorator("keywords", {
            rules: [
              {
                required: true,
                message: "Keywords are required"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...this.formItemLayout} label="Limit">
          {getFieldDecorator("limit", {
            rules: [
              {
                required: false,
                // message: "Limit is required"
              }
            ]
          })(<Input style={{ width: '30%' }} />)}
        </Form.Item>
      </React.Fragment>
    );
  }
}

export default TwitterPipeline;