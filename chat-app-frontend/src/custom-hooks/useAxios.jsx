import axios from "axios"
import { getSessionUserData } from "../helpers/crypto";

const useAxios = () => {
   const userData = getSessionUserData()

    const axiosPublic = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}`,
      });

      const axiosWithToken = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}`,
        headers: {Authorization: `Token ${userData?.data?.token}`}
      });
    
     
  return { axiosPublic, axiosWithToken }
}

export default useAxios