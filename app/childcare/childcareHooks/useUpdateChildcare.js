"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast";
import { updateChildcareData } from "@utils/apiChildcare";

export const useUpdateFormData = ()=>{

      const queryClientUpdate = useQueryClient();
      const {mutate: updateDataMutation , isLoading: isUpdateLoading} = useMutation({
        mutationFn: updateChildcareData,
        onSuccess: () =>{
          toast.success("Data updated successful...");
          queryClientUpdate.invalidateQueries({ queryKey: ["childcareData"]});
        },
        onError: (err)=>{ 
            console.log(err)
            toast.error(err.message)
        }
      });
    return {updateDataMutation, isUpdateLoading}
}