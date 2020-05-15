import React from 'react'
import './CreatePost.css'
import axios from 'axios'

export default  class CreatePost extends React.Component {
  constructor(){
    super()

    this.state = {
      title: '',
      description: '',
      postAvatarPath: null,
      selectedFile: null

    }
  }

  onChangeTitle(e){
    this.setState({
      ...this.state,
      title: e.target.value
    })
    
    
  }
  onChangeDescription(e){
    this.setState({
      ...this.state,
      description: e.target.value
    })
  }

   onChangeAvatar(e){

    this.setState({
      ...this.state,
      selectedFile: e.target.files[0]
    })

    console.log(this.state);
    

    const data = new FormData() 
    data.append('file', this.state.selectedFile)

    axios.post("http://localhost:3001/createPost", data, 
      { 
        headers: { 
        'auth-token': localStorage.getItem('auth-token')} 
       } )
      .then(res => { // then print response status
        console.log(res)
      })

    // var formData = new FormData();
    // var imagefile = document.querySelector('#postAvatar');
    // formData.append("image", imagefile.files[0]);

    // this.setState({
    //   ...this.state,
    //   postAvatarPath: "is"

    // })

    // axios.post('http://localhost:3001/createPost', formData,

    // {  
    //   headers: { 
    //   'auth-token': localStorage.getItem('auth-token')} 
    // } 
    
    // )
    // .then(response => console.log(response))
  }

  onSubmit(e){
    e.preventDefault()

    

    axios.post('http://localhost:3001/createPost', {
      title: this.state.title,
      description: this.state.description,
    }, {  
      headers: { 
      'auth-token': localStorage.getItem('auth-token'),
      'Content-Type': 'multipart/form-data'} 
    } )
    .then(response => {
      console.log(response);
      
    })

  }




  render(){
    console.log(this.state);
    return(
      <div className="container">
        <div className="createPost-inner">
        <div className="createPost-title">
          <h1>CreatePost</h1>
        </div>
        <div className="createPost-form">
          <form onSubmit={(e) => this.onSubmit(e)}>
            <input onChange={(e) => this.onChangeTitle(e)} type="text" placeholder="Title"/>
            <textarea onChange={(e) => this.onChangeDescription(e)} placeholder="Your post..." name="" id="" cols="30" rows="10"></textarea>
            <input onChange={(e) => this.onChangeAvatar(e)} type="file" id="postAvatar" name="avatar"></input>
            <input type="submit"/>

          </form>
        </div>



        </div>
      </div>
    )
  }
}
