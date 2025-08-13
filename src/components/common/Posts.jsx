import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType }) => {
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return "/api/v1/posts/allposts";
      case "following":
        return "/api/v1/posts/following";
      default:
        return "/api/v1/posts/allposts";
    }
  };

  const POST_ENDPOINT = getPostEndpoint();

  const {
    data: posts = [],
    isLoading,
    refetch,
	isRefetching
  } = useQuery({
    queryKey: ["posts", feedType], // include feedType to avoid manual refetch
    queryFn: async () => {
     try {
		 const res = await fetch(POST_ENDPOINT);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }

      if (!data.success) {
        // Always return an empty array, not undefined
        return [];
      }

      // If posts is undefined, default to []
      return Array.isArray(data.posts) ? data.posts : [];
	 } catch (error) {
		log(error);
		return [];
	 }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
