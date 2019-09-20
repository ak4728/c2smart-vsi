import React from "react";
import { Button, Form, DatePicker, Input, Tooltip, Icon, InputNumber } from "antd";
import VirtualEarthPipeline from './VirtualEarthPipeline';
import NJTransitPipeline from './NJTransitPipeline';
import NY511Pipeline from './NY511Pipeline';
import TwitterPipeline from './TwitterPipeline';


const { RangePicker } = DatePicker;

class PipelineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { TimeFrom: "", TimeTo: "", Interval: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const newResultData = this.props.resultData;
        newResultData.push(values);
        console.log(newResultData);
        this.props.setResultData(newResultData);
      }
    });
  };

  renderSwitch(name) {
    switch (name) {
      case "VirtualEarth":
        return <VirtualEarthPipeline form={this.props.form} />;
      case "NJTransit":
        return <NJTransitPipeline form={this.props.form} />;
      case "NY511":
        return <NY511Pipeline form={this.props.form} />;
      case "Twitter":
        return <TwitterPipeline form={this.props.form} />;
      default:
        return null;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      }
    };
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0
    //     },
    //     sm: {
    //       span: 16,
    //       offset: 8
    //     }
    //   }
    // };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Pipeline Type">
          {getFieldDecorator("pipelineType", {
            rules: [
              {
                required: true,
                message: ""
              }
            ],
            initialValue: this.props.name
          })(
            <Input readOnly="readonly" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Time Range">
          {getFieldDecorator("timeRange", {
            rules: [
              {
                required: true,
                message: "Please input the time range"
              }
            ]
          })(
            <RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={["Start Time", "End Time"]}
            />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Interval&nbsp;
              <Tooltip title="The unit is second">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("interval", {
            rules: [
              {
                required: true,
                message: "Please input the interval"
              }
            ]
          })(
            <InputNumber min={0} precision={0} />
          )}
        </Form.Item>
        {this.renderSwitch(this.props.name)}

        <Button htmlType="submit" className="pipelineSubmitBtn">
          Submit
        </Button>
      </Form>
    );
  }
}

export default PipelineForm;