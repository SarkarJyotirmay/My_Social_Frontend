import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MySocialLogo from "../../components/svgs/MySociallogo";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ userName, password }) => {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.error || data.message || "Something went wrong");
      }
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      return data;
    },
    onSuccess: (data) => {
      setFormData({ userName: "", password: "" });
      toast.success("Login successful");
      // navigate("/");
      // invalidate authUser query to refresh user data and skip refresh
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
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
    <div className="w-full md:w-3/4 mx-auto flex h-screen ">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <MySocialLogo className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="flex gap-4 flex-col items-center w-full  p-2"
          onSubmit={handleSubmit}
        >
          <MySocialLogo className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold ">{"Let's"} go.</h1>
          <label className="input input-bordered rounded flex items-center gap-2 w-full">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="userName"
              onChange={handleInputChange}
              value={formData.userName}
            />
          </label>

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
          <button className="btn rounded-full btn-primary w-full ">
            {isPending ? "Logging in..." : "Login"}
          </button>
          {isError && (
            <p className="text-red-500">
              {error.message || "Something went wrong"}
            </p>
          )}
        </form>
        <div className="flex flex-col gap-2 mt-4 w-full  p-2">
          <p className=" text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
