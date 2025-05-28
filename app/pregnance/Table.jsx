"use client"
import TableContainer, { TBody,THead,TH,TR,TD } from '@app/reusables/UI_components/Table/TableContainer'
import React from 'react'
import Icon from '@app/reusables/UI_components/Icon';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import { HiOutlinePencil, HiOutlineTrash } from '@node_modules/react-icons/hi2';
import { setReduxState } from '@app/provider/redux/reducer';
import { useDispatch } from '@node_modules/react-redux/dist/react-redux';

export default function Table({user, pregnancyData, pageRows,pageNumber}) {

  //CSS
  const unConfirmed = {
    backgroundColor:"rgba(204, 7, 7, 0.37)",
    color:"rgb(68, 1, 1)",
  }
  const confirmed = {
    backgroundColor:"rgba(3, 196, 67, 0.37)",
    color:"rgb(6, 43, 1)",
  }
  const exceeded={
    color:"rgba(160, 3, 3, 0.86)",
    fontWeight:500,
    display:"flex",
    gap:"5px",
    alignItems:"center",
  }
  const warningIcon={
    fontSize:"23px",
    cursor:"pointer",
  }

  if (!user){
    return <LoadingSpinner/>
  }

  const dispatch = useDispatch();
    function deleteAction(rowID){
      dispatch(setReduxState({deleteData:true,overlay:true, showNavBar: false, fetchedFormData: rowID}))
    }

    function editAction(row){
      dispatch(setReduxState({showForm: true, overlay: true ,fetchedFormData: row}))
      console.log("fetchedFormData after clicking edit icon "+JSON.stringify(row))
    }
  
return (
<TableContainer styleTable={tableContainer}>
  <THead>
    <TR styleTR={{ ...tRow, ...headerRow, textTransform:"uppercase"}}>
      <TH styleTH={tCell}>CREATED DATE</TH>
      <TH styleTH={tCell}>Pregnancy Week</TH>
      <TH styleTH={tCell}>Number of Fetus</TH>
      <TH styleTH={tCell}>Smoking ?</TH>
      <TH styleTH={tCell}>Drinking ?</TH>
      <TH styleTH={tCell}>Mental Health Problem</TH>
      <TH styleTH={tCell}>Previous Pregnancy Issues</TH>
      {/* <TH styleTH={tCell}>Symptoms</TH>
      <TH styleTH={tCell}>Fetal Heart Rate (BPM)</TH>
      <TH styleTH={tCell}>Mother's Heart Rate (BPM)</TH> */}
      <TH styleTH={tCell}>Status</TH>
      <TH styleTH={tCell}>Actions</TH>
    </TR>
  </THead>
  <TBody>
    {pregnancyData ? pregnancyData
      .slice((pageNumber - 1) * pageRows, pageNumber * pageRows)
      .map(row => (
        <TR key={row.id} styleTR={tRow}>
          <TD styleTD={tCell}>
            {new Date(row.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </TD>
          <TD styleTD={tCell}>{row.pregnance_week}</TD>
          <TD styleTD={tCell}>{row.featus_number}</TD>
          <TD styleTD={tCell}>{row.is_smoking === "true" ? "Yes" : "No"}</TD>
          <TD styleTD={tCell}>{row.is_drinking === "true" ? "Yes" : "No"}</TD>
          <TD styleTD={tCell}>{row.mental_health_problem === "true" ? "Yes" : "No"}</TD>
          <TD styleTD={tCell}>{row.prev_pregnancy_issues || "--"}</TD>
          {/* <TD styleTD={tCell}>{row.symptoms || "--"}</TD>
          <TD styleTD={tCell}>{row.fetal_HR || "--"}</TD>
          <TD styleTD={tCell}>{row.mother_HR || "--"}</TD> */}
          <TD styleTD={tCell}>
            <div
              style={
                row.status === "confirmed"
                  ? { ...status, ...confirmed }
                  : { ...status, ...unConfirmed }
              }
            >
              {row.status}
            </div>
          </TD>
          <TD styleTD={tCellActions}>
            <Icon clickAction={() => editAction(row)} title={"edit"}>
              <HiOutlinePencil />
            </Icon>
            <Icon clickAction={() => deleteAction(row.id)} title={"delete"}>
              <HiOutlineTrash />
            </Icon>
          </TD>
        </TR>
      ))
      : (
        <TR>
          <TD styleTD={dataNotFound} colSpan={12}>
            <LoadingSpinner />
          </TD>
        </TR>
      )}
  </TBody>
</TableContainer>

)
}

//Css
const tableContainer={
  fontSize:"14px",
  border:"0.5px solid rgb(200,200,200)",
}
const tRow={
  backgroundColor:"white",
  borderRadius:"15px"
}
const headerRow={
  backgroundColor:"rgb(235,235,235)",
  fontSize:"12px",
}
const tCell={
  padding:"10px",
  width:"20%",
  minWidth:"100px",
  textAlign:"left",
}
const tCellActions={
  display:"flex",
  gap:"10px",
  justifyContent:"flex-start",
  padding:"20px 10px",
  width:"20%",
  minWidth:"100px",
}
const status={
  padding:"5px 10px",
  borderRadius:"20px",
  fontWeight:500,
  fontSize:"13px",
  width:"fit-content"
}

const iconStyle={
  fontSize:"25px",
  color:"rgba(53, 44, 65, 0.67)",
}
const dataNotFound={
  display:"flex",
  alignItems:"center",
}

