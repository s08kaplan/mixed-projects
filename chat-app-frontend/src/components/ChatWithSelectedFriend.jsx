import React, { useEffect, useState } from 'react'
import useAxios from '../custom-hooks/useAxios'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { VscSend } from "react-icons/vsc";


const ChatWithSelectedFriend = () => {
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const { axiosWithToken } = useAxios()
  const { friendId } = useParams();
  // const { state:{username, image, id} } = useLocation()
  const location = useLocation()
 const username = location?.state?.username
 const image = location?.state?.image
 const id = location?.state?.id

  console.log(username);
  console.log(image);
  console.log(id);
  console.log(user);
  
  const getMessages = async () => {
    try {
      const { data } = await axiosWithToken("messages")
      console.log(data);
      setChatHistory(data?.data[0]?.messages)
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(() => {
  getMessages()
  }, [friendId])
  

  const handleChange = (e) => {
    console.log(e.target.value);
    setContent(e.target.value)
  }
  
  const sendMessage = async () => {
    if(content.trim() == "") return
    const postData = {
      content,
      sender: user.id,
      receiver: friendId
    }
    try {
      const { data } = await axiosWithToken.post("messages",postData)
      console.log(data);
      getMessages()
      setContent("")
    } catch (error) {
      console.error(error);
      
    }
  }
  console.log(chatHistory);
  return (
    <section>
      <figure>
        {
          chatHistory?.map(chat => (
            <div key={chat._id} className='flex justify-between sm:w-[340px] md:[600px] lg:w-[900px] bg:[rgba(255,255,255,0.8)]'>
              {<div>
                {/* receiver: {chat.receiver} */}
                <img src={image} alt="profile-photo" className='w-16 h-16 rounded-full' />
                <div>
                  {chat.sender == friendId && chat.content }
                </div>
              </div>}
           {  <div>
                {/* sender:{chat.sender} */}
                <img src={user?.image} alt="profile-photo" className='w-16 h-16 rounded-full' />
                <div>
                  {chat.sender == user?.id && chat.content }
                </div>
              </div>}
            </div>
          ))
        }
      </figure>
      <div className="flex items-center gap-2 mt-2 ">
            <button onClick={sendMessage}  className="flex items-center justify-center w-12 h-8 transition-colors duration-200 border border-white-800 hover:bg-indigo-800 hover:border-lime-500">
              <VscSend className="text-2xl transition-colors duration-200 hover:text-sky-500" />
            </button>
            <input
              id="message"
              name="message"
              value={content || ""}
              type="text"
              required
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
    </section>
  )
}

export default ChatWithSelectedFriend