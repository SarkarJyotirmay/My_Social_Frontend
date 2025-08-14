import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {
  const [page, setPage] = useState(1);

  const {
    data: suggestedUsers = [],
    isLoading,
	refetch,
	isRefetching
  } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/v1/users/suggested?page=${page}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch suggested users");
        }
        return data.users || [];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  });

  useEffect(()=>{
	refetch()
  }, [page, refetch]);

  const { follow, isPending } = useFollow();

//   useEffect(()=> {
// 	console.log(suggestedUsers[0].userName);
//   }, [suggestedUsers]);

  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4">
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            suggestedUsers?.map((user) => (
              <Link
                to={`/profile/${user.userName}`}
                className="flex items-center justify-between gap-4"
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{user.userName}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      follow(user._id);
                    }}
                  >
                    {isPending ? <LoadingSpinner size="sm"/> : "Follow"}
                  </button>
                </div>
              </Link>
            ))}
          <button
            className="btn btn-primary btn-outline"
            onClick={() => setPage((prev) => Number(prev) + 1)}
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};
export default RightPanel;
