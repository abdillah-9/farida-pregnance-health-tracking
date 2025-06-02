import React from 'react';
import LineGraph from '../graphs/lineGraph';

const container = {
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
  padding:"10px 15px",
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

const listItem = {
  padding: '0.75rem',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
};

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
  backgroundColor: '#fff7ed',
  border: '1px solid #facc15',
  padding: '1rem',
  borderRadius: '0.5rem',
  marginBottom: '1rem',
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

export default function OvulationDashboard({data}) {

    console.log("data in ovulation jsx "+JSON.stringify(data))
    const latestDataIndex = data.length - 1
  return (
    <div style={container}>
      {/* Title */}
      <div style={title}>Ovulation Tracker Overview</div>

      {/* Grid Stats */}
      <div style={grid}>
        <div style={card}>
            <strong>Name:</strong> <span>{data[data.length-1].name || "- - -"}</span>
        </div>
        <div style={card}>
            <strong>Age:</strong> <span>{data[latestDataIndex].age || "- - -"}</span>
        </div>
        <div style={card}>
            <strong>Last Period:</strong> 
            <span>{data[latestDataIndex].last_period_date || "- - -"}</span>
        </div>
        <div style={card}>
            <strong>Cycle Length:</strong> 
            <span>{data[latestDataIndex].cycle_length_days || "- - -"}</span>
        </div>
        <div style={card}>
            <strong>Period Duration:</strong> <span>{data[latestDataIndex].cycle_length_days}</span>
        </div>
        <div style={card}>
            <strong>Regular Cycle:</strong> <span>{
            data[latestDataIndex].cycle_length_days ? "YES" : "NO"
            }</span>
        </div>
        <div style={card}>
            <strong>Stress Level:</strong> <span>{data[latestDataIndex].stress_level || "- - -"}</span>
        </div>
        <div style={card}>
            <strong>Sleep Hours:</strong> <span>{data[latestDataIndex].sleep_hours || "- - -"}</span>
        </div>
        <div style={card}>
            <strong>Exercise Days/Week:</strong> 
            <span>
                {
                    data[latestDataIndex].day_week_exercise || "- - -"
                }
            </span>
        </div>
        <div style={card}>
            <strong>Diagnosed Conditions:</strong> 
            <span>{
                data[latestDataIndex].diagnised_conditions || "- - -"  
            }</span>
        </div>
        <div style={card}>
            <strong>Status:</strong><span>{data[latestDataIndex].status}</span>
        </div>
      </div>

      {/* Graph */}
      <h3 style={title}>Ovulation Trends (Graph)</h3>
      <div style={{...graphPlaceholder, height:"400px"}}>
        <LineGraph data={data}/>
      </div>

      {/* Recent Activity */}
      <h3 style={title}>Recent Activity</h3>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li style={listItem}>🩸 Jan 5, 2025 - Period Started</li>
        <li style={listItem}>🔬 Jan 12, 2025 - Ovulation Logged</li>
        <li style={listItem}>📅 Feb 9, 2025 - Next Expected Ovulation</li>
      </ul>

      {/* Tips */}
      <h3 style={title}>Tips & Suggestions</h3>
      <div style={tipBox}>
        💡 <strong>Tip:</strong> Aim for 7–9 hours of sleep and track stress levels for better hormonal balance.
      </div>

      {/* CTA
      <button style={ctaButton}>+ Add New Entry</button> */}
    </div>
  );
}
