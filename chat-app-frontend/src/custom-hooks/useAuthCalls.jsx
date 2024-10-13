import useAxios from "./useAxios"
import { fetchStart, fetchFail, registerSuccess, loginSuccess, logoutSuccess, updateUserInfo, getUserInfo  } from "../Slices/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const useAuthCalls = () => {
    const { axiosPublic, axiosWithToken } = useAxios()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const registerUser = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic.post("users",userInfo)
            dispatch(registerSuccess(data))
            login(userInfo)
        } catch (error) {
            dispatch(fetchFail(error))
            console.error(error)
        }
    }
    const login = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic.post("auth/login",userInfo)
            console.log(data);
            dispatch(loginSuccess(data))
            navigate("/rooms")
        } catch (error) {
            dispatch(fetchFail(error))
            console.error(error)
        }
    }
    const logout = async () => {
        dispatch(fetchStart())
        try {
             await axiosWithToken.get("auth/logout")
            dispatch(logoutSuccess())
            navigate("/")
        } catch (error) {
            dispatch(fetchFail(error))
            console.error(error)
        }
    }

    const getUsers = async () => {    
        dispatch(fetchStart())
        try {
          const { data } = await axiosWithToken.get("users")
            dispatch(getUserInfo(data))
        } catch (error) {
            dispatch(fetchFail(error))
            console.error(error)
        }
    }

    const updateUser = async (userId, userInfo) => {
        console.log(userId);
        console.log(userInfo);
        dispatch(fetchStart())
        try {
            const { data } =  await axiosWithToken.put(`users/${userId}`,userInfo)
            dispatch(updateUserInfo(data))
            
        } catch (error) {
            dispatch(fetchFail(error))
            console.error(error)
        }
    }



  return { registerUser, login, logout, getUsers, updateUser }
}

export default useAuthCalls