import React from "react";
import { Redirect } from 'react-router';
import { Button, Form } from "antd";
import './login.css';
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
      })
      .then(function(response){
        return response.json();
      })
      .then((myResult) => {
        console.log(myResult); 
        var matched = false;
        matched = myResult['Matched'];
        if (matched){
            // this.props.history.pop('/');
            this.props.history.push("/home");
        }
        else {
          alert('Wrong username or password');
        }
      })
    }

    render() {
        return (
        // <div>
        //     <img class="logo" src= {require ("./logo.png") }></img>
        //     <div class="login-page show">
        //       <div class="form">
        //         <form method="post" class="login-form">
        //           <input type="text" name="username" placeholder="username" ref = "username" onChange = {this.handleInputChange} />
        //           <input type="password" name="password" placeholder="password" onChange = {this.handleInputChange}/>
        //           {/* <Button type="button" color="primary" onClick={this.handleSubmit}>primary</Button>&nbsp; */}
        //           <input type="submit" class="buttonSubmit" name="login" value="login" onClick ={this.handleSubmit} />
        //         </form>
        //       </div>
        //     </div>
        // </div>
        <div class="main">
        <img class="logo" src= {require ("./logo.png") }></img>
        <div class="container">
           <h1 class = "HeaderText" >C2SMART Virtual Sensor Interface</h1>
           <div class="content">
           <div class="login-page show">
             <div class="form">
               <form class="login-form" method="post">
                 <input type="text" name="username" placeholder="username" ref = "username" onChange = {this.handleInputChange} />
                 <input type="password" name="password" placeholder="password" onChange = {this.handleInputChange} />
                 <input type="submit" class="buttonSubmit" name="login" value="login" onClick ={this.handleSubmit} />
               </form>
             </div>
           </div>

           </div>
        </div>
     </div>
        )
    }
}

export default Login;