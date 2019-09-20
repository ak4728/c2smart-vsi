import React from "react";
import { Button, Form } from "antd";
import PipelineForm from "./PipelineForm";

const Pipeline = Form.create({ name: "pipeline" })(PipelineForm);

class PipelineMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputList: [
        <Button key="VirtualEarth" onClick={() => this.renderPipeline("VirtualEarth")}>
          VirtualEarth
        </Button>,
        <Button key="NJTransit" onClick={() => this.renderPipeline("NJTransit")}>
          NJTransit
        </Button>,
        <Button key="NY511" onClick={() => this.renderPipeline("NY511")}>
          NY511
        </Button>,
        <Button key="Twitter" onClick={() => this.renderPipeline("Twitter")}>
          Twitter
        </Button>,
        <Button key="D" onClick={() => this.renderPipeline("D")}>PipelineD</Button>,
      ]
    };
    this.renderPipeline = this.renderPipeline.bind(this);
  }

  renderPipeline(name) {
    this.setState({
      inputList: [
        <Pipeline 
          key={name + "Pipeline"}
          name={name} 
          resultData={this.props.resultData}
          setResultData={this.props.setResultData}
        />,
      ]
    });
  }

  render() {
    return (
      <div className="popu  ptext" id="data">
        {this.state.inputList}
      </div>
    );
  }
}

export default PipelineMenu;