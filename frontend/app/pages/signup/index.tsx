import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../helpers";
import { useRouter } from "next/router";

function SignUp() {
  const history = useRouter();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Minimum length of 8 characters")
      .matches(/[a-zA-Z]/, "At least one letter")
      .matches(/\d/, "At least one number")
      .matches(/[^a-zA-Z0-9]/, "At least one special character"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/auth/signup", values);
        history.push("/application");
      } catch (error) {
        console.error("Sign up error", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        {formik.errors.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        {formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        {formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
