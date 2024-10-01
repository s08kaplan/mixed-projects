import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAxios from '../custom-hooks/useAxios'

const Profile = () => {
  const { user } = useSelector(state => state.auth)
  const { axiosWithToken } = useAxios()
  const navigate = useNavigate()
  console.log(user?.id);

  const getUserRooms = async () => {
    try {
      const { data } = await axiosWithToken(`rooms?filter[createdBy]=${user?.id}`)
     console.log(data);
    } catch (error) {
      console.log(error);
    }  
  }
  useEffect(() => {
    if(!user?.id)navigate("/")

    getUserRooms()
   
  }, [user?.id,navigate])
  
  return (
    <div className='text-tertiary flex justify-center'>

      
    </div>
  )
}

export default Profile