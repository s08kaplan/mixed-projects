import React, { useEffect, useState } from 'react'
import useAuthCalls from '../custom-hooks/useAuthCalls'
import { useParams } from 'react-router-dom'
import useUsers from '../custom-hooks/useUsers'
import { useSelector } from 'react-redux'
import { VscSend } from "react-icons/vsc";

const FriendProfile = () => {
    const { friendId } = useParams()
    const { getUsers } = useUsers()
    const { userDetail } = useSelector(state => state.users)
    const { user } = useSelector(state => state.auth)
    const [userInfo, setUserInfo] = useState({})
const isFriend = user?.friends.find(user =>  userDetail?.friends.includes(user))
console.log(isFriend);
    console.log(userDetail);
console.log("friend id: ", friendId);
    useEffect(() => {
        getUsers(friendId,"userDetail")
    }, [])
    
  return (
    <section>
        <article className='flex flex-col justify-center items-center gap-2 p-2'>
            <img src={userDetail?.image || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"} alt="user image" width={250} className='rounded-full'/>
            <span>{userDetail?.username}</span>
        </article>
        <article className='flex justify-center'>
            {isFriend ?  <div className="mt-2 flex items-center gap-2 ">
                <button className=' flex justify-center items-center border border-white-800 w-12 h-8 hover:bg-indigo-800 hover:border-lime-500 transition-colors duration-200'><VscSend className="text-2xl hover:text-sky-500 transition-colors duration-200" /></button>
                <input
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                
              </div> : <button className="flex w-[60%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send friend request</button>}
        </article>
    </section>
  )
}

export default FriendProfile