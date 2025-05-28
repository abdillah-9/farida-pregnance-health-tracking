"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast";
import { updatePregnanceData } from "@utils/apiPregnance";

export const useUpdateFormData = ()=>{

      const queryClientUpdate = useQueryClient();
      const {mutate: updateDataMutation , isLoading: isUpdateLoading} = useMutation({
        mutationFn: updatePregnanceData,
        onSuccess: () =>{
          toast.success("Data updated successful...");
          queryClientUpdate.invalidateQueries({ queryKey: ["pregnanceData"]});
        },
        onError: (err)=>{ 
            console.log(err)
            toast.error(err.message)
        }
      });
    return {updateDataMutation, isUpdateLoading}
}