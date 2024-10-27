import React from 'react'
import { useSelector } from 'react-redux';

const ListFriends = () => {
    const { userDetail } = useSelector((state) => state.users);
    console.log(userDetail);
  return (
    <article>
    {
      userDetail && userDetail[0]?.friends?.map(friend => (
        <section key={friend._id}>
          <div className="overflow-hidden rounded-full">
            <img src={friend.image} alt="profile photo" className="object-cover w-10 rounded-full hover:scale-150" />
          </div>
         <div>{friend.username}</div>  
        </section>
       
      ))
    }
  </article>
  )
}

export default ListFriends