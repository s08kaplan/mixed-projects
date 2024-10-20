import React, { useEffect, useState } from "react";
import useAxios from "../custom-hooks/useAxios";
// import { section, sectionBackdrop, sectionPanel, sectionTitle } from '@headlessui/react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import useAuthCalls from "../custom-hooks/useAuthCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const navigate = useNavigate()
  
  const [users, setUsers] = useState([]);

  console.log(user);

  const getUsers = async () => {
    try {
      const { data } = await axiosWithToken("users");
      console.log(data);
      setUsers(data?.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="absolute left-0 flex justify-start p-3 m-2 border border-gray-500">
      <ul className="flex flex-col divide-y divide-gray-100">
        {users.map((person) => (
          <li key={person._id} className="flex justify-between py-5 gap-x-6">
            <div onClick={() => navigate(`/friend-profile/${person._id}`)} className="flex items-center min-w-0 gap-x-4 hover:cursor-pointer">
              <img
                alt={`${person.username} image`}
                src={person.image}
                className="flex-none w-12 h-12 rounded-full bg-gray-50"
              />
              <div className="flex-auto min-w-0">
                <p className="text-sm font-semibold leading-6 text-primary">
                  {person.username}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-gray-900">{person.role}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserCard;
