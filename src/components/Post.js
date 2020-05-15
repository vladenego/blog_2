import React from 'react';
import './Post.css';

export default function Post(props){
  return(
    <div className="container">
      <div className="post">
      <a href={'http://localhost:3000/' + props.data._id}><h3>{props.data.title}</h3></a>
      <p>{props.data.description}</p>
      <a className="post-btn" href={'http://localhost:3000/' + props.data._id}>Read story</a>
    </div>
    </div>
  )
}
