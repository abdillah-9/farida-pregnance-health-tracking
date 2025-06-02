import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PregnancyBarChart from '../graphs/barGraph';
import ChildGrowthPieChart from '../graphs/piechartGraph';

const container = {
  padding: '1rem',
  fontFamily: 'Arial, sans-serif'
};

const title = {
  fontSize: '17px',
  fontWeight: 500,
  padding:"40px 0px 25px 0px",
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
  gap: '20px',
  justifyContent:"space-between",
  padding:"15px",
  marginBottom:"30px",
  borderLeft:"2px solid rgba(73, 72, 72, 0.64)",
};

const card = {
  fontSize:"14px",
  display:"flex",
  flexDirection:"column",
  gap:"5px",
  width:"180px",
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '3px 1px 15px rgba(0, 0, 0, 0.93)',
};

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  marginBottom: '1.5rem'
};

const subtitle = {
  fontSize: '15px',
  fontWeight: "bold",
  marginBottom: '0.75rem',
  marginTop: '1rem'
};

const listItem = {
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const tipBox = {
  backgroundColor: '#ecfccb',
  border: '1px solid #84cc16',
  padding: '1rem',
  borderRadius: '0.5rem',
  marginBottom: '1rem'
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
  height: 200,
  marginBottom: '1rem'
};

export default function ChildcareDashboard({data}) {
  const s = [
    { created_at: '2025-04-01', activity: 'Bottle feeding' },
    { created_at: '2025-04-02', activity: 'Diaper change' },
    { created_at: '2025-04-03', activity: 'Nap logged' }
  ];

  const chartData = [
    { day: 'Mon', hours: 12 },
    { day: 'Tue', hours: 10 },
    { day: 'Wed', hours: 14 }
  ];

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
      <h2 style={title}>Currently tracking: Childcare - Baby is 6 months old</h2>

      <div style={grid}>
        <div style={card}>
          <strong>Baby's Age:</strong><div>{ current_yrs+"yr(s) and "+current_months+" months"}</div>
        </div>
        <div style={card}><strong>Last Activity:</strong><div>nap logged</div></div>
        <div style={card}><strong>Recent Milestone:</strong><div>first smile 😊</div></div>
        <div style={card}><strong>Growth Tracking:</strong><div>Ongoing</div></div>
      </div>

      <div style={{display:"flex", flexWrap:"wrap", gap:"20px", justifyContent:"space-between"}}>
        <div style={{width:"45%", minWidth:"200px", boxShadow:"1px 2px 10px rgba(50,50,50,1)", 
          display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{...subtitle}}>Recent Activity</div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem',paddingBottom:"15px",
           }}>
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
          <div style={{...subtitle }}>Meal VS current child weight piechart</div>
          <div style={chartContainer}>
            <ChildGrowthPieChart data={data.slice(-4)}/>
          </div>
        </div>
      </div>

      <h3 style={subtitle}>Tips & Suggestions</h3>
      <div style={tipBox}>
        👶 <strong>Tip:</strong> How to introduce solid foods
      </div>

      {/* <button style={ctaButton}>+ Add Entry</button> */}
    </div>
  );
}
