import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useUsers from '../custom-hooks/useUsers';
import { useNavigate } from 'react-router-dom';

const ListFriends = () => {
    const { userDetail } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);
    const { getUsers } = useUsers();
    console.log(userDetail);

    const navigate = useNavigate();
    
    useEffect(() => {
      if (!user?.id) navigate("/");
      getUsers(user?.id, "userDetail");
    }, [user?.id, navigate]);
  return (
    <article>
    {
      userDetail && userDetail[0]?.friends?.map(friend => (
        <section key={friend._id}>
          <div onClick={()=>navigate(`/friend-profile/${friend._id}`,{state:{username:friend.username,image:friend.image,id:friend._id}})}  className="overflow-hidden rounded-full hover:cursor-pointer">
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