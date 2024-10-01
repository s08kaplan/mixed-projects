import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserCard from '../components/UserCard'
import useAuthCalls from '../custom-hooks/useAuthCalls'

const Home = () => {
  const { getUserInfo } = useAuthCalls()
    const navigate = useNavigate()
    useEffect(() => {
      
    }, [])
    
  return (
    <section className='flex justify-center h-dvh p-3 bg-[url("https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU0fHxjaGF0JTIwYXBwJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")] bg-cover bg-no-repeat xs:bg-center sm:bg-center md:bg-center' >
        <div>
            <h1 className=''>Welcome to the friendly world</h1>
            <UserCard/>
        </div>
    </section>
  )
}

export default Home