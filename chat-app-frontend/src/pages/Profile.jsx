import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
   (!user?.username) && navigate("/")
  }, [user?.username])
  
  return (
    <div className='text-tertiary flex justify-center'>Profile</div>
  )
}

export default Profile