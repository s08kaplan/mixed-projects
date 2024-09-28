import React from 'react'
import { Outlet, NavLink } from "react-router-dom"
import { getSessionUserData } from "../helpers/crypto"

const PrivateRouter = () => {
  const user = getSessionUserData()
  return user ? <Outlet/> : <NavLink to = "/login" />
}

export default PrivateRouter