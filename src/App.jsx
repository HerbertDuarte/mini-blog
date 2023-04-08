import { AuthContextProvider, authContext, authValue } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'

// Hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

// components
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingCircle from './components/LoadingCircle'


function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=>{

    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })

  },[auth])

  return (loadingUser? (
    <LoadingCircle/>
  ) : (
    <AuthContextProvider value={user}> 
      <Navbar/>
      <Outlet/>
      <Footer/>
    </AuthContextProvider>   
  ))


}

export default App
