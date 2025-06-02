"use client"
import React, { useEffect, useState } from 'react'
import DashboardFilter from './DashboardFilter'
import useUser from '@app/authentication/hooks/useUser';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import { getOvulationData } from '@utils/apiOvulation';
import { getPregnanceData } from '@utils/apiPregnance';
import { getChildcareData } from '@utils/apiChildcare';
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy';
import DashboardBody from './DashboardBody';

export default function page() {
    const {user} = useUser();

    const {isLoading: ovulationLoading, data: ovulation} =  useQuery({
      queryKey: ['ovulationData'],
      queryFn: getOvulationData
    });

    const {isLoading: PregnanceLoading, data: Pregnance } =  useQuery({
      queryKey: ['pregnance'],
      queryFn: getPregnanceData
    });

    const {isLoading: ChildcareLoading, data: Childcare } =  useQuery({
      queryKey: ['childcareData'],
      queryFn: getChildcareData
    });

    const [statsDuration, setStatsDuration] = useState("current year");
    const [statsValues, setStatsValues] = useState([]);

    // DISPLAY LOADING SPINNER DURING DATA FETCHING
    useEffect(
      ()=>{
        if(!user || !ovulation || !Pregnance || !Childcare ){
          return 
        }
      }
    ,[user, ovulation, Pregnance, Childcare])

    if( ovulationLoading || PregnanceLoading || ChildcareLoading ){
      return <LoadingSpinner/>
    }

    // FILTER THOSE DATA BASED ON FILTER COMPONENT (current year, current month, current week)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // This is hot it needs several lines of codes //
    const dateOfToday = new Date().getDate(); // eg 21, 09, 01 e.t.c
    const currentday = new Date().getDay();
    let diffToMonday = 0;
    if(currentday === 0){
      diffToMonday = 6
    }
    else if(currentday === 1){
      diffToMonday = 0
    }
    else{
      diffToMonday = currentday - 1
    }
    const startOfWeek = new Date();
    const endOfWeek = new Date();
    startOfWeek.setDate(dateOfToday - diffToMonday)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    console.log("startOfWeek "+ startOfWeek) 
    console.log("endOfWeek "+ endOfWeek) 
    console.log("diffToMonday "+ diffToMonday) 
    console.log("dateOfToday "+ dateOfToday)
    console.log("current year "+currentYear)
    console.log("current month "+currentMonth)
     

    /* Filter based on current week */ 
    //OVULATION
    const ovulationWeekly = ovulation.filter((row)=>row.userID == user.id)
    .filter((row)=>
      new Date(row.created_at) >= startOfWeek &&
      new Date(row.created_at) <= endOfWeek
    )
    //PREGNANCE
    const pregnanceWeekly = Pregnance.filter((row)=>row.userID == user.id)
    .filter((row)=>
      new Date(row.created_at) >= startOfWeek &&
      new Date(row.created_at) <= endOfWeek
    )
    //CHILDCARE
    const childcareWeekly = Childcare.filter((row)=>row.userID == user.id)
    .filter((row)=>
      new Date(row.created_at) >= startOfWeek &&
      new Date(row.created_at) <= endOfWeek
    )
    //SET OBJ CONTAINING ALL OF THEM
    const weeklyData = {ovulationWeekly, pregnanceWeekly, childcareWeekly}

    console.log("ovulation Weekly "+JSON.stringify(ovulationWeekly))
    console.log("preg Weekly "+JSON.stringify(pregnanceWeekly))
    console.log("Childcare Weekly "+JSON.stringify(childcareWeekly))

    /* Filter based on current month */
    //OVULATION
    const ovulationMonthly = ovulation.filter((row)=> row.userID === user.id).
    filter((row)=> row.created_at.slice(5,7) == currentMonth + 1 )
    //PREGNANCE
    const pregnanceMonthly = Pregnance.filter((row)=> row.userID === user.id).
    filter((row)=> row.created_at.slice(5,7) == currentMonth + 1 )
    //CHILDCARE
    const childcareMonthly = Childcare.filter((row)=> row.userID === user.id).
    filter((row)=> row.created_at.slice(5,7) == currentMonth + 1 )

    //SET OBJ CONTAINING ALL OF THEM
    const monthlyData = {ovulationMonthly, pregnanceMonthly, childcareMonthly}

    console.log("ovulation monthly "+JSON.stringify(ovulationMonthly))
    console.log("preg monthly "+JSON.stringify(pregnanceMonthly))
    console.log("Childcare monthly "+JSON.stringify(childcareMonthly))

    /* Filter based on current year */
    //OVULATION
    const ovulationYearly = ovulation.filter((row)=> row.userID === user.id).
    filter((row)=> row.created_at.slice(0,4) == currentYear )
    //PREGNANCE
    const pregnanceYearly = Pregnance.filter((row)=> row.userID === user.id).
    filter((row)=> row.created_at.slice(0,4) == currentYear )
    //CHILDCARE
    const childcareYearly = Childcare.filter((row)=> row.userID === user.id).
    filter((row)=> row.created_at.slice(0,4) == currentYear )

    //SET OBJ CONTAINING ALL OF THEM 
    const yearlyData = {ovulationYearly, pregnanceYearly, childcareYearly}

    console.log("ovulation Yearly "+JSON.stringify(ovulationYearly))
    console.log("preg Yearly "+JSON.stringify(pregnanceYearly))
    console.log("Childcare Yearly "+JSON.stringify(childcareYearly))
    console.log("row.created_at.slice(0,3) "+ovulation[0].created_at.slice(5,7))


  return (
    <div>
      {/* DASHBOARD HEADING */}
      <div style={header}>
        <div style={heading}>Dashboard</div>
        <DashboardFilter 
          setStatsDuration={setStatsDuration} 
          statsDuration={statsDuration} 
          statsValues={statsValues}
          setStatsValues={setStatsValues}
          weeklyData={weeklyData}
          monthlyData={monthlyData}
          yearlyData={yearlyData}
        />
      </div>

      {/* DASHBOARD BODY */}
      <div>
        <DashboardBody statsValues={statsValues}/>
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
