import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../custom-hooks/useAxios";
import UserCard from "../components/UserCard";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const navigate = useNavigate();
  console.log(user);

  const getUserRooms = async () => {
    try {
      const { data } = await axiosWithToken(
        `rooms?filter[createdBy]=${user?.id}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user?.id) navigate("/");

    getUserRooms();
  }, [user?.id, navigate]);

  return (
    <section className="text-tertiary flex justify-center">
      {/* left friends list to chat*/}
      <article>
         <UserCard/>
      </article>
      {/* main messaging */}
      <article></article>
      {/* right  groups */}
      <article></article>
    </section>
  );
};

export default Profile;
