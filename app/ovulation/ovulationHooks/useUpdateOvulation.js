"use client"

import { useMutation, useQueryClient } from "@node_modules/@tanstack/react-query"
import toast from "@node_modules/react-hot-toast";
import { updateOvulationData } from "@utils/apiOvulation";

export const useUpdateFormData = ()=>{

      const queryClientUpdate = useQueryClient();
      const {mutate: updateDataMutation , isLoading: isUpdateLoading} = useMutation({
        mutationFn: updateOvulationData,
        onSuccess: () =>{
          toast.success("Data updated successful...");
          queryClientUpdate.invalidateQueries({ queryKey: ["ovulationData"]});
        },
        onError: (err)=>{ 
            console.log(err)
            toast.error(err.message)
        }
      });
    return {updateDataMutation, isUpdateLoading}
}