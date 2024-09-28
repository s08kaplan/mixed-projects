import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../helpers/formValidation";
import { authFormInputs } from "../helpers/formInputs";
import { registerUser, loginUser } from "../helpers/functions/authFunctions";

const AuthForm = ({ formType }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(authSchema) });

  const onSubmit = async (data) => {
    try {
      formType === "register" ? registerUser(data.email, data.password,data.username) : loginUser(data.email, data.password,data.username);
      
      navigate("/post-todo");
    } catch (error) {
      console.error("Error during form submission", error); // Error message here
    }
  };

  // Reset form after a successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // Handle navigation for login/register
  const handleNavigate = () => {
    const targetPath = formType === "login" ? "/register" : "/login";
    navigate(targetPath);
  };
  return (
    <section className="flex justify-center items-center h-dvh">
      
        
          <main className="p-4 border rounded-lg shadow-sm bg-light">
            <h2 className="text-center mb-4">
              {formType === "login" ? "Login Form" : "Register Form"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {authFormInputs.map((item) => (
                <section key={item.name} className="mb-3">
                  <label htmlFor={item.name} className="text-gray-800">{item.label}</label>
                  <input
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    placeholder={item.label}
                    {...register(item.name)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-700">
                    {errors[item.name]?.message}
                  </p>
                </section>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                 className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                {isSubmitting
                  ? "Submitting..."
                  : formType === "register"
                  ? "Register"
                  : "Login"}
              </button>

              <div className="text-center mt-3">
                <span>
                  {formType === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>
                <button
                  className="ml-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"                  onClick={handleNavigate}
                >
                  {formType === "login" ? "Register" : "Login"}
                </button>
              </div>
            </form>
          </main>
       
     
    </section>
  );
};

export default AuthForm;