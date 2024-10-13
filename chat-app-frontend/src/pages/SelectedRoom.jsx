import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../custom-hooks/useAxios'

const SelectedRoom = () => {
    const { roomId } = useParams()
    const { axiosWithToken } = useAxios()
    console.log(roomId);

    const getRoomById = async () => {
      try {
        const { data } = await axiosWithToken(`rooms/${roomId}`)
        console.log(data);
      } catch (error) {
        console.error(error);
        
      }  
    }

    useEffect(() => {
    getRoomById()
    }, [])
    
  return (
    <div>SelectedRoom</div>
  )
}

export default SelectedRoom