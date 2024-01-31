import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login ,logout } from './store/authSlice'
import conf from './conf'

function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ; 

 
  useEffect(() => {
    console.log(conf.appwriteURL);
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? 
    
    (  <div className='min-h-screen flex flex-wrap content-between bg-sky-200'>
          <div className='w-full block'>
                <Header />
                 <main>
                  <Outlet />
                 </main>
                <Footer />
          </div>
       </div>
    ) : null ;
  
}


export default App
