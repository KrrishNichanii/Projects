import React, { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import database from '../appwrite/Database';
import PostForm from '../components/PostForm/PostForm';

function EditPost() {
    const {slug} = useParams();
    const [post , setPost] = useState(null);
    const [loader , setLoader] = useState(true); 

    useEffect(() => {
         database.getPost(slug).then((post) => setPost(post)) ; 
        
    },[]);

   if(loader){
    return    <PostForm post={post} />
   }
   else {
    <h1>Loading...</h1>
   }
      
    
}

export default EditPost