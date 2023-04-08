import { AuthContextProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'

// Hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingCircle from './components/LoadingCircle'

// pages

import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewPost from './pages/NewPost'
import FormSignUp from './pages/FormSignUp'
import FormLogin from './pages/FormLogin'
import About from './pages/About';

export const App = () => {
  
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()
 
  useEffect(()=>{
    
    onAuthStateChanged(auth, (element)=>{
      setUser(element)
    })
    
  },[auth])

  const loadingUser = user === undefined

  return (loadingUser? (
    <LoadingCircle/>
  ) : (
    <AuthContextProvider value={{user}}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}>
              <Route path="/login" element={!user ? <FormLogin /> : <Navigate to="/"/>} />
              <Route path="/login/sign" element={!user ? <FormSignUp /> : <Navigate to="/"/>} />
              <Route path="/login/enter" element={!user ? <FormLogin /> : <Navigate to="/"/>} />
            </Route>
            <Route path="/dashboard" element={!user ? <FormLogin /> : <Dashboard/>} />
            <Route path="/newpost" element={!user ? <FormLogin /> : <NewPost/>} />
            <Route path='/about' element={<About/>}/>
          </Routes>
        </BrowserRouter>
      <Footer/>
    </AuthContextProvider>
  ))
}