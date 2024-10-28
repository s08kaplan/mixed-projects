import React from 'react'
import { useSelector } from 'react-redux';
import useAxios from '../custom-hooks/useAxios';

const FriendStatus = () => {
    const { userDetail } = useSelector((state) => state.users);
    const { axiosWithToken } = useAxios();

    const handleFriendStatus = async (e,id) => {
        // console.log(e.target.textContent);
        console.log(id);
        const { textContent } = e.target
        // if( textContent == "Accept" ){
        //   const { data } = await axiosWithToken.post("users/accept-friend-request",{senderId:id})
        // console.log(data);
        // }else {
        //   const { data } = await axiosWithToken.post("users/decline-friend-request",{senderId:id})
        //   console.log(data);
        // }
        textContent == "Accept"  ? await axiosWithToken.post("users/accept-friend-request",{senderId:id}) : await axiosWithToken.post("users/decline-friend-request",{senderId:id})
        
      }
  return (
    <article className="flex-1">
        {userDetail[0]?.receivedRequests?.map((detail) => (
          <figure key={detail?._id} className="flex flex-col justify-center p-3">
            <div>
              <img src={detail?.image} alt="profile image" className="object-cover w-20 h-20 rounded-full" />
            </div>
            <span className="mx-8 my-2">{detail?.username}</span>
            <button onClick={(e)=>handleFriendStatus(e,detail?._id)} className="flex items-center justify-center w-20 h-8 text-white transition-colors duration-200 bg-green-600 border rounded-lg border-white-800 hover:bg-white hover:border-lime-500 hover:text-green-600">Accept</button>
            <button onClick={(e)=>handleFriendStatus(e,detail?._id)} className="flex items-center justify-center w-20 h-8 text-white transition-colors duration-200 bg-red-600 border rounded-lg border-white-800 hover:bg-white hover:text-red-600 hover:border-lime-500">Decline</button>
          </figure>
        ))}
      </article>
  )
}

export default FriendStatus