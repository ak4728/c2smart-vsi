import React from "react";
import { Button, Form } from "antd";
import { API_URL } from './DataViewMenu.js';

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const buttons = document.getElementsByClassName("pipelineSubmitBtn");
    // console.log(forms);
    this.props.setResultData([]);
    if (buttons.length === 0) {
      alert("Please at least create one pipeline before submit.");
      return;
    }
    for (let button of buttons) {
      button.click();
    }
    if (this.props.resultData.length < buttons.length) {
      return;
    }
    console.log(JSON.stringify({APIDetails: this.props.resultData}, function(k, v) { return v === undefined ? null : v; }));
    fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ APIDetails: this.props.resultData }, function(k, v) { return v === undefined ? null : v; })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        //console.log(JSON.stringify(myJson));
        if (myJson['result'] === 'success') {
          const pipelineRmBtns = document.getElementsByClassName('pipelineRemove');
          for (let button of pipelineRmBtns) {
            button.click();
          }
          alert("Your data has been stored into database.");
        }
      });
  }

  render() {
    return (
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>Submit</Button>
      </Form.Item>
    );
  }
}

export default SubmitButton;