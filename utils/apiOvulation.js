import supabase1 from "./supabase";

// -------------------- Task data with ovulation table in supabase -------------------- //
export async function getOvulationData(){
let { data, error } = await supabase1
.from('ovulation')
.select('*')

if(error){
    console.error(error)  
    throw new Error("Data Could not be fetched");
}
return data;
}

export async function deleteOvulationData(id){
    let { data, error } = await supabase1
    .from('ovulation')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        throw new Error("Data could not be deleted");   
    }
    return data;
}

//Insert data
export async function insertOvulationData(newOvulation){
    console.log("ovulation inserted "+JSON.stringify(newOvulation))

    //destructure newovulation to remove id
    const {id, ...withoutID} = newOvulation;
    
    const { data, error } = await supabase1
    .from('ovulation')
    .insert([
      { 
        ...withoutID
        },
    ])
    .select()          

    if(error){
        console.error(error)    
        throw new Error(JSON.stringify(error));
    }
    return data;
}

//Update data
export async function updateOvulationData(updateOvulation){

    const { data, error } = await supabase1
    .from('ovulation')
    .update(
        {...updateOvulation}
    )
    .eq("id" , updateOvulation.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}
