import React from 'react'
import Hero from './Components/Hero.jsx'
import ReactDOM from 'react-dom/client'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Write from './Components/Write.jsx'
import BlogGet from './Components/BlogsGet.jsx'
import Blogs from './Components/Blogs.jsx'
import Whoami from './Components/Whoami.jsx'

  const router = createBrowserRouter([
    {
      path:'/',
      element: <App/>,  
      errorElement: <h1>Error</h1>,
      children: [
        {index:true, element: <Hero/>},
        {path:"blogs", element: <BlogGet/>},
        {path:"whoami" , element: <Whoami/>},
        {path: "write", element: <Write/>,errorElement: <h1>Error</h1>},
        {path:"blog/:id" , element: <Blogs/>, errorElement: <h1>Error</h1>}
        
      ]
    },
    {
      path:'/login',
      element: <Login/>,
      errorElement: <h1>Error</h1>
    },
    {
      path:'/signup',
      element: <Signup/>,
      errorElement: <h1>Error</h1>
    },
    
  ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
