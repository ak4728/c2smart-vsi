import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";
import "./home.css";
import {
  Button,
  Icon,
  Collapse,
} from "antd";

import PipelineMenu from '../PipelineMenu';
import SubmitButton from '../SubmitButton';
import DataViewMenu from '../DataViewMenu';

const Panel = Collapse.Panel;

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputList: [], 
      submit: "", 
      dataView: false,
      resultData: [],
    };
    this.addPipelineMenu = this.addPipelineMenu.bind(this);
    this.removePipelineMenu = this.removePipelineMenu.bind(this);
    this.createDataView = this.createDataView.bind(this);
    this.emptyIndex = [];
  }
  
  setResultData = (resultData) => {
    this.setState({
      resultData: resultData,
    });
  }

  addPipelineMenu(e) {
    const inputList = this.state.inputList;
    if (this.emptyIndex.length > 0) {
      inputList.push(this.emptyIndex.pop());
    } else {
      inputList.push(inputList.length); //mark as unique id
    }
    console.log(inputList);
    this.setState({
      dataView: false,
      inputList: inputList,
      submit: <SubmitButton 
                resultData={this.state.resultData}
                setResultData={this.setResultData}
              />
    });
  }

  removePipelineMenu(id, e) {
    e.preventDefault();
    const newInputList = this.state.inputList.filter(function(el) {
      return el !== id;
    });
    this.emptyIndex.push(id);
    this.setState({
      inputList: newInputList,
      submit: newInputList.length > 0 ? <SubmitButton /> : null
    });
  }

  createDataView() {
    this.setState({
      dataView: true,
      inputList: [],
      submit: null,
      loading: true,
    });
  }

  renderDataView() {
    return (this.state.dataView ? <DataViewMenu key={Math.random().toString()} /> : null);
  }

  render() {
    return (
      <div>
        <Button onClick={this.addPipelineMenu}>Add a new pipeline</Button>
        <Button onClick={this.createDataView}>View your data</Button>
        <br />
        <Collapse bordered={false} defaultActiveKey={['0']}>
          {this.state.inputList.map(id => (
            <Panel
              header=<Icon 
                       type="close" 
                       className='pipelineRemove' 
                       onClick={(e) => this.removePipelineMenu(id, e)} 
                     />
              key={id} 
            >
              <PipelineMenu 
                id={id}
                resultData={this.state.resultData}
                setResultData={this.setResultData}
              />
            </Panel>
          ))}
        </Collapse>
        {this.renderDataView()}
        {this.state.submit}
      </div>
    );
  }
}
export default MainMenu;

// const routing = (
//   <Router>
//     <div>
//       <Route path = "/" component = {Login}/>
//       <Route path = "/home" component = {MainMenu}/>
//     </div>
//   </Router>
// )
// ReactDOM.render(routing, document.getElementById('container'))

