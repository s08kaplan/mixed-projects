import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
     const handleNavigate = () => {
       navigate("/")
     }
  return (
    <section className='h-dvh bg-[url("https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_640.jpg")] bg-cover bg-no-repeat flex justify-center items-center'>
       <button className=' text-secondary border-2 border-violet-700 p-2 rounded-lg' onClick={handleNavigate}>Go Home</button>
    </section>
  )
}

export default NotFound