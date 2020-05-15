import React from 'react';
import "./Login.css"
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

export default class Login extends React.Component {
  constructor(){
    super()

    this.state = {
      name: '',
      email: '',
      password: '',
      loginError: '',
      redirect: false
    }
  }

  nameOnchangeHandler(e){
    this.setState({
      ...this.state,
      name: e.target.value
    })

  }


  emailOnchangeHandler(e){
    this.setState({
      ...this.state,
      email: e.target.value
    })

  }
  passwordOnchangeHandler(e){
    this.setState({
      ...this.state,
      password: e.target.value
    })
    
  }
  async formOnsubmit(e){
    e.preventDefault()

    axios.post('http://localhost:3001/register', {
     name: this.state.name, 
     email: this.state.email,
     password: this.state.password
   })
   .then( (response) => {
    console.log(response);

    if (response.data == '/login') {
      this.setState({
        ...this.state,
        redirect: true
      })
    }

    this.setState({
      ...this.state,
      loginError: ""
    })
    

  })
  .catch((error) => {
    console.log(error);
    
  });
  }


  render(){
      console.log(this.state);
      
    return(
      <div className="container">
        <div className="login">
        {this.state.redirect === true ? <Redirect to="/login"/> : false }
        <p>{this.state.loginError}</p><br/>
          <form onSubmit={(e) => this.formOnsubmit(e) }>
            <input onChange={(e) => this.nameOnchangeHandler(e) } type="text" placeholder="name"/><br/>
            <input onChange={(e) => this.emailOnchangeHandler(e) } type="text" placeholder="email"/><br/>
            <input onChange={(e) => this.passwordOnchangeHandler(e) } type="password" name="" id="" placeholder="password"/><br/>
            <input type="submit" value="Sign Up"/>
          </form>
        </div>
      </div>
    )
  }
}
