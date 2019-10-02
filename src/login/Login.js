import React from "react";
import { Redirect } from 'react-router';
import { Button, Form } from "antd";
// import { API_URL } from './PipelineMenu.js';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    state = {
      username : '',
      password : ''
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault();
      // let data = {name: "stepOne", values: [this.state.user]};
      // this.context.router.push("/");
      // event.preventDefault();
      console.log(this.state);

      fetch('http://127.0.0.1:8000/login',{
        method : 'POST',
        headers : {
          Accept : 'application/json',
          'Content-type' : 'application/x-www-form-urlencoded',
        },
        body : JSON.stringify({
          username : this.state.username,
          password : this.state.password
        })
        // body : 'Data = Users'
      })
      .then(function(response){
        return response.json();
      })
      .then((myResult) => {
        console.log(myResult); 
        var userArray = [];
        userArray = myResult['data'];
        userArray.forEach(element => {
          if (element['password'] === this.state.password){
            this.props.history.push("/");
          }
        });
      })
    }

    render() {
        return (
        <div>
            <img class="logo" src= {require ("./logo.png") }></img>
            <div class="login-page show">
              <div class="form">
                <form method="post" class="login-form">
                  <input type="text" name="username" placeholder="username" ref = "username" onChange = {this.handleInputChange} />
                  <input type="password" name="password" placeholder="password" onChange = {this.handleInputChange}/>
                  {/* <Button type="button" color="primary" onClick={this.handleSubmit}>primary</Button>&nbsp; */}
                  <input type="submit" class="buttonSubmit" name="login" value="login" onClick ={this.handleSubmit} />
                </form>
              </div>
            </div>
        </div>
        )
    }
}

export default Login;