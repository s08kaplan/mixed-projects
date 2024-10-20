import React from 'react'
import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getAllUsers } from '../Slices/usersSlice'

const useUsers = () => {
    const { axiosWithToken } = useAxios()
    const dispatch = useDispatch()

    const getUsers = async (id="",url) => { 
        console.log("id in users slice:", id); 
        console.log("url in users slice:", url); 
        dispatch(fetchStart())
        try {
          const {data} = await axiosWithToken(`users/${id}`)  
          console.log(data);
          dispatch(getAllUsers({data,url}))
        } catch (error) {
            console.log(error);
            dispatch(fetchFail(error))
        }
        
    }

    const sendFriendRequest = async (url,postData) => { 
        console.log("id in sendFriendRequest:", postData); 
        console.log("url sendFriendRequest:", url); 
        dispatch(fetchStart())
        try {
          const {data} = await axiosWithToken.post(`users/friend-request`,postData)  
          console.log(data);
          dispatch(getAllUsers({data,url}))
        } catch (error) {
            console.log(error);
            dispatch(fetchFail(error))
        }
        
    }

    // const getFriendRequest = async (url) => { 
    //     dispatch(fetchStart())
    //     try {
    //       const {data} = await axiosWithToken(`users/friend-request`)  
    //       console.log(data);
    //       dispatch(getAllUsers({data,url}))
    //     } catch (error) {
    //         console.log(error);
    //         dispatch(fetchFail(error))
    //     }
        
    // }

   
  return { getUsers, sendFriendRequest }
}

export default useUsers