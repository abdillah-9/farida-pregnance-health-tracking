"use client"
import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast/dist";
import { insertChildcareData } from "@utils/apiChildcare";

export const useCreateChildcare = ()=>{
    // Here we define mutate func that sends data to supabase
    const queryClient = useQueryClient();
    const {mutate: insertDataMutation} = useMutation({
          mutationFn: insertChildcareData,
          onSuccess: () =>{
            toast.success("Data inserted successful...");
            queryClient.invalidateQueries({ queryKey: ["childcareData"]});
          },
          onError: (err)=>{
            console.log("Insert data mutation "+err);
            toast.error(err.message);
        }
        });

    return {insertDataMutation}
}