import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Rooms from "../pages/Rooms";
// import NewRoom from "../pages/NewRoom";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../pages/NotFound";
import SelectedRoom from "../pages/SelectedRoom";
import FriendProfile from "../pages/FriendProfile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="rooms" element={<PrivateRouter />}>
        <Route index element={<Rooms />} />
        <Route path=":roomId" element={<SelectedRoom />} />
      </Route>
      {/* <Route path="new-room" element={<PrivateRouter />}>
        <Route path="" element={<NewRoom />} />
      </Route> */}
      <Route path="profile" element={<PrivateRouter />}>
        <Route path="" element={<Profile />} />
      </Route>
      <Route path="friend-profile/:friendId" element={<PrivateRouter />}>
        <Route path="" element={<FriendProfile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
