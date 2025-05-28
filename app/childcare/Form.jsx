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

export default function Form({Childcare, insertDataMutation, updateDataMutation, user}) {
  let id,
    userID,
    baby_age_month,
    gender,
    birth_weight,
    current_weight,
    feeding_type,
    feeding_frequency,
    sleep_hours,
    status;

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

  console.log("new data is : "+JSON.stringify(Childcare))
  if(newData){
( {
    id,
    userID,
    baby_age_month,
    gender,
    birth_weight,
    current_weight,
    feeding_type,
    feeding_frequency,
    sleep_hours,
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
    errors?.baby_age_month?.message ? errors.baby_age_month.message :
    errors?.gender?.message ? errors.gender.message :
    errors?.birth_weight?.message ? errors.birth_weight.message :
    errors?.current_weight?.message ? errors.current_weight.message :
    errors?.feeding_type?.message ? errors.feeding_type.message :
    errors?.feeding_frequency?.message ? errors.feeding_frequency.message :
    errors?.sleep_hours?.message ? errors.sleep_hours.message :
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

  console.log("Childcare "+Childcare)
  
  // Basic Validations
  const validateRequired = (val) =>
    val === undefined || val === null || val.toString().trim() === "" ? "This field is required" : true;

  const validateNumber = (val) =>
    isNaN(val) || Number(val) < 0 ? "Enter a valid number" : true;

  const validatePositiveNumber = (val) =>
    isNaN(val) || Number(val) <= 0 ? "Value should be atleast one" : true;


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

    {/* Baby Age (months) */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Baby Age (months)</FormContainer.Label>
      <FormContainer.Number
        inputStyle={inputStyle}
        fieldName="baby_age_month"
        validation={validateNumber}
        number={baby_age_month}
      />
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone /></Icon>
    </FormContainer.Row>

    {/* Gender */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Gender</FormContainer.Label>
      <FormContainer.Select inputStyle={inputStyle} fieldName="gender" validation={validateRequired}>
        <FormContainer.Option optionValue="">Select</FormContainer.Option>
        <FormContainer.Option optionValue="male">Male</FormContainer.Option>
        <FormContainer.Option optionValue="female">Female</FormContainer.Option>
        <FormContainer.Option optionValue="other">Other</FormContainer.Option>
      </FormContainer.Select>
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone /></Icon>
    </FormContainer.Row>

    {/* Birth Weight */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Birth Weight (kg)</FormContainer.Label>
      <FormContainer.Number
        inputStyle={inputStyle}
        fieldName="birth_weight"
        validation={validateNumber}
        number={birth_weight}
      />
    </FormContainer.Row>

    {/* Current Weight */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Current Weight (kg)</FormContainer.Label>
      <FormContainer.Number
        inputStyle={inputStyle}
        fieldName="current_weight"
        validation={validatePositiveNumber}
        number={current_weight}
      />
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone /></Icon>
    </FormContainer.Row>

    {/* Feeding Type */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Feeding Type</FormContainer.Label>
      <FormContainer.Select inputStyle={inputStyle} fieldName="feeding_type" validation={validateRequired}>
        <FormContainer.Option optionValue="">Select</FormContainer.Option>
        <FormContainer.Option optionValue="breastfeeding">Breastfeeding</FormContainer.Option>
        <FormContainer.Option optionValue="formula">Formula</FormContainer.Option>
        <FormContainer.Option optionValue="mixed">Mixed</FormContainer.Option>
      </FormContainer.Select>
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone /></Icon>
    </FormContainer.Row>

    {/* Feeding Frequency (per day) */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Feeding Frequency (times/day)</FormContainer.Label>
      <FormContainer.Number
        inputStyle={inputStyle}
        fieldName="feeding_frequency"
        validation={validatePositiveNumber}
        number={feeding_frequency}
      />
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone /></Icon>
    </FormContainer.Row>

    {/* Sleep Hours */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Sleep Hours</FormContainer.Label>
      <FormContainer.Number
        inputStyle={inputStyle}
        fieldName="sleep_hours"
        validation={validateNumber}
        number={sleep_hours}
      />
    </FormContainer.Row>

    {/* Status */}
    <FormContainer.Row formRow={formRow}>
      <FormContainer.Label labelStyle={labelStyle}>Status</FormContainer.Label>
      <FormContainer.Select inputStyle={inputStyle} fieldName="status" validation={validateRequired}>
        <FormContainer.Option optionValue="">Select</FormContainer.Option>
        <FormContainer.Option optionValue="confirmed">Confirmed</FormContainer.Option>
        <FormContainer.Option optionValue="unConfirmed">Unconfirmed</FormContainer.Option>
      </FormContainer.Select>
      <Icon iconStyle={redAsteris}><PiAsteriskDuotone /></Icon>
    </FormContainer.Row>

    {/* Submit */}
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
  maxWidth:"195px",
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
