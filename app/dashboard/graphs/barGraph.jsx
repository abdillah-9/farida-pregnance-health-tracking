import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function PregnancyBarChart({data}) {
  //format date to localeDateString

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" tick={{fontSize:"14px"}} />
        <YAxis tick={{fontSize:"14px"}} />
        <Tooltip contentStyle={{fontSize:"14px"}}/>
        <Legend wrapperStyle={{fontSize:"14px"}}/>
        <Bar dataKey="pregnance_week" fill="#82ca9d" name="Pregnance week" />
        <Bar dataKey="fetal_HR" fill="#8884d8" name="Fetal HR" />
        <Bar dataKey="mother_HR" fill="#8884d8" name="Mother HR" />
      </BarChart>
    </ResponsiveContainer>
  );
}
