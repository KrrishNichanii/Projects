import React, { useEffect ,useState } from 'react'
import { Query } from 'appwrite'
import Input from '../components/Input/Input'
import Select from '../components/Select/Select'
import {useForm} from 'react-hook-form'
import PostForm from '../components/PostForm/PostForm';
import Container from '../components/Container/Container'
import { useSelector } from 'react-redux';
import database from '../appwrite/Database';
import PostCard from '../components/PostCard/PostCard';

function AllPosts() {

  const {register ,handleSubmit} = useForm() ;
  const status = useSelector(state => state.auth.status) ; 
  const userData = useSelector(state => state.auth.userData) ; 
  const [posts, setPosts] = useState([])

    useEffect(() => {
        database.getPosts([Query.equal("status", ["active" ,"inactive"])]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
           
   
    
      if(posts.length === 0){
        console.log("In len 0");
        return (
          <div className="w-full py-8 mt-4 text-center">
              <Container>
                  <div className="flex flex-wrap">
                      <div className="p-2 w-full">
                          <h1 className="text-2xl font-bold hover:text-gray-500 h-[21rem]">
                             {status ? "No Posts" :"Login to read posts" } 
                          </h1>
                      </div>
                  </div>
              </Container>
          </div>
      )
      }
      return (
        <div className='w-full py-8'>
            
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                            {console.log(post)}
                        </div>
                    ))}
                </div>
            
        </div>
    )
    
   
    
   
  
}

export default AllPosts