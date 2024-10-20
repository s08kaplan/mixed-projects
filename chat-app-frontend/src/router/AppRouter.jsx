import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../pages/NotFound";
// import NewRoom from "../pages/NewRoom";
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Rooms = lazy(() => import("../pages/Rooms"))
const Profile = lazy(() => import("../pages/Profile"))
const SelectedRoom = lazy(() => import("../pages/SelectedRoom"))
const FriendProfile = lazy(() => import("../pages/FriendProfile"))

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div> }>
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
    </Suspense>
  );
};

export default AppRouter;
