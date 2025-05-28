"use client"
import React, { useState } from 'react'

export default function DashboardFilter(
    {allTimeStats, setStatsDuration, statsDuration}
){

    function handleState(e){
        setStatsDuration(e);
    }

    return (
        <div style={styleFilterContainer}>
            <div style={statsDuration == "current year"? 
            {...optionStyle,  backgroundColor:"rgba(8, 161, 28, 0.76)", color:"white"} 
            : optionStyle} onClick={(e)=>handleState(e="current year")}>
                Current year    
            </div>

            <div style={statsDuration == "Current month"? 
            {...optionStyle,  backgroundColor:"rgba(8, 161, 28, 0.76)", color:"white"} 
            : optionStyle} onClick={()=>handleState("Current month")}>
                Current month    
            </div>

            <div style={statsDuration == "Current week"? 
            {...optionStyle,  backgroundColor:"rgba(8, 161, 28, 0.76)", color:"white"} 
            : optionStyle} onClick={()=>handleState("Current week")}>
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
