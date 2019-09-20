import React from "react";
import {  Table } from "antd";
import { API_URL } from './DataViewMenu.js'

class NY511DataView extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
    	dataView: [],
			loading: this.props.loading,
    };
    this.columns = [];
		const columnNames = ["timeFrom", "timeTo", "interval", "userName", "createdAt", "APIkey"];
    for (let name of columnNames) {
      this.columns.push({
        title: name,
        dataIndex: name,
        key: name
      });
    }
	}

  componentDidMount() {
    fetch(API_URL, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'Data=NY511',
    })
    .then(function(response){
      return response.json();
    })
    .then((myJson) => {  // only using arrow function to pass "this" inside.
      this.setState({
        dataView: myJson['data'],
        loading: false,
      });
    });
  }

	render() {
  	return (
			<Table 
        columns={this.columns} 
        dataSource={this.state.dataView} 
        loading={this.state.loading}
        scroll={{x:true}}
     	/>
		);
	}

}

export default NY511DataView;