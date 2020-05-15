import React from 'react';
import "./Login.css"
import axios from 'axios'

export default class Login extends React.Component {
  constructor(){
    super()

    this.state = {
      email: '',
      password: '',
      loginError: ''
    }
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

    axios.post('http://localhost:3001/login', {
      email: this.state.email,
      password: this.state.password
   })
   .then( (response) => {
    console.log(response.data);

    localStorage.setItem('auth-token', response.data);
    

    this.setState({
      ...this.state,
      loginError: ""
    })
    
    

  })
  .catch((error) => {
    console.log(error.response.data);

    this.setState({
      ...this.state,
      loginError: error.response.data
    })
  });


  }


  render(){
      console.log(this.state);
      
    return(
      <div className="container">
        <div className="login">
        <p>{this.state.loginError}</p><br/>
          <form onSubmit={(e) => this.formOnsubmit(e) }>
            <input onChange={(e) => this.emailOnchangeHandler(e) } type="text" placeholder="email"/><br/>
            <input onChange={(e) => this.passwordOnchangeHandler(e) } type="password" name="" id="" placeholder="password"/><br/>
            <input type="submit" value="Log in"/>
          </form>
        </div>
      </div>
    )
  }
}
