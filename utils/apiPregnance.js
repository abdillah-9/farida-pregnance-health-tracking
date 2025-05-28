import supabase1 from "./supabase";

// -------------------- Task data with Pregnance table in supabase -------------------- //
export async function getPregnanceData(){
let { data, error } = await supabase1
.from('pregnance')
.select('*')

if(error){
    console.error(error)  
    throw new Error("Data Could not be fetched");
}
return data;
}

export async function deletePregnanceData(id){
    let { data, error } = await supabase1
    .from('pregnance')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        throw new Error("Data could not be deleted");   
    }
    return data;
}

//Insert data
export async function insertPregnanceData(newPregnance){
    console.log("Pregnance inserted "+JSON.stringify(newPregnance))

    //destructure newPregnance to remove id
    const {id, ...withoutID} = newPregnance;
    
    const { data, error } = await supabase1
    .from('pregnance')
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
export async function updatePregnanceData(updatePregnance){

    const { data, error } = await supabase1
    .from('pregnance')
    .update(
        {...updatePregnance}
    )
    .eq("id" , updatePregnance.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}
