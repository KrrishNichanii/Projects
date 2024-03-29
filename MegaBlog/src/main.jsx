import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AuthLayout from './components/AuthLayout/AuthLayout.jsx'
import PostCard from './components/PostCard/PostCard.jsx'
import Post from './components/Post/Post.jsx'
import EditPost from './pages/EditPost.jsx'


const router = createBrowserRouter([
   {         
     path: '/',
     element: <App/> ,
     children:[ 
        {
            path:'' ,
            element: <Home/>
        } ,

        {
          path: '/login',
          element: <AuthLayout authentication = {false}> <Login/> </AuthLayout>          
        } ,

        {
            path: '/signup' ,
            element: <AuthLayout authentication = {false}>  <Signup /> </AuthLayout> 
        } ,
        {
            path: '/all-posts' ,
            element:<AuthLayout authentication>  <AllPosts/> </AuthLayout>  
        } ,
        {
            path: '/add-post' ,
            element:<AuthLayout authentication><AddPost/></AuthLayout>  
        },
        {
            path: '/post/:slug' , 
            element: <AuthLayout authentication> <Post/> </AuthLayout> 
        } , 
        {
            path:'/edit-post/:slug' ,
            element: <AuthLayout authentication> <EditPost/> </AuthLayout>
        }

    ]
    
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}>
        <App/>
    </RouterProvider>
    </Provider>
)
