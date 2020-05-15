import React from 'react';
import './Header.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import axios from 'axios'

export default class Header extends React.Component{

  constructor(){
    super()

    this.state = {
      loginError: '',
      loggedUserName: ''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3001/user',
    {  
      headers: { 'auth-token': localStorage.getItem('auth-token')} 
    })
    
    .then(response => {
      try {
        console.log(response);
        if(response.data.name) {
          this.setState({
            loggedUserName: response.data.name
          })
        }
        
      } catch (error) {
        console.log(error);
        
      }
    })
  }


  render(){
    return(
      <header>
        <div className="container">
          <div className="header">
            <div className="logo">
            <a href="/">Almost Flerse</a>
            </div>
            <div className="navigation">
             {this.state.loggedUserName !== '' ? 
             <ul>
              <li>
              
              <Link to="/dashboard">Hello, {this.state.loggedUserName}</Link>
              </li>
              </ul>
             
              :
                
             <ul>
              <li>
              <Link to="/register">Register</Link>
              </li>
              <li>
              <Link to="/login">Login</Link>
              </li>
              </ul>}
            </div>
          </div>
        </div>
      </header>
    )
  }
}
