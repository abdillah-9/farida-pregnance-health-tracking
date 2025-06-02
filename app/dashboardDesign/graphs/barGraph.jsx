import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dummy pregnancy data over months (weeks or trimesters)
const data = [
  { month: 'Jan', weightGain: 2, bp: 110 },
  { month: 'Feb', weightGain: 3, bp: 112 },
  { month: 'Mar', weightGain: 4, bp: 115 },
  { month: 'Apr', weightGain: 5, bp: 118 },
  { month: 'May', weightGain: 6, bp: 120 },
];

export default function PregnancyBarChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="weightGain" fill="#82ca9d" name="Weight Gain (kg)" />
        <Bar dataKey="bp" fill="#8884d8" name="Blood Pressure (mmHg)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
