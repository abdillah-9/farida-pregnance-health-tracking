import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PregnancyBarChart from '../graphs/barGraph';
import ChildGrowthPieChart from '../graphs/piechartGraph';
import OvulationDashboard from './OvulationDashboard';
import { BsCalendar2Heart } from '@node_modules/react-icons/bs';
import Icon from '@app/reusables/UI_components/Icon';
import { PiBaby, PiBabyDuotone, PiBabyFill, PiBabyLight } from '@node_modules/react-icons/pi';
import { GiBabyBottle } from '@node_modules/react-icons/gi';
import { TbCalendarClock } from '@node_modules/react-icons/tb';
import { MdTimelapse } from '@node_modules/react-icons/md';

const container = {
  padding: '1rem',
  fontFamily: 'Arial, sans-serif'
};

const title = {
  fontSize: '17px',
  fontWeight: "bold",
  padding:"20px 0px 25px 0px",
  color:"rgba(61, 61, 61, 0.8)",
  textTransform:"uppercase",
};

const sectionTitle = {
  fontSize: '1.25rem',
  fontWeight: '600',
  margin: '2rem 0 1rem',
};

const grid = {
  display: 'flex',
  flexWrap:"wrap",
  justifyContent:"space-between",
  gap: '20px',
  padding:"20px",
  borderLeft:"2px solid rgba(73, 72, 72, 0.64)",
  margin:"0px 0px 30px 0px",
};

const card = {
  fontSize:"14px",
  display:"flex",
  gap:"15px",
  minWidth:"220px",
  padding: '15px',
  borderRadius: '5px',
  boxShadow: '3px 1px 15px rgba(0, 0, 0, 0.93)',
};
const miniCard ={
  color:"rgb(0, 121, 16)",
  display:"flex",
  flexDirection:"column",
}

const subtitle = {
  fontSize: '15px',
  fontWeight: "bold",
  marginBottom: '0.75rem',
  marginTop: '1rem'
};

const listItem = {
  padding: '10px',
  fontSize:"14px",
  fontWeight:"light",
  textAlign:"center",
  width:"100%",
  backgroundColor:"rgba(8, 161, 28, 0.76)",
  color:"rgba(250, 250, 250, 0.94)",
  borderRadius: '0.375rem',
};


const hint={
  fontSize:"14px",
  padding:"0px 0px 5px 0px",
}

const tipBox = {
  border: '1px solid #84cc16',
  display:"flex",
  flexWrap:"wrap",
  gap:"15px",
  backgroundColor: '#fff7ed',
  padding: '1rem',
  borderRadius: '0.5rem',
};

const ctaButton = {
  display: 'inline-block',
  marginTop: '1rem',
  padding: '0.75rem 1.25rem',
  backgroundColor: '#10b981',
  color: '#fff',
  border: 'none',
  borderRadius: '0.375rem',
  fontWeight: '600',
  cursor: 'pointer'
};

const chartContainer = {
  width: '100%',
  minHeight: "220px",
  display:"flex",
  flexDirection:"column",
  gap:"30px",
  marginBottom: '1rem'
};

const iconStyle={
  fontSize:"25px",
  color:"rgba(8, 161, 28, 0.76)",
  boxShadow: '1px 2px 7px rgba(2, 88, 13, 0.96)',
  height:"60px",
  borderRadius:"50%",
  width:"60px",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
}

export default function ChildcareDashboard({data, userData}) {
  console.log(data)
    if(data.length === 0){
      return <LoadingSpinner/>
  }
  //   if(data[0].last_period_date){
  //     return <OvulationDashboard data={data}/>
  // }
  //   if(data[0].pregnance_week){
  //     return <PregnancyDashboard data={data}/>
  // }

  //Calculate current child's age
  let prev_entry = {"prev_age":data.slice(-1)[0].baby_age_month,"prev_date":data.slice(-1)[0].created_at}
  let current_date = new Date();
  let date_difference = current_date - new Date(prev_entry.prev_date)
  let months_passed = date_difference/(1000*60*60*24*(365.25/12));
  let current_age_months = months_passed + prev_entry.prev_age
  let current_months = Math.floor(current_age_months % 12)
  let current_yrs = Math.floor(current_age_months / 12) 
  
  return (
    <div style={container}>
      <div style={title}>Currently tracking: Childcare</div>

      <div style={grid}>
        <div style={card}>
          <Icon iconStyle={iconStyle}><TbCalendarClock/></Icon>
          <div style={miniCard}>
            <strong>Baby's Age:</strong>
            <div>{ current_yrs+"yr(s) and "+current_months+" month(s)"}</div>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><PiBabyDuotone/></Icon>
          <div style={miniCard}>
            <strong>Childs' weight:</strong>
            <div>{data.slice(-1)[0].current_weight + " kg"}</div>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><GiBabyBottle/></Icon>
          <div style={miniCard}>
            <strong>Feeding type:</strong>
            <div> {data.slice(-1)[0].feeding_type} 😊 </div>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><MdTimelapse/></Icon>
          <div style={miniCard}>
            <strong>Feeding frequency: </strong>
            <div>{data.slice(-1)[0].feeding_frequency + " times a day"}</div>
          </div>
        </div>
      </div>

      <div style={{display:"flex", flexWrap:"wrap", gap:"20px", justifyContent:"space-between"}}>
        <div style={{width:"45%", minWidth:"200px", boxShadow:"1px 2px 10px rgba(50,50,50,1)", 
          display:"flex",flexDirection:"column",alignItems:"center", padding:"0px 15px",
          backgroundColorr:"rgba(8, 161, 28, 0.76)",}}>
          <div style={{...subtitle, color:"rgb(0, 121, 16)"}}>Recent Activity</div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem',paddingBottom:"15px"}}>
            {
            data.slice(-4)
            .map((entry, index) => (
              <li key={index} style={listItem}>
                {new  Date(entry.created_at).toLocaleDateString("en-Us",{
                  day:"numeric",
                  month:'short',
                  year:"numeric",
                  hour:"2-digit",
                  minute:"2-digit",
                  second:"numeric"
                })} - {"child current weight "+entry.current_weight+" kg"}
              </li>
            ))}
          </ul>
        </div>
        <div style={{width:"45%", minWidth:"200px",boxShadow:"1px 2px 10px rgba(50,50,50,1)",
           display:"flex",flexDirection:"column",alignItems:"center",padding:"0px 15px"
        }}>
          <div style={{...subtitle,color:"rgb(0, 121, 16)", }}>Meal VS current child weight piechart</div>
          <div style={chartContainer}>
            <ChildGrowthPieChart data={data.slice(-5)}/>
          </div>
        </div>
      </div>

      {/* Tips */}
      <h3 style={title}>Tips & Suggestions</h3>
      <div style={tipBox}>
        💡 <strong>Tip:</strong>
        <div>
          {
            userData?
            userData.hint.map((row, index)=>
            <div style={hint} key={index}>{row}</div>
            )
            :"no data"
          }
        </div>
      </div>

    </div>
  );
}
