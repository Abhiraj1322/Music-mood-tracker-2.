import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Homepage from '../Components/Home'
import LogMusic from '../Components/LogMusic'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from '../Components/Login'
import Register from '../Components/Register'
import Dashboard from '../Components/Dashboard'
import ProtectedRoute from '../Components/ProtectedRoute'

function App() {


  return (
    <Router>
      <Routes>
   <Route path='/' element={<Login/>}/>
   <Route path='/home' element={<Homepage/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/register' element={<Register/>}/>
   <Route path='/Dashboard' element={
   <ProtectedRoute>
     <Dashboard/>
   </ProtectedRoute>
   
  }
    />
      </Routes>
    </Router>
  )
}

export default App
