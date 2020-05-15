import React from 'react'
import axios from 'axios'
import  './Dashboard.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export default  class  Dashboard extends React.Component{
  constructor(){
    super()

    this.state = {
      error: false,
      userName: ''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3001/dashboard', 
    { headers: { 'auth-token': localStorage.getItem('auth-token') } })
    .then(response => {
      console.log(response);
      
    })
    .catch(error => {

      this.setState({
        error: true
      })
      console.log(error)
    });

    // GET USER DATA
    axios.get('http://localhost:3001/user',
    {  
      headers: { 'auth-token': localStorage.getItem('auth-token')} 
    })
    
    .then(response => {
      try {
        console.log(response);
        if(response.data.name) {
          this.setState({
            userName: response.data.name
          })
        }
        
      } catch (error) {
        console.log(error);
        
      }
    })

  }
  
  render(){
    return(
      <div className="dashboard">
       {this.state.error ? <h1>Сперва зарегистрируйтесь</h1> : 
       <div className="container">
        <div className="dashboard-inner">
          <div className="dashboard-greet">
            <h1>Hello, {this.state.userName}</h1>
          </div>
          <div className="dashboard-addPost">
            <Link to="/createPost">Create Post</Link>
          </div>
        </div>
       </div>
       
        }
      </div>
     
    )
  }
  
}

