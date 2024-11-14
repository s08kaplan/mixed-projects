import React, { useEffect, useState } from "react";
import useAuthCalls from "../custom-hooks/useAuthCalls";
import { useNavigate, useParams } from "react-router-dom";
import useUsers from "../custom-hooks/useUsers";
import { useSelector } from "react-redux";
import { VscSend } from "react-icons/vsc";
import useAxios from "../custom-hooks/useAxios";
import ChatWithSelectedFriend from "../components/ChatWithSelectedFriend";

const FriendProfile = () => {
  const { userDetail } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const { friendId } = useParams();
  const { getUsers, sendFriendRequest } = useUsers();
  const { axiosWithToken } = useAxios()
 const [friendRequestStatus, setFriendRequestStatus] = useState({
  isPending:false,
  isSuccess:false,
  isError:false,
  message:""
 })
  
 const navigate = useNavigate()

  console.log("user: ",user);
 
  const isFriend = user?.friends.find((person) =>person.includes(friendId)) || userDetail[0]?.friends.find((person) => person._id == user?.id);
  
  console.log(isFriend);
  console.log(userDetail);
  // console.log("friend id: ", friendId);
  
  useEffect(() => {
    getUsers(friendId, "userDetail");
    getMessages()
  }, [friendId]);

  const getMessages = async () => {
    try {
      const { data } = await axiosWithToken("messages?filter[messages.sender]=${user?.id}&filter[messages.receiver]=${friendId}")
      console.log(data);
    } catch (error) {
      console.error(error);
      
    }
  }
  
  const friendRequest = async () => {
    setFriendRequestStatus(()=>({isPending:true,isSuccess:false,isError:false}))
    try {
    await sendFriendRequest("userDetail",{"recipientId":friendId})
    setFriendRequestStatus(()=>({isPending:false,isSuccess:true}))
    } catch (error) {
      console.error("friend request fail: ", error);
      setFriendRequestStatus(()=>({isPending:false,isSuccess:false,isError:true}))
    }
    friendRequestStatus.isError == false ? setFriendRequestStatus(()=> ({message:"friend request sent successfully"})) : setFriendRequestStatus(()=> ({message:"Something went wrong try sending friend request again"})) 
  }
  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setContent(e.target.value)
  // }

  // const sendMessage = async () => {
  //   if(content.trim() == "") return
  //   const postData = {
  //     content,
  //     sender: user.id,
  //     receiver: friendId
  //   }
  //   try {
  //     const { data } = await axiosWithToken.post("messages",postData)
  //     console.log(data);
  //     getMessages()
  //     setContent("")
  //   } catch (error) {
  //     console.error(error);
      
  //   }
  // }

  return (
    <section className="py-8">
      <article className="flex flex-col items-center justify-center gap-2 p-2">
        <img
          src={
           userDetail[0]?.image ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
          }
          alt="user image"
          className="object-cover w-20 h-20 rounded-full"
        />
        <span>{userDetail[0]?.username}</span>
      </article>
      {/* <article>
        <ChatWithSelectedFriend/>
      </article> */}
      <article className="flex justify-center">
        {isFriend ? (
          <ChatWithSelectedFriend/>
        ) : (
          <button onClick={friendRequest} disabled={friendRequestStatus.isPending}  className="flex w-[60%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {friendRequestStatus.isPending ? "Sending..." : "Send friend request"}
          </button>
        )}
      </article>
    </section>
  );
};

export default FriendProfile;
