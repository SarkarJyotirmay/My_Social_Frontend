import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import RightPanel from "../components/common/RightPanel";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

const Layout = () => {
  const queryClient = useQueryClient();
  // Get the cached authUser data (from App.jsx's useQuery)
  const { data: authData } = useQueryClient().getQueryData(["authUser"])
    ? { data: useQueryClient().getQueryData(["authUser"]) }
    : { data: null };

  const authUser = authData?.user || null;
/* Line 8-15 briefing:  Get the logged-in user's info directly from React Query's cache.
This is the same data fetched in App.jsx, so we don’t call the API again.
 If no user is logged in, this will be null.  
 */

  return (
    <>
      <div className="parent flex">
        {authUser && <Sidebar />}
        <Outlet />
        {authUser && <RightPanel />}
      </div>
    </>
  );
};

export default Layout;
