import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'

import authService from '../../appwrite/auth'

function LogoutBtn() {
      const dispatch = useDispatch() ; 
      
      const logouthandler = () => {
           if(authService.logout()) ;
           dispatch(logout()) ;
      }
  return (
    <div className='py-4 rounded-full hover:bg-red-300 px-5'>
        <button onClick={logouthandler}>
            Logout
        </button>
    </div>
  )
}

export default LogoutBtn