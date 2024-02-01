import React from 'react'
import { LogOut } from 'react-feather'
import { useAuth } from '../utils/AuthContext'
import { account } from '../appwriteConfig'

function Header() {

    const {user ,handleUserLogout} = useAuth()
    
  return (
    <div id="header--wrapper">
        {user ? (<>
                  Welcome {user.name}
                  <LogOut 
                  onClick={handleUserLogout}
                  className='header--link' 
                  />
        </>): (
            <button>Login</button>
        ) }
    </div>
  )
}

export default Header