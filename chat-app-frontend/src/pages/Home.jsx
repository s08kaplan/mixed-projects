import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserCard from '../components/UserCard'
import useAuthCalls from '../custom-hooks/useAuthCalls'
// import flowers from "../../src/assets/flowers.jpg"

const Home = () => {
  const { getUserInfo } = useAuthCalls()
 
    const navigate = useNavigate()
    useEffect(() => {
      
    }, [])
    
  return (
    <section className='flex justify-center p-3 bg-no-repeat bg-cover h-dvh xs:bg-center sm:bg-center md:bg-center' >
        <div>
            <h1 className=''>Welcome to the friendly world</h1>
            <UserCard/>
        </div>
    </section>
  )
}

export default Home