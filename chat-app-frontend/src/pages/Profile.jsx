import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../custom-hooks/useAxios";
import UserCard from "../components/UserCard";
import avatar from "../assets/avatar.png";
import useUsers from "../custom-hooks/useUsers";

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
      <article className="flex-1">
        {/* <UserCard /> */}
        {userDetail[0]?.receivedRequests?.map((detail) => (
          <figure key={detail?._id} className="flex flex-col justify-center p-3">
            <div>
              <img src={detail?.image} alt="profile image" className="object-cover w-20 h-20 rounded-full" />
            </div>
            <span className="mx-8 my-2">{detail?.username}</span>
          </figure>
        ))}
      </article>
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
    </section>
  );
};

export default Profile;
