"use client"
import { setReduxState } from '@app/provider/redux/reducer';
import useWindowSize from '@app/reusables/CUSTOM_hooks/useWindowSize';
import FormContainer from '@app/reusables/UI_components/Form/FormContainer'
import { HiXCircle } from '@node_modules/react-icons/hi2';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import React from 'react'
import toast from '@node_modules/react-hot-toast/dist';
import Icon from '@app/reusables/UI_components/Icon';
import { PiAsteriskDuotone } from '@node_modules/react-icons/pi';

export default function Form({ovulation, insertDataMutation, updateDataMutation, user}) {
  let id,
    userID,
    name,
    age,
    last_period_date,
    cycle_length_days,
    period_duration_days,
    is_cycle_regular,
    stress_level,
    sleep_hours,
    day_week_exercise,
    diagnosed_conditions,
    status,
    ovulationID;

  const {windowSize} = useWindowSize()
  const formState = useSelector((store)=>store.ReduxState.showForm);
  const newData = useSelector((store)=>store.ReduxState.fetchedFormData); 
  const dispatch = useDispatch();

  function handleShowForm(){
    dispatch(setReduxState({overlay: false, showForm: false}));
  }

  if(!user || !formState){
    return
  }  

  console.log("new data is : "+JSON.stringify(ovulation))
  if(newData){
({
  id,
  userID,
  name,
  age,
  last_period_date,
  cycle_length_days,
  period_duration_days,
  is_cycle_regular,
  stress_level,
  sleep_hours,
  day_week_exercise,
  diagnosed_conditions,
  status
} = newData);

  }
  userID = user.id;

  function formSubmit(data){
    user? console.log("userID"+ JSON.stringify(data)) :""

    newData ?
    updateDataMutation({
      ...data
    })  :
    insertDataMutation({
      ...data
    })
    dispatch(setReduxState({showForm: false, overlay:false}));
  }

function onError(errors) {
  toast.error(
    errors?.id?.message ? errors.id.message :
    errors?.userID?.message ? errors.userID.message :
    errors?.name?.message ? errors.name.message :
    errors?.age?.message ? errors.age.message :
    errors?.last_period_date?.message ? errors.last_period_date.message :
    errors?.cycle_length_days?.message ? errors.cycle_length_days.message :
    errors?.period_duration_days?.message ? errors.period_duration_days.message :
    errors?.is_cycle_regular?.message ? errors.is_cycle_regular.message :
    errors?.stress_level?.message ? errors.stress_level.message :
    errors?.sleep_hours?.message ? errors.sleep_hours.message :
    errors?.day_week_exercise?.message ? errors.day_week_exercise.message :
    errors?.diagnosed_conditions?.message ? errors.diagnosed_conditions.message :
    errors?.status?.message ? errors.status.message :
    ""
  );
}


  const form={
    fontSize:"14px",
    display:"flex",
    flexWrap:"wrap",
    backgroundColor:"white",
    padding:"15px",
    position:"fixed",
    top:0,
    left:formState ? 0 : "-100vw",
    width: "90vw",
    maxWidth:"600px",
    height:"100vh",
    overflow:"auto",
    transition: "left 0.5s ease",
    zIndex:2,
  }

  const formRow={
    width: windowSize.windowWidth >= 768 ? "50%" : "100%",
    height:"60px",
    padding:"40px 0px",
    borderBottom:"1px solid rgba(79, 8, 161, 0.16)",
    display:"flex",
    gap:"10px",
    alignItems:"center",
  }

  console.log("ovulation "+ovulation)
  
  // Basic Validations
  const validateRequired = (val) => !val || val.trim() === "" ? "This field is required" : true;
  const validateNumber = (val) => isNaN(val) || val < 0 ? "Enter a valid number" : true;
  const validateCycle = (val) => (val < 20 || val > 40) ? "Typical cycle is between 20-40 days" : true;

 return (
    <FormContainer
      formContainer={form}
      handleClose={handleShowForm}
      formSubmit={formSubmit}
      onError={onError}
    >
      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Icon iconStyle={{ fontSize: "30px", color: "crimson" }}>
          <HiXCircle/>
        </FormContainer.Icon>
      </FormContainer.SubmitRow>

      {/* Hidden ID Fields */}
      <FormContainer.Text text={id} inputStyle={{ display: "none" }} fieldName="id" />
      <FormContainer.Text text={userID} inputStyle={{ display: "none" }} fieldName="userID" />

      {/* Name */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Name</FormContainer.Label>
        <FormContainer.Text inputStyle={inputStyle} fieldName="name" 
          validation={validateRequired} text={name}/>
      </FormContainer.Row>

      {/* Age */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Age</FormContainer.Label>
        <FormContainer.Number inputStyle={inputStyle} fieldName="age"
          validation={validateNumber} number={age}/>
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
      </FormContainer.Row>

      {/* Last Period Date */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Last Period</FormContainer.Label>
        <FormContainer.Date inputStyle={inputStyle} fieldName="last_period_date"
          validation={validateRequired} date={last_period_date}/>
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
      </FormContainer.Row>

      {/* Cycle Length */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Cycle Length</FormContainer.Label>
        <FormContainer.Number inputStyle={inputStyle} fieldName="cycle_length_days"
          validation={validateCycle} number={cycle_length_days}/>
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
      </FormContainer.Row>

      {/* Period Duration */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Period Duration</FormContainer.Label>
        <FormContainer.Number inputStyle={inputStyle} fieldName="period_duration_days" 
          validation={validateNumber} number={period_duration_days}/>
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
      </FormContainer.Row>

      {/* Regular Cycle */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Cycle Regular?</FormContainer.Label>
        <FormContainer.Select inputStyle={inputStyle} fieldName="is_cycle_regular" >
          <FormContainer.Option optionValue="">Select</FormContainer.Option>
          <FormContainer.Option optionValue="true">Yes</FormContainer.Option>
          <FormContainer.Option optionValue="false">No</FormContainer.Option>
        </FormContainer.Select>
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
      </FormContainer.Row>

      {/* Stress Level */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Stress Level</FormContainer.Label>
        <FormContainer.Select inputStyle={inputStyle} fieldName="stress_level">
          <FormContainer.Option optionValue="">Select</FormContainer.Option>
          <FormContainer.Option optionValue="low">Low</FormContainer.Option>
          <FormContainer.Option optionValue="medium">Medium</FormContainer.Option>
          <FormContainer.Option optionValue="high">High</FormContainer.Option>
        </FormContainer.Select>
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
      </FormContainer.Row>

      {/* Sleep Hours */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Sleep Hours</FormContainer.Label>
        <FormContainer.Number inputStyle={inputStyle} fieldName="sleep_hours" 
          validation={validateNumber} number={sleep_hours}/>
      </FormContainer.Row>

      {/* Exercise Frequency */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Exercise Days/Week</FormContainer.Label>
        <FormContainer.Number inputStyle={inputStyle} fieldName="day_week_exercise" 
          validation={validateNumber} number={day_week_exercise} />
      </FormContainer.Row>

      {/* Diagnosed Conditions */}
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>Conditions</FormContainer.Label>
        <FormContainer.TextArea fieldName="diagnosed_conditions" textAreaStyle={textArea} 
          textArea={diagnosed_conditions}/>
      </FormContainer.Row>

      {/* status */}
      <FormContainer.Row formRow={{...formRow,width:"100%"}}>
        <FormContainer.Label labelStyle={labelStyle}>Status</FormContainer.Label>
        <FormContainer.Select inputStyle={inputStyle} fieldName="status" >
          <FormContainer.Option optionValue="">Select</FormContainer.Option>
          <FormContainer.Option optionValue="confirmed">confirmed</FormContainer.Option>
          <FormContainer.Option optionValue="unConfirmed">un-confirmed</FormContainer.Option>
        </FormContainer.Select>
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
      </FormContainer.Row>


      {/* Submit Buttons */}
      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
        <FormContainer.Submit submitButton={submitButton}>Save Entry</FormContainer.Submit>
      </FormContainer.SubmitRow>
    </FormContainer>
  );
};

//CSS
const cancelIcon={
  fontSize:"30px",
  color: "rgb(245, 5, 5)",
}
const idStyle={
  display: "none",
}
const labelStyle={
  width:"70px",
}
const inputStyle={
  width:"150px",
  border:"1px solid rgba(79, 8, 161, 0.16)",
  padding:"5px",
  //boxShadow:"1px 1px 5px rgba(79, 8, 161, 0.76)"
}
const textArea={
  width:"90%",
  height:"60px",
  maxWidth:"250px",
  border:"1px solid rgba(79, 8, 161, 0.16)",
  padding:"5px",
}
const redAsteris={
  color:"red",
  fontSize:"11px",

}
const submitRow={
  display: "flex",
  width:"100%",
  justifyContent: "flex-end",
  gap:"20px",
  flexDirection: "row",
  padding: "20px 10px", 
  fontWeight:500,
}
const cancelStyle={
  backgroundColor:"rgb(245, 5, 5)",
  color:"white",
  borderRadius:"5px",
  height:"50px",
  padding:"5px 12px",
}
const submitButton={
  //backgroundColor:"rgba(79, 8, 161, 0.76)",
  boxShadow:"1px 2px 10px rgba(12, 0, 26, 0.76)",
  color:"rgba(18, 2, 36, 0.76)",
  borderRadius:"5px",
  height:"50px",
  padding:"5px 12px",
}
const fileStyle = {
  display: "flex",
  flexDirection:"row",
  flexWrap:"wrap",
  alignItems:"center",
  gap:"10px",
  cursor:"pointer",
}
const fileStyleSpan = {
  backgroundColor:"rgba(79, 8, 161, 0.76)",
  borderRadius:"5px",
  padding:"10px",
  color: "white",
}

//Validation methods
const validatename = (values)=>{
  // Check if the value is empty or contains only spaces
  if (!values || values.trim() === "") {
    return "ovulation name is required";
  }

  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (consecutiveSpacesRegex.test(values)) {
    return "ovulation name cannot contain consecutive spaces";
  }

  // Regular expression to allow only letters, numbers, spaces, and underscores
  const nameRegex = /^[A-Za-z0-9_ ]+$/;

  // Check if the value matches the allowed pattern
  if (!nameRegex.test(values)) {
    return "ovulation name can only contain letters, numbers, spaces, and underscores";
  }

  //check length
  if(values.length > 15){
    return "ovulation name must not exceed 15 characters"
  }
  return true; // Return true if validation passes
}

const validateDesc = (values)=>{
  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (values && consecutiveSpacesRegex.test(values)) {
    return "description cannot contain consecutive spaces";
  }

  // Regular expression to allow only letters, numbers, spaces, and underscores
  const nameRegex = /^[A-Za-z0-9_ ]+$/;

  // Check if the value matches the allowed pattern
  if ( values && !nameRegex.test(values)) {
    return "description can only contain letters, numbers, spaces, and underscores";
  }
    //check length
    if(values.length > 50){
      return "ovulation desc must not exceed 15 characters"
    }
  return true; // Return true if validation passes
}

function validateAmount(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "ovulation amount is required";
  }

  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (consecutiveSpacesRegex.test(values)) {
    return "ovulation amount cannot contain consecutive spaces";
  }

  return true; // Return true if validation passes 
}

function validatedate(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "start-date is required";
  }

}

function validateovulation(values){
  // Check if the value is empty or contains only spaces
  if (!values || values.trim() === "") {
   return "ovulation name is required";
 }

}

function validateFile(){

}