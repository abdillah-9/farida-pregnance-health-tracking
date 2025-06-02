import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { date: '2025-01-01', cycleLength: 28, stressLevel: 2, sleepHours: 7 },
  { date: '2025-02-01', cycleLength: 27, stressLevel: 3, sleepHours: 6 },
  { date: '2025-03-01', cycleLength: 29, stressLevel: 1, sleepHours: 8 },
  { date: '2025-04-01', cycleLength: 28, stressLevel: 2, sleepHours: 7 },
  { date: '2025-05-01', cycleLength: 30, stressLevel: 4, sleepHours: 5 },
];

export default function LineGraph() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cycleLength" stroke="#8884d8" name="Cycle Length (days)" />
        <Line type="monotone" dataKey="stressLevel" stroke="#82ca9d" name="Stress Level" />
        <Line type="monotone" dataKey="sleepHours" stroke="#ffc658" name="Sleep Hours" />
      </LineChart>
    </ResponsiveContainer>
  );
}
