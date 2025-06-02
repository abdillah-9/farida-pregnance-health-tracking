import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChildGrowthPieChart from '../graphs/piechartGraph';

const container = {
  padding: '1rem',
  fontFamily: 'Arial, sans-serif'
};

const title = {
  fontSize: '1.25rem',
  fontWeight: '600',
  marginBottom: '1rem'
};

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  marginBottom: '1.5rem'
};

const card = {
  backgroundColor: '#fce7f3',
  padding: '1rem',
  borderRadius: '0.5rem'
};

const subtitle = {
  fontSize: '1.125rem',
  fontWeight: '500',
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

export default function PregnancyDashboard() {
  const data = [
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

      <div style={statsGrid}>
        <div style={card}><strong>Current Week:</strong><br />18</div>
        <div style={card}><strong>Due Date:</strong><br />Aug 5, 2025</div>
        <div style={card}><strong>Trimester:</strong><br />2nd</div>
        <div style={card}><strong>Logged Symptoms:</strong><br />{data.length} entries</div>
      </div>

      <h3 style={subtitle}>Recent Activity</h3>

      <p><strong>Most Frequent Symptom:</strong> {mostFrequentSymptom || 'No data'}</p>
      <p><strong>Latest Symptom:</strong> {latestEntry ? `${latestEntry.created_at} – ${latestEntry.symptom}` : 'No recent activity'}</p>

      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {data.map((entry, index) => (
          <li key={index} style={listItem}>
            {entry.created_at} – {entry.symptom}
          </li>
        ))}
      </ul>

      <h3 style={subtitle}>Weight Gain Over Time</h3>
      <div style={chartContainer}>
        <ChildGrowthPieChart />
      </div>

      <h3 style={subtitle}>Tips & Suggestions</h3>
      <div style={tipBox}>
        🤰 <strong>Tip:</strong> {tip}
      </div>

      <button style={ctaButton}>+ Add Entry</button>
    </div>
  );
}
