import React from 'react';
import LineGraph from '../graphs/lineGraph';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import PregnancyDashboard from './PregnancyDashboard';
import Icon from '@app/reusables/UI_components/Icon';
import { BsCalendar2Heart, BsDropletFill, BsDropletHalf, BsPersonBadge } from '@node_modules/react-icons/bs';
import { TbCalendarUp, TbCircleDashed } from '@node_modules/react-icons/tb';
import { GiCircleClaws, GiDroplets, GiEncirclement, GiStopwatch } from '@node_modules/react-icons/gi';

const container = {
    padding:"1rem"
};

const title = {
  fontSize: '17px',
  fontWeight: 500,
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
};

const hint={
  fontSize:"14px",
  padding:"0px 0px 5px 0px",
}
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
  display:"flex",
  flexDirection:"column",
}

const listItem = {
  padding: '10px',
  fontSize:"14px",
  fontWeight:"light",
  textAlign:"center",
  width:"100%",
  backgroundColor:"rgba(8, 161, 28, 0.76)",
  color:"white",
}

const graphPlaceholder = {
  height: '200px',
  backgroundColor: '#f0f0f0',
  borderRadius: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#888',
  fontSize: '1rem',
  marginBottom: '2rem',
};

const tipBox = {
  display:"flex",
  flexWrap:"wrap",
  gap:"15px",
  backgroundColor: '#fff7ed',
  border: '1px solid #facc15',
  padding: '1rem',
  borderRadius: '0.5rem',
};

const ctaButton = {
  display: 'inline-block',
  marginTop: '1rem',
  padding: '0.75rem 1.25rem',
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: '0.375rem',
  fontWeight: '600',
  cursor: 'pointer',
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

export default function OvulationDashboard({data, userData}) {
    console.log(data)
    if(data.length == 0){
        return <div>Currently there's no data</div>
    }
    // if(data[0].gender){
    //   return <ChildcareDashboard data={data}/>
    // }
    // if(data[0].pregnance_week){
    //   return <PregnancyDashboard data={data}/>
    // }

    console.log("data in ovulation jsx "+JSON.stringify(data))
    const latestDataIndex = data.length - 1
  return (
    <div style={container}>
      {/* Title */}
      <div style={title}>Ovulation Tracker Overview</div>

      {/* Grid Stats */}
      <div style={grid}>
        <div style={card}>
          <Icon iconStyle={iconStyle}><BsPersonBadge/></Icon>
          <div style={miniCard}>
            <strong style={{color:"rgb(1, 41, 7)"}}>Age:</strong> 
            <span>{data[latestDataIndex]?.age || "- - -"}</span>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><GiDroplets/></Icon>
          <div style={miniCard}>
            <strong style={{color:"rgb(1, 41, 7)"}}>Last Period:</strong> 
            <span>{data[latestDataIndex]?.last_period_date || "- - -"}</span>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><GiEncirclement/></Icon>
          <div style={miniCard}>
            <strong style={{color:"rgb(1, 41, 7)"}}>Cycle Length:</strong> 
            <span>{data[latestDataIndex]?.cycle_length_days || "- - -"}</span>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><GiStopwatch/></Icon>
          <div style={miniCard}>
            <strong style={{color:"rgb(1, 41, 7)"}}>Period Duration:</strong> 
            <span>{data[latestDataIndex]?.period_duration_days}</span>
          </div>
        </div>
        {/* <div style={card}>
          <Icon iconStyle={iconStyle}><BsCalendar2Heart/></Icon>
          <div style={miniCard}>
            <strong style={{color:"rgb(1, 41, 7)"}}>Expected upcoming period:</strong> 
            <span>
                {
                    data[latestDataIndex]?.cycle_length_days ? "YES" : "NO"
                }
            </span>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><BsCalendar2Heart/></Icon>
          <div style={miniCard}>
            <strong style={{color:"rgb(1, 41, 7)"}}>Regular Cycle:</strong> 
            <span>
                {
                    data[latestDataIndex]?.cycle_length_days ? "YES" : "NO"
                }
            </span>
          </div>
        </div> */}
      </div>

      {/* Graph */}
      <h3 style={title}>Ovulation Trends (Graph)</h3>
      <div style={{...graphPlaceholder, height:"400px"}}>
        <LineGraph data={data}/>
      </div>

      {/* Recent Activity */}
<h3 style={title}>Menstrual details</h3>
<ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
  <li style={listItem}>📅 {userData.predicted_ovulation_date || "N/A"} - Next Expected Ovulation</li>
  <li style={listItem}>🩸 {userData.predicted_next_period_date || "N/A"} - Next Expected Period</li>
</ul>


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

      {/* CTA
      <button style={ctaButton}>+ Add New Entry</button> */}
    </div>
  );
}
