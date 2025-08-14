// import MySocialLogo from "../svgs/MySociallogo";

// import { MdHomeFilled } from "react-icons/md";
// import { IoNotifications } from "react-icons/io5";
// import { FaUser } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { BiLogOut } from "react-icons/bi";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const Sidebar = () => {
//   const data = {
//     fullName: "John Doe",
//     userName: "johndoe",
//     profileImg: "/avatars/boy1.png",
//   };

//   const queryClient = useQueryClient();

//   const navigate = useNavigate();

//   const {
//     mutate: logout,
//     isPending,
//     isError,
//     error,
//   } = useMutation({
//     mutationFn: async () => {
//       const res = await fetch("/api/v1/auth/logout", {
//         method: "POST",
//       });
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         throw new Error(data.message || "Logout failed");
//       }

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       return data;
//     },
//     onSuccess: () => {
//       // Clear cached auth data instantly
//       queryClient.setQueryData(["authUser"], null);

//       toast.success("Logout successful");
//       navigate("/login", { replace: true });
//     },
//     onError: (error) => {
//       toast.error(error.message || "An error occurred during logout");
//       console.error("Logout error:", error);
//     },
//   });

//   const handleLogout = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log("Logout action triggered");
//     logout();
//   };

//   return (
//     <div className="md:flex-[2_2_0] w-18 max-w-52">
//       <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
//         {/* Logo */}
//         <Link to="/" className="flex justify-center md:justify-start">
//           <MySocialLogo className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
//         </Link>

//         {/* Menu */}
//         <ul className="flex flex-col gap-3 mt-4">
//           <li className="flex justify-center md:justify-start">
//             <Link
//               to="/"
//               className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
//             >
//               <MdHomeFilled className="w-8 h-8" />
//               <span className="text-lg hidden md:block">Home</span>
//             </Link>
//           </li>

//           <li className="flex justify-center md:justify-start">
//             <Link
//               to="/notifications"
//               className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
//             >
//               <IoNotifications className="w-6 h-6" />
//               <span className="text-lg hidden md:block">Notifications</span>
//             </Link>
//           </li>

//           <li className="flex justify-center md:justify-start">
//             <Link
//               to={`/profile/${data?.userName}`}
//               className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
//             >
//               <FaUser className="w-6 h-6" />
//               <span className="text-lg hidden md:block">Profile</span>
//             </Link>
//           </li>
//         </ul>

//         {/* Profile & Logout */}
//         {data && (
//           <Link
//             to={`/profile/${data.userName}`}
//             className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
//           >
//             <div className="avatar hidden md:inline-flex">
//               <div className="w-8 rounded-full">
//                 <img src={data?.profileImg || "/avatar-placeholder.png"} alt="Profile" />
//               </div>
//             </div>
//             <div className="flex justify-between flex-1">
//               <div className="hidden md:block">
//                 <p className="text-white font-bold text-sm w-20 truncate">
//                   {data?.fullName}
//                 </p>
//                 <p className="text-slate-500 text-sm">@{data?.userName}</p>
//               </div>
//               <BiLogOut
//                 className="w-5 h-5 cursor-pointer"
//                 onClick={handleLogout}
//               />
//             </div>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import MySocialLogo from "../svgs/MySociallogo";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Get the cached authUser data (from App.jsx's useQuery)
  const { data: authData } = useQueryClient().getQueryData(["authUser"])
    ? { data: useQueryClient().getQueryData(["authUser"]) }
    : { data: null };
  

  const authUser = authData?.user || null;

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/v1/auth/logout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Logout failed");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      toast.success("Logout successful");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during logout");
    },
  });

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isPending) logout();
  };

  if (!authUser) return null; // Don't render sidebar if not logged in

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        {/* Logo */}
        <Link to="/" className="flex justify-center md:justify-start">
          <MySocialLogo className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>

        {/* Menu */}
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser.userName}`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="w-6 h-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>

        {/* Profile + Logout */}
        <Link
          to={`/profile/${authUser.userName}`}
          className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
        >
          <div className="avatar hidden md:inline-flex">
            <div className="w-8 rounded-full">
              <img
                src={authUser.profileImg || "/avatar-placeholder.png"}
                alt="Profile"
              />
            </div>
          </div>
          <div className="flex justify-between flex-1">
            <div className="hidden md:block">
              <p className="text-white font-bold text-sm w-20 truncate">
                {authUser.fullName}
              </p>
              <p className="text-slate-500 text-sm">@{authUser.userName}</p>
            </div>
            <BiLogOut
              className="w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

