import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dummy child growth status distribution
const data = [
  { name: 'Healthy', value: 65 },
  { name: 'Underweight', value: 20 },
  { name: 'Overweight', value: 15 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

export default function ChildGrowthPieChart({data}) {
  return (
    <ResponsiveContainer width="100%" height={"100%"} style={{
      maxWidth:"400px", display:"flex", justifySelf:"center"}}>
      <PieChart>
        <Pie
          data={data}
          dataKey="current_weight"
          nameKey="feeding_type"
          cx="50%"
          cy="50%"
          innerRadius={30} 
          outerRadius={80}
          paddingAngle={1.5}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip/>
        <Legend 
          align='center'
          verticalAlign='bottom'
          width={"100%"}
          fontSize={"20px"}
          layout='horizontal'
          iconSize={8}
          iconType=''/>
      </PieChart>
    </ResponsiveContainer>
  );
}
