import React from 'react';
import PregnancyBarChart from '../graphs/barGraph';
import Icon from '@app/reusables/UI_components/Icon';
import { MdOutlineSick } from '@node_modules/react-icons/md';
import { BsCalendar2Heart, BsCalendarCheck } from '@node_modules/react-icons/bs';
import { RiTimerLine } from '@node_modules/react-icons/ri';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import ChildcareDashboard from './ChildcareDashboard.jsx';
import OvulationDashboard from './OvulationDashboard';

const container = {
  padding: '0px 1rem',
  fontFamily: 'Arial, sans-serif'
};

const title = {
  fontSize: '17px',
  fontWeight: "bold",
  padding:"20px 0px 25px 0px",
  color:"rgba(61, 61, 61, 0.8)",
  textTransform:"uppercase",
};

const grid = {
  display: 'flex',
  flexWrap:"wrap",
  justifyContent:"space-between",
  gap: '20px',
  padding:"20px",
  borderLeft:"2px solid rgba(73, 72, 72, 0.64)",
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
  borderRadius: '0.375rem',
};

const subtitle = {
  fontSize: '1.125rem',
  fontWeight: '500',
  marginBottom: '0.75rem',
  marginTop: '1rem'
};

const miniTitle={
  fontSize:"15px",
  display:"flex",
  gap:"20px",
  flexWrap:"wrap",
  padding:"0px 0px 10px 0px"
}

const hint={
  fontSize:"14px",
  padding:"0px 0px 5px 0px",
}

const tipBox = {
  border: '1px solid #fb7185',
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
  backgroundColor: '#db2777',
  color: '#fff',
  border: 'none',
  borderRadius: '0.375rem',
  fontWeight: '600',
  cursor: 'pointer'
};

const chartContainer = {
  width: '100%',
  height: "400px",
  marginBottom: '1rem'
};
const ul_cards={
  borderRadius: '0.375rem',
  boxShadow: '1px 2px 10px rgba(50,50,50,1)',
  padding:"12px",  
  fontSize:"14px",
}

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

function getTipBasedOnSymptom(symptom) {
  switch (symptom) {
    case 'Nausea':
      return 'Try eating smaller, frequent meals to help with nausea.';
    case 'Fatigue':
      return 'Make sure to get plenty of rest and stay hydrated.';
    case 'Back Pain':
      return 'Maintain good posture and consider prenatal yoga or stretches.';
    default:
      return 'Remember to listen to your body and consult your doctor if needed.';
  }
}

