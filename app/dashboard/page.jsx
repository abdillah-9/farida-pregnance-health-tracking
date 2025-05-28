"use client"
import React, { useState } from 'react'
import DashboardFilter from './DashboardFilter'
import useUser from '@app/authentication/hooks/useUser';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';

export default function page() {
    const {user} = useUser();
    const [statsDuration, setStatsDuration] = useState("current year");

    if(!user){
      return (
        <LoadingSpinner/>
      )
    }

  return (
    <div>
      <div style={header}>
        <div style={heading}>Dashboard</div>
        <DashboardFilter setStatsDuration={setStatsDuration} statsDuration={statsDuration} />
      </div>
       
    </div>
  )
}

//CSS
const header={
  display:"flex",
  justifyContent:"space-between",
  width:"100%",
}
const heading={
  fontSize:"20px",
  fontWeight:500,
}
