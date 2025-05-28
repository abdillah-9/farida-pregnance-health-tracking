import supabase1 from "./supabase";

// -------------------- Task data with Childcare table in supabase -------------------- //
export async function getChildcareData(){
let { data, error } = await supabase1
.from('childcare')
.select('*')

if(error){
    console.error(error)  
    throw new Error("Data Could not be fetched");
}
return data;
}

export async function deleteChildcareData(id){
    let { data, error } = await supabase1
    .from('childcare')
    .delete()
    .eq("id", id)

    if(error){
        console.error(error)
        throw new Error("Data could not be deleted");   
    }
    return data;
}

//Insert data
export async function insertChildcareData(newChildcare){
    console.log("Childcare inserted "+JSON.stringify(newChildcare))

    //destructure newChildcare to remove id
    const {id, ...withoutID} = newChildcare;
    
    const { data, error } = await supabase1
    .from('childcare')
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
export async function updateChildcareData(updateChildcare){

    const { data, error } = await supabase1
    .from('childcare')
    .update(
        {...updateChildcare}
    )
    .eq("id" , updateChildcare.id)
    .select()       

    if(error){
        console.log(JSON.stringify(error))
    }
    return data;
}
