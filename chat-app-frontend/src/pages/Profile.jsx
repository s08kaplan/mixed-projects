import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../custom-hooks/useAxios";
import UserCard from "../components/UserCard";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();

  const [roomsByUser, setRoomsByUser] = useState([])
  const navigate = useNavigate();
  console.log(user);

  const getRoomsCreatedByUser = async () => {
    try {
      const { data } = await axiosWithToken(`rooms?filter[createdBy]=${user?.id}`)
      console.log(data);
      setRoomsByUser(data?.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!user?.id) navigate("/");

    getRoomsCreatedByUser();
  }, [user?.id, navigate]);

  return (
    <section className="text-tertiary flex justify-center">
      {/* left friends list to chat*/}
      <article className="flex-1">
         <UserCard/>
      </article>
      {/* main messaging */}
      <article className="flex-2"></article>
      {/* right  groups */}
      <article className="">
       { roomsByUser?.map(rooms => (
          <div key={rooms._id} onClick={() => navigate(`/rooms/${rooms._id}`)} className="hover:cursor-pointer">
            <div><img src="" alt="" /> </div>
            <span>{rooms.name}</span>
          </div>
         ))}
      </article>
    </section>
  );
};

export default Profile;
