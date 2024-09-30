import React, { useEffect, useState } from 'react'
import useRooms from '../custom-hooks/useRooms'
import NewRoom from '../components/NewRoom'

const Rooms = () => {

  const { getRoomsInfo } = useRooms()

  

  useEffect(() => {
    getRoomsInfo()
  }, [])
  

  return (
    <section>
      <NewRoom/>
    </section>
  )
}

export default Rooms