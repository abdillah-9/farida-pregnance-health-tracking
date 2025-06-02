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
 
     return (
         <div style={{height:"67vh", overflow:"auto"}}>
             {/* {
             latestData.category == "ovulation" &&
             <OvulationDashboard data={data.ovulation}/>
                 ||
             latestData.category == "pregnance" &&
             <PregnancyDashboard data={data.pregnance} />
                 ||
             latestData.category == "childcare" &&
             <ChildcareDashboard data={data.childcare} />
             } */}

            {
             latestData.category == "childcare" &&
             <OvulationDashboard data={data.ovulation}/>
            }
            {
             latestData.category == "childcare" &&
             <PregnancyDashboard data={data.pregnance} />
            }
            {
             latestData.category == "childcare" &&
             <ChildcareDashboard data={data.childcare} />
            }
             
         </div>
     );
 }
 