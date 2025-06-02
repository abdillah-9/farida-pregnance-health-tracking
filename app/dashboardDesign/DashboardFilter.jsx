"use client"
import React, { useEffect, useState } from 'react'

export default function DashboardFilter({
    setStatsDuration,
    statsDuration,
    statsValues,
    setStatsValues,
    weeklyData,
    monthlyData,
    yearlyData,
    }){

    useEffect(()=>{
        if(statsValues?.length == 0 || !statsValues){
            setStatsValues(yearlyData)
        }
    },[])  

    function handleState(e){
        setStatsDuration(e.duration);
        setStatsValues(e.values)
    }

    return (
        <div style={styleFilterContainer}>
            <div style={statsDuration == "current year"? 
            {...optionStyle,  backgroundColor:"rgba(8, 161, 28, 0.76)", color:"white"} 
                : optionStyle} onClick={(e)=>handleState({"duration":"current year","values":yearlyData})}>
                Current year    
            </div>

            <div style={statsDuration == "Current month"? 
            {...optionStyle,  backgroundColor:"rgba(8, 161, 28, 0.76)", color:"white"} 
            : optionStyle} onClick={()=>handleState({"duration":"Current month","values":monthlyData})}>
                Current month    
            </div>

            <div style={statsDuration == "Current week"? 
            {...optionStyle,  backgroundColor:"rgba(8, 161, 28, 0.76)", color:"white"} 
            : optionStyle} onClick={()=>handleState({"duration":"Current week","values":weeklyData})}>
                Current week    
            </div>
        </div>
    )
}

//Css styles
const styleFilterContainer ={
    display:"flex",
    boxShadow:"2px 3px 15px rgb(4, 55, 65)",
    height:"fit-content",
}
const optionStyle ={
    display:"flex",
    padding:"10px",
    textAlign:"center",
    fontSize:"14px",
    cursor:"pointer",
}
