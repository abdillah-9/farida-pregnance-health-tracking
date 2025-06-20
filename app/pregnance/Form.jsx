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

export default function Form({Pregnance, insertDataMutation, updateDataMutation, user}) {
  let id,
    userID,
    pregnance_week,
    featus_number,
    is_smoking,
    is_drinking,
    mental_health_problem,
    symptoms,
    prev_pregnancy_issues,
    fetal_HR,
    mother_HR,
    status,
    PregnanceID;

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

  console.log("new data is : "+JSON.stringify(Pregnance))
  if(newData){
( {
    id,
    userID,
    pregnance_week,
    featus_number,
    is_smoking,
    is_drinking,
    mental_health_problem,
    symptoms,
    prev_pregnancy_issues,
    fetal_HR,
    mother_HR,
    status,
  } = newData
);

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
    errors?.pregnance_week?.message ? errors.pregnance_week.message :
    errors?.featus_number?.message ? errors.featus_number.message :
    errors?.is_smoking?.message ? errors.is_smoking.message :
    errors?.is_drinking?.message ? errors.is_drinking.message :
    errors?.mental_health_problem?.message ? errors.mental_health_problem.message :
    errors?.symptoms?.message ? errors.symptoms.message :
    errors?.prev_pregnancy_issues?.message ? errors.prev_pregnancy_issues.message :
    errors?.fetal_HR?.message ? errors.fetal_HR.message :
    errors?.mother_HR?.message ? errors.mother_HR.message :
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

  console.log("Pregnance "+Pregnance)
  
// Basic Validations
const validateRequired = (val) => !val || val.trim?.() === "" ? "This field is required" : true;
const validateNumber = (val) => isNaN(val) || val <= 0 ? "Enter a valid number" : true;
const validateHeartRate = (val) => isNaN(val) || val < 0 || val > 200 ? "Enter realistic BPM" : true;
const validateText = (val) => !val || val.trim() === "" ? "Please enter a value" : true;


return (
  <FormContainer
    formContainer={form}
    handleClose={handleShowForm}
    formSubmit={formSubmit}
    onError={onError}
  >
    <FormContainer.SubmitRow submitRow={submitRow}>
      <FormContainer.Icon iconStyle={{ fontSize: "30px", color: "crimson" }}>
        <HiXCircle />
      </FormContainer.Icon>
    </FormContainer.SubmitRow>

    {/* Hidden Fields */}
    <FormContainer.Text text={id} inputStyle={{ display: "none" }} fieldName="id" />
    <FormContainer.Text text={userID} inputStyle={{ display: "none" }} fieldName="userID" />

    {/* Pregnance Week */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Pregnancy Week</FormContainer.Label>
      <FormContainer.Number inputStyle={inputStyle} fieldName="pregnance_week"
        number={pregnance_week} validation={validateNumber} />
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
    </FormContainer.Row>

    {/* Number of Fetuses */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Number of Fetuses</FormContainer.Label>
      <FormContainer.Number inputStyle={inputStyle} fieldName="featus_number"
        number={featus_number} validation={validateNumber} />
        <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
    </FormContainer.Row>

    {/* Smoking */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Smoking?</FormContainer.Label>
      <FormContainer.Select inputStyle={inputStyle} fieldName="is_smoking" validation={validateRequired}>
        <FormContainer.Option optionValue="">Select</FormContainer.Option>
        <FormContainer.Option optionValue="true">Yes</FormContainer.Option>
        <FormContainer.Option optionValue="false">No</FormContainer.Option>
      </FormContainer.Select>
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
    </FormContainer.Row>

    {/* Drinking */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Drinking?</FormContainer.Label>
      <FormContainer.Select inputStyle={inputStyle} fieldName="is_drinking" validation={validateRequired}>
        <FormContainer.Option optionValue="">Select</FormContainer.Option>
        <FormContainer.Option optionValue="true">Yes</FormContainer.Option>
        <FormContainer.Option optionValue="false">No</FormContainer.Option>
      </FormContainer.Select>
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
    </FormContainer.Row>

    {/* Mental Health Problem */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Mental Health Problem</FormContainer.Label>
      <FormContainer.Select inputStyle={inputStyle} fieldName="mental_health_problem" validation={validateRequired}>
        <FormContainer.Option optionValue="">Select</FormContainer.Option>
        <FormContainer.Option optionValue="true">Yes</FormContainer.Option>
        <FormContainer.Option optionValue="false">No</FormContainer.Option>
      </FormContainer.Select>
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
    </FormContainer.Row>

    {/* Previous Pregnancy Issues */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Previous Pregnancy Issues</FormContainer.Label>
      <FormContainer.Select inputStyle={inputStyle} fieldName="prev_pregnancy_issues" validation={validateRequired}>
        <FormContainer.Option optionValue="none">none</FormContainer.Option>
        <FormContainer.Option optionValue="">Select</FormContainer.Option>
        <FormContainer.Option optionValue="miscarriage">
          Lost a pregnancy (miscarriage)
        </FormContainer.Option>
        <FormContainer.Option optionValue="preterm_birth">
          Baby was born too early (before 37 weeks)
        </FormContainer.Option>
        <FormContainer.Option optionValue="gestational_diabetes">
          Had high blood sugar during pregnancy (gestational diabetes)
        </FormContainer.Option>
        <FormContainer.Option optionValue="preeclampsia">
          Had high blood pressure or swelling during pregnancy
        </FormContainer.Option>
        <FormContainer.Option optionValue="stillbirth">
          Baby died in the womb after 20 weeks (stillbirth)
        </FormContainer.Option>
        <FormContainer.Option optionValue="heavy_bleeding">
          Had heavy bleeding after delivery (postpartum hemorrhage)
        </FormContainer.Option>
        <FormContainer.Option optionValue="other">Other issue</FormContainer.Option>
      </FormContainer.Select>
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
    </FormContainer.Row>

    {/* Symptoms */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Symptoms</FormContainer.Label>
      <FormContainer.TextArea fieldName="symptoms" textAreaStyle={textArea}
        textArea={symptoms} validation={validateDesc} />
    </FormContainer.Row>

    {/* Fetal Heart Rate */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Fetal Heart Rate (BPM)</FormContainer.Label>
      <FormContainer.Number inputStyle={inputStyle} fieldName="fetal_HR"
        number={fetal_HR} validation={validateHeartRate} />
    </FormContainer.Row>

    {/* Mother's Heart Rate */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Mother's Heart Rate (BPM)</FormContainer.Label>
      <FormContainer.Number inputStyle={inputStyle} fieldName="mother_HR"
        number={mother_HR} validation={validateHeartRate} />
    </FormContainer.Row>

    {/* Status */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Status</FormContainer.Label>
      <FormContainer.Select inputStyle={inputStyle} fieldName="status" validation={validateRequired}>
        <FormContainer.Option optionValue="">Select</FormContainer.Option>
        <FormContainer.Option optionValue="confirmed">Confirmed</FormContainer.Option>
        <FormContainer.Option optionValue="unConfirmed">Un-confirmed</FormContainer.Option>
      </FormContainer.Select>
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone/></Icon>
    </FormContainer.Row>

    {/* Submit Buttons */}
    <FormContainer.SubmitRow submitRow={submitRow}>
      <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
      <FormContainer.Submit submitButton={submitButton}>Save Entry</FormContainer.Submit>
    </FormContainer.SubmitRow>
  </FormContainer>
)
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
  maxWidth:"180px",
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

//Validation methods
const validateName = (values)=>{
  // Check if the value is empty or contains only spaces
  if (!values || values.trim() === "") {
    return "Pregnance name is required";
  }

  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (consecutiveSpacesRegex.test(values)) {
    return "Pregnance name cannot contain consecutive spaces";
  }

  // Regular expression to allow only letters, numbers, spaces, and underscores
  const nameRegex = /^[A-Za-z0-9_ ]+$/;

  // Check if the value matches the allowed pattern
  if (!nameRegex.test(values)) {
    return "Pregnance name can only contain letters, numbers, spaces, and underscores";
  }

  //check length
  if(values.length > 15){
    return "Pregnance name must not exceed 15 characters"
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
      return "Pregnance desc must not exceed 15 characters"
    }
  return true; // Return true if validation passes
}

function validateAge(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "Pregnance age is required";
  }

  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (consecutiveSpacesRegex.test(values)) {
    return "Pregnance age cannot contain consecutive spaces";
  }

  if(values < 10){
    return "Age should be atleast 10 yrs"
  }

  return true; // Return true if validation passes 
}

function validatePeriodDuration(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "period duration is required";
  }

  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  if(values < 3 || values > 5){
    return "it should range from 3 to 5 days"
  }

  return true; // Return true if validation passes 
}

function validatedate(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "start-date is required";
  }

}

function validatePregnance(values){
  // Check if the value is empty or contains only spaces
  if (!values || values.trim() === "") {
   return "Pregnance name is required";
 }

}