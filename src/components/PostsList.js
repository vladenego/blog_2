import React from 'react';
import './PostsList.css';
import axios from 'axios'
import Post from './Post.js'

export default class PostsList extends React.Component{
  constructor(){
    super();

    this.state = {
      posts: []
    }
  }

  async componentDidMount(){
    const fetchedPosts = await axios.get('http://localhost:3001/')
    console.log(fetchedPosts.data);

    this.setState({
      ...this.state,
      posts: fetchedPosts.data
    })
    
  }
  
  render(){
    console.log(this.state.posts);
    
    return (
      <div className="postList">

      {this.state.posts.map(el => {
        return <Post key ={el._id}  data={el} />
      })}




        
      </div>
    )
  }
}
