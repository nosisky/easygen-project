"use client";

import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../helpers";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const history = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const { setUser } = useContext(AuthContext);

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post("/auth/signin", values);
        toast.success("Sign in successful!");

        Cookies.set("userToken", response.data.accessToken, { expires: 1 });
        setUser(response.data.user);

        history.push("/dashboard");
      } catch (error: any) {
        toast.error(`Sign in failed!, ${error.response.data.message}`);
        console.error("Sign in error", error);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl text-center font-bold mb-4 text-gray-600">
          Sign In
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
          />
          {formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-2 mt-7 text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Sign In
        </button>
        <div className="mt-4 text-center text-gray-700">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignIn;
