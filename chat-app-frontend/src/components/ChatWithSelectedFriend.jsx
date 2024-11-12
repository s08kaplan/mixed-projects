import React, { useEffect, useState } from "react";
import useAxios from "../custom-hooks/useAxios";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { VscSend } from "react-icons/vsc";

const ChatWithSelectedFriend = () => {
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { axiosWithToken } = useAxios();
  const { friendId } = useParams();
  // const { state:{username, image, id} } = useLocation()
  const location = useLocation();
  const username = location?.state?.username;
  const image = location?.state?.image;
  const id = location?.state?.id;

  console.log(username);
  console.log(image);
  console.log(id);
  console.log(user);

  const getMessages = async () => {
    try {
      const { data } = await axiosWithToken(`messages?filter[messages.sender]=${user?.id}&filter[messages.receiver]=${friendId}`);
      console.log(data);
      setChatHistory(data?.data[0]?.messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages();
    const interval = setInterval(getMessages, 30000);
    return () => clearInterval(interval);
  }, [friendId]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };

  const sendMessage = async () => {
    if (content.trim() == "") return;
    const postData = {
      content,
      sender: user.id,
      receiver: friendId,
    };
    try {
      const { data } = await axiosWithToken.post("messages", postData);
      console.log(data);
      getMessages();
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };
  console.log(chatHistory);
  return (
    <section aria-labelledby="chat-title" className="mt-5">
      <header id="chat-title" className="sr-only">
        <h2>Chat Conversation</h2>
      </header>

      <article className="flex flex-col gap-4 mb-5">
        {chatHistory?.map((chat) => (
          <div key={chat._id} className="flex flex-col gap-2">
            <div
              className={`flex ${
                chat.sender === friendId ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`flex items-center gap-3 p-4 rounded-lg shadow-md max-w-xs md:max-w-sm lg:max-w-md ${
                  chat.sender === friendId
                    ? "bg-white/80 backdrop-blur-sm"
                    : "bg-indigo-500 text-white"
                }`}
              >
                {chat.sender === friendId && (
                  <img
                    src={image}
                    alt="Friend's profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <p className="text-sm sm:text-base">{chat.content}</p>
                {chat.sender === user?.id && (
                  <img
                    src={user?.image}
                    alt="Your profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </article>

      <footer className="flex items-center gap-2 px-2 mt-2">
        <label htmlFor="message" className="sr-only">
          Type your message
        </label>
        <input
          id="message"
          name="message"
          value={content || ""}
          type="text"
          required
          onChange={handleChange}
          placeholder="Type a message..."
          className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600"
          aria-label="Type your message"
        />
        <button
          onClick={sendMessage}
          className="flex items-center justify-center w-10 h-10 text-white transition duration-200 bg-indigo-500 rounded-full hover:bg-indigo-600"
          aria-label="Send message"
        >
          <VscSend className="text-lg" />
        </button>
      </footer>
    </section>
  );
};

export default ChatWithSelectedFriend;
