import React, { useEffect ,useState } from 'react'
import Input from '../components/Input/Input'
import Select from '../components/Select/Select'
import {useForm} from 'react-hook-form'
import PostForm from '../components/PostForm/PostForm';
import Container from '../components/Container/Container'
import { useSelector } from 'react-redux';
import database from '../appwrite/Database';
import PostCard from '../components/PostCard/PostCard';
import { Query } from 'appwrite'

function Home() {

  const {register ,handleSubmit} = useForm() ;
  const status = useSelector(state => state.auth.status) ; 
  const userData = useSelector(state => state.auth.userData) ; 
  const [posts, setPosts] = useState([])

    useEffect(() => {
        database.getPosts([Query.equal("status", "active")]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
           
   
    if(!status){
        return (
            <div className='h-[24rem] flex justify-center items-center'>
                    <h1 className='font-semibold text-3xl'>Login to see posts</h1>
            </div>
            
        )
    }
      if(posts.length === 0){
        console.log("In len 0");
        return (
          <div className="w-full py-8 mt-4 text-center">
              <Container>
                  <div className="flex flex-wrap">
                      <div className="p-2 w-full">
                          <h1 className="text-2xl font-bold hover:text-gray-500 h-[20rem]">
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
                        </div>
                    ))}
                </div>
            
        </div>
    )
    
   
    
   
  
}

export default Home