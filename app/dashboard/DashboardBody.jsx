import React from 'react'
import ChildcareDashboard from "./categories/ChildcareDashboard.jsx";
import OvulationDashboard from "./categories/OvulationDashboard";
import PregnancyDashboard from "./categories/PregnancyDashboard";

export default function DashboardBody({statsValues}) {
 const data =
         statsValues?.ovulationYearly ? {
             "ovulation": statsValues.ovulationYearly,
             "pregnance": statsValues.pregnanceYearly,
             "childcare": statsValues.childcareYearly
         } :
         statsValues?.ovulationMonthly ? {
             "ovulation": statsValues.ovulationMonthly,
             "pregnance": statsValues.pregnanceMonthly,
             "childcare": statsValues.childcareMonthly
         } : {
             "ovulation": statsValues?.ovulationWeekly || [],
             "pregnance": statsValues?.pregnanceWeekly || [],
             "childcare": statsValues?.childcareWeekly || []
         };
 
     // Helper to get the latest created_at from an array
     const getLatestDate = (arr) => {
         return arr.reduce((latest, item) => {
            const current = new Date(item.created_at);
            return current > latest ? current : latest;
         }, new Date(0)); // epotch time ie 1970
     };
 
     const latestOvulationDate = {"category":"ovulation","date":getLatestDate(data.ovulation)};
     const latestPregnanceDate = {"category":"pregnance","date":getLatestDate(data.pregnance)};
     const latestChildcareDate = {"category":"childcare","date":getLatestDate(data.childcare)};
     // Put them in an array
     const dates = [latestOvulationDate, latestPregnanceDate, latestChildcareDate];
     // Find the latest by sorting descending and picking the first
     const latestData = dates.sort((a, b) => b.date - a.date)[0];
     console.log("latestData "+JSON.stringify(latestData));
 
     return (
         <div style={{height:"67vh", overflow:"auto",  boxShadow: '1px 2px 10px rgba(50,50,50,1)',}}>
            {
             latestData.category === "ovulation" &&
             <OvulationDashboard key={"ovulation"} data={data.ovulation}/>
            }
            {
             latestData.category === "pregnance" &&
             <PregnancyDashboard key={"pregnance"} data={data.pregnance} />
            }
            {
             latestData.category === "childcare" &&
             <PregnancyDashboard key={"childcare"} data={data.childcare} />
            }
             
         </div>
     );
 }
 