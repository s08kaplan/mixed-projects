import React, { useEffect, useState } from 'react'
import useAxios from '../custom-hooks/useAxios';


const MessageHistory = () => {
    const { axiosWithToken } = useAxios();
  

  const [roomsByUser, setRoomsByUser] = useState([]);

  const getRoomsCreatedByUser = async () => {
    try {
      const { data } = await axiosWithToken(
        `rooms?filter[createdBy]=${user?.id}`
      );
      console.log(data);
      setRoomsByUser(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    getRoomsCreatedByUser();
  }, []);
  return (
    <article className="">
        {roomsByUser?.map((rooms) => (
          <div
            key={rooms._id}
            onClick={() => navigate(`/rooms/${rooms._id}`)}
            className="hover:cursor-pointer"
          >
            <div></div>
            {rooms.name != "DM" && <span>{rooms.name}</span>}
          </div>
        ))}
      </article>
  )
}

export default MessageHistory