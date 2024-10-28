import React, { useEffect, useState } from "react";
import useAuthCalls from "../custom-hooks/useAuthCalls";
import { useParams } from "react-router-dom";
import useUsers from "../custom-hooks/useUsers";
import { useSelector } from "react-redux";
import { VscSend } from "react-icons/vsc";

const FriendProfile = () => {
  const { userDetail } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const { friendId } = useParams();
  const { getUsers, sendFriendRequest } = useUsers();
  const [userInfo, setUserInfo] = useState({});

  console.log("user: ",user);
  const userIds = userDetail[0]?.friends.map(usr => usr._id)
  console.log(userIds);
  const isFriend = user?.friends.find((person) =>person.includes(userIds));
  
  console.log(isFriend);
  console.log(userDetail);
  // console.log("friend id: ", friendId);
  
  useEffect(() => {
    getUsers(friendId, "userDetail");
  }, [friendId]);

  const friendRequest = async () => {
    try {
    await sendFriendRequest("userDetail",{"recipientId":friendId})
    } catch (error) {
      console.error("friend request fail: ", error);
      
    }
  }

  return (
    <section>
      <article className="flex flex-col items-center justify-center gap-2 p-2">
        <img
          src={
           userDetail[0]?.image ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
          }
          alt="user image"
          width={250}
          className="rounded-full"
        />
        <span>{userDetail[0]?.username}</span>
      </article>
      <article className="flex justify-center">
        {isFriend ? (
          <div className="flex items-center gap-2 mt-2 ">
            <button className="flex items-center justify-center w-12 h-8 transition-colors duration-200 border border-white-800 hover:bg-indigo-800 hover:border-lime-500">
              <VscSend className="text-2xl transition-colors duration-200 hover:text-sky-500" />
            </button>
            <input
              id="message"
              name="message"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        ) : (
          <button onClick={friendRequest}  className="flex w-[60%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Send friend request
          </button>
        )}
      </article>
    </section>
  );
};

export default FriendProfile;
