import React from "react";
import {  Form, Input } from "antd";

class NY511Pipeline extends React.Component {
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
        <Form.Item {...this.formItemLayout} label="API Key">
          {getFieldDecorator("apiKey", {
            rules: [
              {
                required: true,
                message: "API key is required"
              }
            ]
          })(<Input />)}
        </Form.Item>
      </React.Fragment>
    );
  }
}

export default NY511Pipeline;