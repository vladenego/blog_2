import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import './SinglePost.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


 
export default function SinglePost(){
  
  const [postId, setPostId] = useState("");
  const [postText, setPostText] = useState([]);
  let {id} = useParams()


   useEffect(() => { 
      async function fetchData(){
      setPostId(id)
      const fetchedSinglePost = await axios.get('http://localhost:3001/' + id)
      console.log(fetchedSinglePost.data);
      setPostText([fetchedSinglePost.data])
    }

    fetchData() 
    console.log(postText);
    
   }, [setPostText])
    return(
      <div className="singlePost-wrap">
      <div className="container">
      <div className="singlePost-inner">

      
      {postText !== [] ? postText.map(element => {
        return(
          
          <div className="singlePost" key={element._id} >
            <h1>{element.title}</h1>
            <p>{element.description}</p>
          </div>
        
        )
      })  : "loading..."}
      {postText !== [] ?
      <Link className="singlePost-btn" to="/">Go back</Link>  : "loadin"}
      </div>
       </div>
      </div>
     
    )
  
}
