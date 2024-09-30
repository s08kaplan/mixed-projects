import React, { useEffect } from 'react'
import useRooms from '../custom-hooks/useRooms'

const Rooms = () => {

  const { getRoomsInfo } = useRooms()

  useEffect(() => {
    getRoomsInfo()
  }, [])
  

  return (
    <div>Rooms</div>
  )
}

export default Rooms