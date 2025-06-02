import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PregnancyBarChart from '../graphs/barGraph';

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
  backgroundColor: '#d1fae5',
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

export default function ChildcareDashboard() {
  const data = [
    { created_at: '2025-04-01', activity: 'Bottle feeding' },
    { created_at: '2025-04-02', activity: 'Diaper change' },
    { created_at: '2025-04-03', activity: 'Nap logged' }
  ];

  const chartData = [
    { day: 'Mon', hours: 12 },
    { day: 'Tue', hours: 10 },
    { day: 'Wed', hours: 14 }
  ];

  return (
    <div style={container}>
      <h2 style={title}>Currently tracking: Childcare – Baby is 6 months old</h2>

      <div style={statsGrid}>
        <div style={card}><strong>Baby's Age:</strong><br />6 months</div>
        <div style={card}><strong>Last Activity:</strong><br />Nap logged</div>
        <div style={card}><strong>Recent Milestone:</strong><br />First smile 😊</div>
        <div style={card}><strong>Growth Tracking:</strong><br />Ongoing</div>
      </div>

      <h3 style={subtitle}>Recent Activity</h3>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {data.map((entry, index) => (
          <li key={index} style={listItem}>
            {entry.created_at} – {entry.activity}
          </li>
        ))}
      </ul>

      <h3 style={subtitle}>Sleep Duration Over Last Days</h3>
      <div style={chartContainer}>
        <PregnancyBarChart/>
      </div>

      <h3 style={subtitle}>Tips & Suggestions</h3>
      <div style={tipBox}>
        👶 <strong>Tip:</strong> How to introduce solid foods
      </div>

      <button style={ctaButton}>+ Add Entry</button>
    </div>
  );
}
