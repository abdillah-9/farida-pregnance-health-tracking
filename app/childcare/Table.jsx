"use client"
import TableContainer, { TBody,THead,TH,TR,TD } from '@app/reusables/UI_components/Table/TableContainer'
import React from 'react'
import Icon from '@app/reusables/UI_components/Icon';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import { HiOutlinePencil, HiOutlineTrash } from '@node_modules/react-icons/hi2';
import { setReduxState } from '@app/provider/redux/reducer';
import { useDispatch } from '@node_modules/react-redux/dist/react-redux';

export default function Table({user, Childcare, pageRows,pageNumber}) {

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

    function editAction(ChildcareRow){
      dispatch(setReduxState({showForm: true, overlay: true ,fetchedFormData: ChildcareRow}))
      console.log("fetchedFormData after clicking edit icon "+JSON.stringify(ChildcareRow))
    }

    let created_date;
  
  return (
        <TableContainer styleTable={tableContainer}>
  <THead>
    <TR styleTR={{ ...tRow, ...headerRow }}>
      <TH styleTH={tCell}>CREATED DATE</TH>
      <TH styleTH={tCell}>BABY AGE (MONTHS)</TH>
      <TH styleTH={tCell}>GENDER</TH>
      <TH styleTH={tCell}>BIRTH WEIGHT (kg)</TH>
      <TH styleTH={tCell}>CURRENT WEIGHT (kg)</TH>
      <TH styleTH={tCell}>FEEDING TYPE</TH>
      <TH styleTH={tCell}>FEEDING FREQ/DAY</TH>
      <TH styleTH={tCell}>SLEEP HOURS</TH>
      <TH styleTH={tCell}>STATUS</TH>
      <TH styleTH={tCell}>ACTIONS</TH>
    </TR>
  </THead>

  <TBody>
    {
      console.log("page number is " + pageRows)
    }
    {
      Childcare
        ? Childcare.slice((pageNumber - 1) * pageRows, pageNumber * pageRows)
          .map(ChildcareRow => (
            <TR key={ChildcareRow.id} styleTR={tRow}>
              <TD styleTD={tCell}>
                {
                  new Date(ChildcareRow.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                }
              </TD>
              <TD styleTD={tCell}>{ChildcareRow.baby_age_month+" months" ?? "--"}</TD>
              <TD styleTD={tCell}>{ChildcareRow.gender ?? "--"}</TD>
              <TD styleTD={tCell}>{ChildcareRow.birth_weight >= 1 ? ChildcareRow.birth_weight+" kg" : "--"}</TD>
              <TD styleTD={tCell}>{ChildcareRow.current_weight+" kg" ?? "--"}</TD>
              <TD styleTD={tCell}>{ChildcareRow.feeding_type ?? "--"}</TD>
              <TD styleTD={tCell}>{ChildcareRow.feeding_frequency ?? "--"}</TD>
              <TD styleTD={tCell}>{ChildcareRow.sleep_hours >= 1 ? ChildcareRow.sleep_hours+" hrs" :"--"}</TD>
              <TD styleTD={tCell}>
                <div style={
                  ChildcareRow.status === "confirmed"
                    ? { ...status, ...confirmed }
                    : { ...status, ...unConfirmed }
                }>
                  {ChildcareRow.status}
                </div>
              </TD>
              <TD styleTD={tCellActions}>
                <Icon clickAction={() => editAction(ChildcareRow)} title={"edit"}>
                  <HiOutlinePencil />
                </Icon>
                <Icon clickAction={() => deleteAction(ChildcareRow.id)} title={"delete"}>
                  <HiOutlineTrash />
                </Icon>
              </TD>
            </TR>
          ))
        : (
          <TR>
            <TD styleTD={dataNotFound}><LoadingSpinner /></TD>
          </TR>
        )
    }
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