export default function PregnancyDashboard({data, userData}) {
  console.log(data)
    if (!data || data.length === 0 || !data.slice(-1)[0]?.created_at) {
      return <LoadingSpinner />;
  }
  //   if(data[0].gender){
  //     return <ChildcareDashboard data={data}/>
  // }
  //   if(data[0].sleep_hours){
  //     return <OvulationDashboard data={data}/>
  // }

  console.log("created_at issue "+data.slice(-1)[0].created_at)
  // Generate tip based on latest symptom or fallback
  //const tip = getTipBasedOnSymptom(latestEntry?.symptom);

  //Get current week, weeks passed , due_date, symptoms , latest symptom, all symptoms
  let prev_entry = {"prev_date":data.slice(-1)[0].created_at}
  let created_date = new Date(prev_entry.prev_date)
  let current_date = new Date();
  let date_difference = current_date - new Date(prev_entry.prev_date)
  let weeks_passed = Math.floor(date_difference/(1000*60*60*24*7));
  let due_date = new Date(created_date.getTime() + 40*(1000*60*60*24*7))
  due_date = due_date.toLocaleDateString("en-Us",{
    year:"numeric",
    month:"short",
    day:"numeric"
  })
  let trimester = weeks_passed+1 <= 12 ? "first trimester" : 13 <= weeks_passed+1 <= 26 ? "second trimester" :
                  weeks_passed+1 >= 27 ? "third trimester" :""
  let symptoms_freq = data.filter((row)=>row.symptoms != "").length
  let latest_symptom = data.filter((row)=>row.symptoms).slice(-1)

  return (
    <div style={container}>
      <div style={title}>Currently tracking: Pregnancy - Week {weeks_passed+1}</div>

      <div style={grid}>
        <div style={card}>
          <Icon iconStyle={iconStyle}><BsCalendar2Heart/></Icon>
          <div style={miniCard}>
            <strong>Current Week:</strong> <span>{"week "} {weeks_passed+1}</span>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><BsCalendarCheck/></Icon>
          <div style={miniCard}>
            <strong>Due Date:</strong> <span>{due_date}</span>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><RiTimerLine/></Icon>
          <div style={miniCard}>
            <strong>Trimester:</strong><span>{trimester}</span>
          </div>
        </div>
        <div style={card}>
          <Icon iconStyle={iconStyle}><MdOutlineSick /></Icon>
          <div style={miniCard}>
            <strong>Logged Symptoms:</strong><span>{symptoms_freq} entries</span>
          </div>
        </div>
      </div>

      <div style={title}>Recent Activity</div>
      <div style={{display:"flex", flexWrap:"wrap", gap:"20px", justifyContent:"space-between"}} >
        <div style={{width:"45%", minWidth:"200px", boxShadow:"1px 2px 10px rgba(50,50,50,1)", 
            display:"flex",flexDirection:"column",alignItems:"center", gap:"0px", padding:"15px 0px",
              backgroundColor:"rgba(8, 161, 28, 0.76)",}}>
          <strong style={{color:"rgb(1, 41, 7)"}}>Latest symptom</strong>
          <ul style={{display: 'flex', flexDirection: 'column', gap: '20px',padding:"15px",width:"100%"}}>
              <div style={ul_cards}>
                <strong>{"Date: "}</strong> 
                {
                  latest_symptom[0] ?
                  new Date(latest_symptom[0].created_at).toLocaleDateString("en-Us",{
                          year:"numeric", hour:"numeric",
                          month:"short", minute:"numeric",
                          day:"numeric", second:"numeric"
                  }) : "No recent symptom recorded"
                }
              </div>
              <div style={ul_cards}>
                <strong>{"Symptom: "}</strong>
                {
                  latest_symptom[0] ?
                  latest_symptom[0].symptoms : "---"
                }
              </div>
              <div style={ul_cards}>
                <strong>{"Pregnance week: "}</strong>
                {
                  latest_symptom[0] ?
                  latest_symptom[0].pregnance_week : "---"
                }
              </div>
              <div style={ul_cards}>
                <strong>{"Number of featus: "}</strong>
                {
                  latest_symptom[0] ?
                  latest_symptom[0].featus_number : "---"
                }
              </div>
          </ul>
        </div>

        <div style={{width:"45%", minWidth:"200px", boxShadow:"1px 2px 10px rgba(50,50,50,1)", 
            display:"flex",flexDirection:"column",alignItems:"center", gap:"15px", padding:"15px 0px"}}>
          <strong style={{color: "rgba(2, 68, 11, 0.76)"}}>Latest entries</strong> 
          <ul style={{display: 'flex', flexDirection: 'column', gap: '20px',paddingBottom:"15px",width:"90%"}}>
            {data.slice(-4).map((entry, index) => (
              <li key={index} style={listItem}>
                {new Date(entry.created_at).toLocaleDateString("en-Us",{
                      year:"numeric", hour:"numeric",
                      month:"short", minute:"numeric",
                      day:"numeric", second:"numeric"
                })} - {entry.symptoms || "no symptoms recorded"}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 style={title}>Pregnance progress Over Time</h3>
      <div style={chartContainer}>
        <PregnancyBarChart data={data.slice(-5)}/>
      </div>

      {/* Tips */}
      <h3 style={title}>Tips & Suggestions</h3>
      <div style={tipBox}>
        💡 <strong>Tip:</strong>
        <div>
          {
            userData?
            // userData.hint.map((row, index)=>
            // <div style={hint} key={index}>{row}</div>
            // )
            "userdata"
            :"no data"
          }
        </div>
      </div>

      {/* <button style={ctaButton}>+ Add Entry</button> */}
    </div>
  );
}
