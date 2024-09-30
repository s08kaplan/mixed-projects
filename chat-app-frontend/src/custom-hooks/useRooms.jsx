import React from 'react'
import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getRooms } from '../Slices/roomSlice'

const useRooms = () => {
    const { axiosWithToken } = useAxios()
    const dispatch = useDispatch()

    const getRoomsInfo = async () => {
        dispatch(fetchStart())
        try {
          const {data} = await axiosWithToken("rooms")  
          console.log(data);
          dispatch(getRooms(data))
        } catch (error) {
            console.log(error);
            dispatch(fetchFail(error))
        }
        
    }

    const newRoom = async (info) => {
      dispatch(fetchStart())
      try {
        const { data } = await axiosWithToken.post("rooms",info)
        console.log(data);
        dispatch(getRooms(data))
      } catch (error) {
        console.log(error);
        dispatch(fetchFail(error))
      }
    }
  return { getRoomsInfo }
}

export default useRooms