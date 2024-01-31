import React ,{ useEffect, useState} from 'react'
import storage from '../../appwrite/Storage'
import { Link } from 'react-router-dom';

function PostCard({$id, Title, featuredImage}) {
        const [loading , setLoading] = useState(true) ; 
        const [fileLink , setFileLink] = useState(null)
        
        useEffect(() => {
             setFileLink(storage.getFilePreview(featuredImage));
             console.log(loading);
             setLoading(false) ; 
        },[])


        if(!loading)
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={fileLink} alt={Title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{Title}</h2>
        </div>
    </Link>
  )
  else{
    return (
      <h1>Loading...</h1>
    )
  }
}

export default PostCard