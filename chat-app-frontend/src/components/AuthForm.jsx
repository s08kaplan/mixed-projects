import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../helpers/formValidation";
import { authFormInputs } from "../helpers/formInputs";
import { encryptData } from "../helpers/crypto";
import useAxios from "../custom-hooks/useAxios";
import useAuthCalls from "../custom-hooks/useAuthCalls";
import { useDispatch } from "react-redux";

const AuthForm = ({ formType }) => {
  const { registerUser, login } = useAuthCalls();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(authSchema) });

  const onSubmit = (data) => {
    formType == "register"
      ? dispatch(registerUser(data))
      : dispatch(login(data));
  };

  // Reset form after a successful submission
  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  // Handle navigation for login/register
  const handleNavigate = () => {
    const targetPath = formType === "login" ? "/register" : "/login";
    navigate(targetPath);
  };
  return (
    <section className="flex items-center justify-center h-dvh">
      <main className="p-4 border rounded-lg shadow-sm bg-[rgba(0,0,0,0.3)]">
        <h2 className="mb-4 text-center">
          {formType === "login" ? "Login Form" : "Register Form"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {formType === "register" ? authFormInputs.map((item) => (
            <section key={item.name} className="mb-3">
              <label htmlFor={item.name} className="text-gray-800">
                {item.label}
              </label>
              <input
                type={item.type}
                id={item.name}
                name={item.name}
                placeholder={item.label}
                {...register(item.name)}
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-700">{errors[item.name]?.message}</p>
            </section>
          ))
          :
          authFormInputs.filter(item => item.name !== "image").map(item => (
            <section key={item.name} className="mb-3">
            <label htmlFor={item.name} className="text-gray-800">
              {item.label}
            </label>
            <input
              type={item.type}
              id={item.name}
              name={item.name}
              placeholder={item.label}
              {...register(item.name)}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-700">{errors[item.name]?.message}</p>
          </section> 
          ))
          }
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-sky-600 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            {isSubmitting
              ? "Submitting..."
              : formType === "register"
              ? "Register"
              : "Login"}
          </button>

          <div className="mt-3 text-center">
            <span>
              {formType === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <button
              className="px-3 py-2 ml-2 text-sm font-semibold text-white rounded-md shadow-sm bg-sky-600 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              onClick={handleNavigate}
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
