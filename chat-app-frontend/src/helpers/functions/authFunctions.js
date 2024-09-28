import useAxios from "../../custom-hooks/useAxios";

export const registerUser = async (email, password, username, image = "") => {
  try {
    const data = await axiosPublic.post("users", {
      email,
      password,
      username,
      image,
    });
    return data
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (email, password, username) => {
    try {
       const data = await axiosPublic.post("auth/login",{
        email,
        password,
        username
      }) 
      return data
    } catch (error) {
        console.log(error);
    } 
};
