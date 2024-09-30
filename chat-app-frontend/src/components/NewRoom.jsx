import React, { useState } from "react";
import useRooms from "../custom-hooks/useRooms";

const NewRoom = () => {
  const { newRoom } = useRooms();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    newRoom({ name });
  };

  const handleShow = () => {
    setOpen((prev) => !prev);
  };

  return (
    <section>
      <button
        onClick={handleShow}
        className="text-white bg-[#597F15] border-0 py-2 px-8 focus:outline-none hover:bg-[#51BD6D] rounded text-lg absolute bottom-10 right-1/2 translate-x-1/2 p-10"
      >
        New Room
      </button>

      {open && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3"
          >
            <div className="flex flex-col gap-3">
              <label
                htmlFor="newRoom"
                className="leading-7 text-sm text-white text-center"
              >
                New Room
              </label>
              <input
                type="text"
                id="newRoom"
                name="name"
                className="w-72 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={handleChange}
              />
            </div>
            <button className="text-white bg-[#597F15] border-0 py-2 px-8 focus:outline-none hover:bg-[#51BD6D] rounded text-lg">
              Submit
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default NewRoom;
