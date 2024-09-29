import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, NavLink } from "react-router-dom"

const PrivateRouter = () => {
const { token } = useSelector(state=> state.auth)
  return token ? <Outlet/> : <NavLink to = "/login" />
}

export default PrivateRouter