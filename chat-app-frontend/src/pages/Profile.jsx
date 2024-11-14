import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../custom-hooks/useAxios";
import UserCard from "../components/UserCard";
import avatar from "../assets/avatar.png";
import useUsers from "../custom-hooks/useUsers";
import ListFriends from "../components/ListFriends";
import FriendStatus from "../components/FriendStatus";
import MessageHistory from "../components/MessageHistory";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { userDetail } = useSelector((state) => state.users);
  // const { axiosWithToken } = useAxios();
  // const { getUsers } = useUsers();

  // const [roomsByUser, setRoomsByUser] = useState([]);
  // const navigate = useNavigate();
  // console.log(user);
  // console.log(userDetail);
  // console.log(userDetail[0]?.receivedRequests);

  // const getRequest = async () => {
  //   try {
  //     const { data } = await axiosWithToken(`users/${user?.id}`)
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);

  //   }
  // }

  // const getRoomsCreatedByUser = async () => {
  //   try {
  //     const { data } = await axiosWithToken(
  //       `rooms?filter[createdBy]=${user?.id}`
  //     );
  //     console.log(data);
  //     setRoomsByUser(data?.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (!user?.id) navigate("/");
  //   getUsers(user?.id, "userDetail");
  //   // getRequest()
  //   // getRoomsCreatedByUser();
  // }, [user?.id, navigate]);

  return (
    <section className="flex items-center justify-between p-5 text-primary">
      {/* left friends list to chat*/}
      <div>
        <FriendStatus />
      </div>
      {/* main messaging */}
      <article className="flex-2">
        <section className="flex flex-col items-center justify-end">
          <img
            src={user?.image || avatar}
            alt="profile image"
            className="w-16 rounded-full"
          />{" "}
          <span>{user?.username}</span>
        </section>
      </article>
      {/* right  groups */}
      <div>
        <MessageHistory />
      </div>
      <div>
        <ListFriends />
      </div>
    </section>
  );
};

export default Profile;
