import React, { useEffect, useState } from 'react'
import useAuthCalls from '../custom-hooks/useAuthCalls'
import { useParams } from 'react-router-dom'
import useUsers from '../custom-hooks/useUsers'
import { useSelector } from 'react-redux'

const FriendProfile = () => {
    const { friendId } = useParams()
    const { getUsers } = useUsers()
    const { userDetail } = useSelector(state => state.users)
    const [userInfo, setUserInfo] = useState({})

    console.log(userDetail);
console.log("friend id: ", friendId);
    useEffect(() => {
        getUsers(friendId,"userDetail")
    }, [])
    
  return (
    <section>
        <article>
            <img src={userDetail?.image} alt="" />
        </article>
    </section>
  )
}

export default FriendProfile