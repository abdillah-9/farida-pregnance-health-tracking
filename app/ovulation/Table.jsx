"use client"
import TableContainer, { TBody,THead,TH,TR,TD } from '@app/reusables/UI_components/Table/TableContainer'
import React from 'react'
import Icon from '@app/reusables/UI_components/Icon';
import { RiCameraOffLine } from '@node_modules/react-icons/ri';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import { HiOutlinePencil, HiOutlineTrash } from '@node_modules/react-icons/hi2';
import { setReduxState } from '@app/provider/redux/reducer';
import { useDispatch } from '@node_modules/react-redux/dist/react-redux';
import toast from '@node_modules/react-hot-toast/dist';
import { IoWarning } from '@node_modules/react-icons/io5';

export default function Table({user, ovulation, pageRows,pageNumber}) {

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

    function editAction(ovulationRow){
      dispatch(setReduxState({showForm: true, overlay: true ,fetchedFormData: ovulationRow}))
      console.log("fetchedFormData after clicking edit icon "+JSON.stringify(ovulationRow))
    }

    let created_date;
  
  return (
        <TableContainer styleTable={tableContainer}>
          <THead>
            <TR styleTR={{...tRow,...headerRow}}>
              <TH styleTH={tCell}>CREATED DATE</TH>
              <TH styleTH={tCell}>AGE</TH>
              <TH styleTH={tCell}>LAST PERIOD</TH>
              <TH styleTH={tCell}>CYCLE LENGTH</TH>
              <TH styleTH={tCell}>PERIOD DURATION</TH>
              <TH styleTH={tCell}>CYCLE REGULARITY</TH>
              <TH styleTH={tCell}>STRESS LEVEL</TH>
              <TH styleTH={tCell}>SLEEPING HOURS</TH>
              {/* <TH styleTH={tCell}>WEEK/DAY EXERCISES</TH> */}
              <TH styleTH={tCell}>STATUS</TH>
              <TH styleTH={tCell}>ACTIONS</TH>
            </TR>
          </THead>
           <TBody>
            {
              console.log("page number is "+pageRows)
            }
            {  
              ovulation ? ovulation.slice((pageNumber - 1) * pageRows, pageNumber * pageRows)
              .map(ovulationRow=>
                <TR key={ovulationRow.id} styleTR={tRow}>
                  <TD styleTD={tCell}> 
                    { 
                      created_date = new Date(ovulationRow.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year:"numeric"
                      }) 
                    } 
                  </TD>
                  <TD styleTD={tCell}>{ovulationRow.age}</TD>
                  <TD styleTD={tCell}>
                    {
                      new Date(ovulationRow.last_period_date).toLocaleDateString("en-US",{
                        month:"short",
                        day:"2-digit",
                        year:"numeric"
                      })
                    }
                  </TD>
                  <TD styleTD={tCell}>{ovulationRow.cycle_length_days}</TD>
                  <TD styleTD={tCell}>{ovulationRow.period_duration_days}</TD>
                  <TD styleTD={tCell}>
                    {
                      ovulationRow.is_cycle_regular ? "YES" : "NO"
                    }
                  </TD>
                  <TD styleTD={tCell}>{ovulationRow.stress_level}</TD>
                  <TD styleTD={tCell}>
                    {
                      ovulationRow.sleep_hours === 0 ? "--": ovulationRow.sleep_hours
                    }
                  </TD>
                  {/* <TD styleTD={tCell}>{ovulationRow.day_week_exercise}</TD> */}
                  <TD styleTD={tCell}>
                    <div style={ovulationRow.status == "confirmed" ?
                      {...status, ...confirmed} : {...status, ...unConfirmed}}>{ovulationRow.status}</div>
                  </TD>
                  <TD styleTD={tCellActions}>
                    <Icon clickAction={()=>editAction(ovulationRow)} title={"edit"}>
                      <HiOutlinePencil/>
                    </Icon>
                    <Icon clickAction={()=>deleteAction(ovulationRow.id)} title={"delete"}>
                      <HiOutlineTrash/>
                    </Icon>
                  </TD>
                </TR>
            ) : <TR><TD styleTD={dataNotFound}><LoadingSpinner/></TD></TR>
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

