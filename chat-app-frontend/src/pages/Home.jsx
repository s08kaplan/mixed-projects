import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
      const timer = setTimeout(() => {
        
      }, 5000);
    
      return () => {
        
      }
    }, [])
    
  return (
    <section className='flex justify-center h-dvh p-3 bg-[url("https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU0fHxjaGF0JTIwYXBwJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")] bg-cover bg-no-repeat xs:bg-center sm:bg-center md:bg-center' >
        <div>
            <h1 className=''>Welcome to the friendly world</h1>
        </div>
    </section>
  )
}

export default Home