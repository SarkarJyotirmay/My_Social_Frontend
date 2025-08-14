import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFollow = () =>{
    const queryClient = useQueryClient();
    const {mutate: follow, isPending,} = useMutation({
        mutationFn: async (userId) => {
            const res = await fetch(`/api/v1/users/follow/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to follow user");
            }

            if (data.error) {
                throw new Error(data.error);
            }
            console.log(data);
            

            return data;
        },
        onSuccess: (data) => {
            Promise.all([
                queryClient.invalidateQueries(["authUser"]),
                queryClient.invalidateQueries(["suggestedUsers"]),
            ])
            toast.success(`Follow successful: ${data.userToModify.userName}`)
        },
        onError: (error) => {
            console.error("Follow error:", error);
        },
    })
    return { follow, isPending };
}

export default useFollow;