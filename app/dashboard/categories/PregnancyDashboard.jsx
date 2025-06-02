import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChildGrowthPieChart from '../graphs/piechartGraph';
import PregnancyBarChart from '../graphs/barGraph';

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

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  marginBottom: '1.5rem'
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

const subtitle = {
  fontSize: '1.125rem',
  fontWeight: '500',
  marginBottom: '0.75rem',
  marginTop: '1rem'
};

// const listItem = {
//   padding: '0.75rem',
//   border: '1px solid #ccc',
//   borderRadius: '0.375rem',
//   boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// };
const miniTitle={
  fontSize:"15px",
  display:"flex",
  gap:"20px",
  flexWrap:"wrap",
  padding:"0px 0px 10px 0px"
}

const tipBox = {
  backgroundColor: '#fff1f2',
  border: '1px solid #fb7185',
  padding: '1rem',
  borderRadius: '0.5rem',
  marginBottom: '1rem'
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
  height: 200,
  marginBottom: '1rem'
};

function getMostFrequentSymptom(data) {
  const freq = {};
  data.forEach(({ symptom }) => {
    freq[symptom] = (freq[symptom] || 0) + 1;
  });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  return sorted.length ? sorted[0][0] : null;
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

export default function PregnancyDashboard({data}) {
  const datas = [
    { week: 'Week 16', symptom: 'Nausea', created_at: '2025-03-10' },
    { week: 'Week 17', symptom: 'Fatigue', created_at: '2025-03-17' },
    { week: 'Week 18', symptom: 'Back Pain', created_at: '2025-03-24' }
  ];

  const chartData = [
    { week: 16, weight: 60 },
    { week: 17, weight: 61 },
    { week: 18, weight: 62 }
  ];

  // Find most frequent symptom
  const mostFrequentSymptom = getMostFrequentSymptom(data);

  // Get latest symptom entry
  const latestEntry = data[data.length - 1];

  // Generate tip based on latest symptom or fallback
  const tip = getTipBasedOnSymptom(latestEntry?.symptom);

  return (
    <div style={container}>
      <h2 style={title}>Currently tracking: Pregnancy – Week 18</h2>

      <div style={grid}>
        <div style={card}>
          <strong>Current Week:</strong></div>
        <div style={card}>
          <strong>Due Date:</strong> <span>Aug 5, 2025</span></div>
        <div style={card}>
          <strong>Trimester:</strong><span>2nd</span></div>
        <div style={card}>
          <strong>Logged Symptoms:</strong><span>{data.length} entries</span></div>
      </div>

      <div style={title}>Recent Activity</div>

      <div style={miniTitle}>
        <strong>Most frequent symptom:</strong> {mostFrequentSymptom || 'No data'}
      </div>
      <div style={miniTitle}>
        <strong>Latest symptom:</strong> 
        <div>{latestEntry ? `${latestEntry.created_at} – ${latestEntry.symptom}` : 'No recent activity'}</div>
      </div>

      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {data.map((entry, index) => (
          <li key={index} style={listItem}>
            {entry.created_at} – {entry.symptom}
          </li>
        ))}
      </ul>

      <h3 style={title}>Weight Gain Over Time</h3>
      <div style={chartContainer}>
        <PregnancyBarChart data={data}/>
      </div>

      <h3 style={subtitle}>Tips & Suggestions</h3>
      <div style={tipBox}>
        🤰 <strong>Tip:</strong> {tip}
      </div>

      {/* <button style={ctaButton}>+ Add Entry</button> */}
    </div>
  );
}
