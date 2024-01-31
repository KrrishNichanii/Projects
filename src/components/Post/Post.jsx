import React, { useState , useEffect } from 'react'
import { useNavigate, useParams ,Link } from 'react-router-dom'
import storage from '../../appwrite/Storage';
import database from '../../appwrite/Database';
import { useSelector } from 'react-redux';
import Container from '../Container/Container';
import parse  from 'html-react-parser'
import Button from '../Button/Button';

function Page() {
    const {slug} = useParams() ;
    const [post,setPost] = useState(null) ;
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false ;
    console.log('This is userData at Page ',userData);
    const [Id , setId] = useState(null) ; 
    

    useEffect(() => {
       
     // user.getUser(userData.userData.$id).then((id) => setId(id)) ;
      if (slug) {
        database.getPost(slug).then((post) => {
            if (post){
              setPost(post);
            } 
            else navigate("/");
        });
    } else navigate("/");
    console.log('Post before edit',post);
    },[])
     
    const deletePost = () => {
        database.deletePost(post.$id).then((status) => {
          if(status){
            storage.deleteFile(post.featuredImage);
            navigate('/');
          }
        });
    }
    
   
  return post ? (
    <div className="py-8">
            <Container className='border-[3px] border-white rounded-lg'>
                <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2   border">
                    <img
                        src={storage.getFilePreview(post.featuredImage)}
                        alt={post.Title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.Title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.Content)}
                    </div>
            </Container>
        
    </div>
  ) :  (<div className="py-auto h-[22rem] flex justify-center items-center">
    <h1 className='font-semibold text-2xl '>Loading...</h1>
  </div>)

}

export default Page