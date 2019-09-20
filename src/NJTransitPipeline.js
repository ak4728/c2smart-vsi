import React from "react";
import { Button, Transfer, Form } from "antd";

class NJTransitPipeline extends React.Component {
	
	state = {
    mockData: [],
    targetKeys: [],
  }

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const busID = [107,108,111,112,113,114,115,116,117,119,121,122,123,124,125,126,127,128,129,130,
    	131,132,133,135,136,137,138,139,144,145,148,151,153,154,155,156,157,158,159,160,161,162,163,
    	164,165,166,167,168,177,190,191,192,193,194,195,196,197,198,199,319,320,321,324];
    const mockData = [];

    for (let i = 0; i < busID.length; i++) {
      const data = {
        key: busID[i].toString(),
        description: busID[i],
      };
      mockData.push(data);
    }
    this.setState({ 
    	mockData: mockData 
    });
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  renderFooter = () => (
    <Button
      size="small"
      style={{ float: 'right', margin: 5 }}
      onClick={this.getMock}
    >
      reload
    </Button>
  )

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 }
      }
    };

    return (
      <Form.Item {...formItemLayout} label="Bus Number">
	      {getFieldDecorator('busNumber', {
	      	rules: [
              {
                required: true,
                message: "Bus Number is required"
              }
            ]
	      })(
          <Transfer
		        dataSource={this.state.mockData}
		        showSearch
		        listStyle={{
		          width: 250,
		          height: 300,
		        }}
		        operations={['to right', 'to left']}
		        targetKeys={this.state.targetKeys}
		        onChange={this.handleChange}
		        render={item => `${item.description}`}
		        footer={this.renderFooter}
		      />
	      )}
      </Form.Item>	
    );
  }

}

export default NJTransitPipeline;