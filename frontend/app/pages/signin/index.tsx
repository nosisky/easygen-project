import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../helpers";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const history = useRouter();

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
        Cookies.set("userToken", response.data.accessToken, { expires: 1 });
        toast.success("Sign in successful!");
        history.push("/dashboard");
      } catch (error) {
        console.error("Sign in error", error);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <h2>Sign In</h2>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div>{formik.errors.email}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div>{formik.errors.password}</div>}
        </div>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignIn;
