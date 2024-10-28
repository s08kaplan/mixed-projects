import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../custom-hooks/useAxios";
import UserCard from "../components/UserCard";
import avatar from "../assets/avatar.png";
import useUsers from "../custom-hooks/useUsers";
import ListFriends from "../components/ListFriends";
import FriendStatus from "../components/FriendStatus";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { userDetail } = useSelector((state) => state.users);
  const { axiosWithToken } = useAxios();
  const { getUsers } = useUsers();

  const [roomsByUser, setRoomsByUser] = useState([]);
  const navigate = useNavigate();
  console.log(user);
  console.log(userDetail);
  console.log(userDetail[0]?.receivedRequests);

  // const getRequest = async () => {
  //   try {
  //     const { data } = await axiosWithToken(`users/${user?.id}`)
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);

  //   }
  // }

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
    if (!user?.id) navigate("/");
    getUsers(user?.id, "userDetail");
    // getRequest()
    getRoomsCreatedByUser();
  }, [user?.id, navigate]);


  return (
    <section className="flex justify-center text-primary">
      {/* left friends list to chat*/}
      <FriendStatus/>
      {/* main messaging */}
      <article className="flex-2">
        <section className="flex flex-col items-center justify-end">
          user info
          <img
            src={user?.image || avatar}
            alt="profile image"
            className="w-16"
          />{" "}
          <span>{user?.username}</span>
        </section>
      </article>
      {/* right  groups */}
      <article className="">
        {roomsByUser?.map((rooms) => (
          <div
            key={rooms._id}
            onClick={() => navigate(`/rooms/${rooms._id}`)}
            className="hover:cursor-pointer"
          >
            <div></div>
            <span>{rooms.name}</span>
          </div>
        ))}
      </article>
     <ListFriends/>
    </section>
  );
};

export default Profile;
