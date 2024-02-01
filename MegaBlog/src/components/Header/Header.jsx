import React from 'react'
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LogoutBtn from './LogoutBtn';
import authSlice from '../../store/authSlice';

function Header() {
    
    const authStatus = useSelector(state => state.auth.status) ; 
  
    const navItems = [
        {
            name: 'Home' ,
            slug: '/' ,
            status: true
        }
        ,
        {
            name: 'Login' ,
            slug: '/login' ,
            status: !authStatus
        }
        ,
        {
            name: 'Signup' ,
            slug: '/signup' ,
            status: !authStatus
        }
        ,
        {
            name: 'All Posts' ,
            slug: '/all-posts' ,
            status: authStatus
        }
        ,
        {
            name: 'Add Post' ,
            slug: '/add-post' ,
            status: authStatus
        }
        ,
        
    ]

     const navigate = useNavigate() ;
    return (
        <div className="p-4 flex justify-between bg-sky-400">
            <Logo className={`ml-3`}/>
            <div className="">
                <ul className='flex gap-3'>
              {
                navItems?.map((item) => {
                    if(item.status){
             
                     return <li  key={item.name}>
                     <button  className='py-4 rounded-full hover:bg-red-300 px-5' onClick={() => navigate(item.slug)}>
                       {item.name}
                     </button>
                     
                     </ li>
                        
                    }
                })
              }

              {authStatus && 
                  ( <li>
                  <LogoutBtn/>
                  </li>
                  )
              }
              
              </ul>
            </div>
        </div>
    )
}

export default Header ;