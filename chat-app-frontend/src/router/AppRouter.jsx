import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Rooms from '../pages/Rooms'
import NewRoom from '../pages/NewRoom'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>} />
      <Route path='rooms' element={<Rooms/>} />
      <Route path='new-room' element={<NewRoom/>} />
    </Routes>
  )
}

export default AppRouter