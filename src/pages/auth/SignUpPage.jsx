import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import MySocialLogo from "../../components/svgs/MySociallogo";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const formStructure = {
    email: "",
    userName: "",
    fullName: "",
    password: "",
  };

  const [formData, setFormData] = useState(formStructure);
  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, userName, fullName, password }) => {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userName, fullName, password }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      setFormData(formStructure);
      navigate("/login");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full md:w-3/4 mx-auto flex min-h-screen px-10 ">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <MySocialLogo className=" lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center w-full  ">
        <form
          className="w-full sm:w-3/4 md:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <MySocialLogo className="w-24 lg:hidden " />
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          <label className="input input-bordered rounded flex items-center gap-2 w-full">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>
          <div className="flex gap-4 flex-col w-full">
            <label className="input input-bordered rounded flex items-center gap-2 w-full">
              <FaUser />
              <input
                type="text"
                className="grow "
                placeholder="Username"
                name="userName"
                onChange={handleInputChange}
                value={formData.userName}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 w-full">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </label>
          </div>
          <label className="input input-bordered rounded flex items-center gap-2 w-full">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? "Loading..." : "Sign up"}
          </button>
          {isError && (
            <p className="text-red-500">
              {error.message || "Something went wrong"}
            </p>
          )}
        </form>
        <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 gap-2 mt-4">
          <p className=" text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary  btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
