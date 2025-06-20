import React from 'react';
import LineGraph from '../graphs/lineGraph';

const container = {
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  maxWidth: '1000px',
  margin: '0 auto',
};

const title = {
  fontSize: '1.75rem',
  fontWeight: '700',
  marginBottom: '2rem',
};

const sectionTitle = {
  fontSize: '1.25rem',
  fontWeight: '600',
  margin: '2rem 0 1rem',
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1rem',
};

const card = {
  backgroundColor: '#f0f9ff',
  padding: '1.25rem',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
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

export default function OvulationDashboard() {
  return (
    <div style={container}>
      {/* Title */}
      <h2 style={title}>Ovulation Tracker Overview</h2>

      {/* Grid Stats */}
      <div style={grid}>
        <div style={card}><strong>Name:</strong><br />Jane Doe</div>
        <div style={card}><strong>Age:</strong><br />28</div>
        <div style={card}><strong>Last Period:</strong><br />Jan 5, 2025</div>
        <div style={card}><strong>Cycle Length:</strong><br />28 days</div>
        <div style={card}><strong>Period Duration:</strong><br />5 days</div>
        <div style={card}><strong>Regular Cycle:</strong><br />Yes</div>
        <div style={card}><strong>Stress Level:</strong><br />Medium</div>
        <div style={card}><strong>Sleep Hours:</strong><br />7</div>
        <div style={card}><strong>Exercise Days/Week:</strong><br />3</div>
        <div style={card}><strong>Diagnosed Conditions:</strong><br />PCOS</div>
        <div style={card}><strong>Status:</strong><br />Confirmed</div>
      </div>

      {/* Graph */}
      <h3 style={sectionTitle}>Ovulation Trends (Graph)</h3>
      <div style={graphPlaceholder}>
        <LineGraph/>
      </div>

      {/* Recent Activity */}
      <h3 style={sectionTitle}>Recent Activity</h3>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li style={listItem}>🩸 Jan 5, 2025 - Period Started</li>
        <li style={listItem}>🔬 Jan 12, 2025 - Ovulation Logged</li>
        <li style={listItem}>📅 Feb 9, 2025 - Next Expected Ovulation</li>
      </ul>

      {/* Tips */}
      <h3 style={sectionTitle}>Tips & Suggestions</h3>
      <div style={tipBox}>
        💡 <strong>Tip:</strong> Aim for 7-9 hours of sleep and track stress levels for better hormonal balance.
      </div>

      {/* CTA */}
      <button style={ctaButton}>+ Add New Entry</button>
    </div>
  );
}
