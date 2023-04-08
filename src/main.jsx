import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages

import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewPost from './pages/NewPost'
import FormSignUp from './pages/FormSignUp'
import FormLogin from './pages/FormLogin'


const routes = createBrowserRouter([
  {
    path: '/',
    element : <App/>,
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/login",
        element: <Login/>,
        children: [
          {
            path: "/login",
            element: <FormLogin/>,
          },
          {
            path: "/login/sign",
            element: <FormSignUp/>,
          },
          {
            path: "/login/enter",
            element: <FormLogin/>
          }
        ]
      },
      {
        path:"/dashboard",
        element: <Dashboard/> 
      },
      {
        path:"/newpost",
        element: <NewPost/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
     
    <React.StrictMode>
      <RouterProvider router={routes}/>
    </React.StrictMode>

)