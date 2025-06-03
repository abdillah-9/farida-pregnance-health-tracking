import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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
          paddingAngle={2}
          fill="#8884d8"
        >
          {data.map((entry, index) => {
            const colorValue = entry.feeding_type === "mixed" ? '#00C49F' : 
            entry.feeding_type === "formula" ? '#FFBB28' : '#FF8042'

            return <Cell key={`cell-${index}`} fill={colorValue} />
          })}
        </Pie>
        <Tooltip/>
        <Legend 
          align='center'
          verticalAlign='bottom'
          width={"100%"}
          fontSize={"16px"}
          layout='horizontal'
          iconSize={8}
          iconType=''/>
      </PieChart>
    </ResponsiveContainer>
  );
}
