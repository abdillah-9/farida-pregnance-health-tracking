import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { created_at: "2025-05-01", cycle_length_days: 28, period_duration_days: 5, sleep_hours: 7, day_week_exercise: 3 },
  { created_at: "2025-05-02", cycle_length_days: 27, period_duration_days: 6, sleep_hours: 6.5, day_week_exercise: 4 },
  { created_at: "2025-05-03", cycle_length_days: 30, period_duration_days: 4, sleep_hours: 8, day_week_exercise: 2 },
  { created_at: "2025-05-04", cycle_length_days: 29, period_duration_days: 5, sleep_hours: 7.5, day_week_exercise: 3 },
  { created_at: "2025-05-05", cycle_length_days: 28, period_duration_days: 5, sleep_hours: 6.8, day_week_exercise: 1 },
  { created_at: "2025-05-06", cycle_length_days: 26, period_duration_days: 4, sleep_hours: 8.2, day_week_exercise: 2 },
  { created_at: "2025-05-07", cycle_length_days: 27, period_duration_days: 6, sleep_hours: 7, day_week_exercise: 3 },
  { created_at: "2025-05-08", cycle_length_days: 29, period_duration_days: 5, sleep_hours: 6.4, day_week_exercise: 2 },
  { created_at: "2025-05-09", cycle_length_days: 30, period_duration_days: 6, sleep_hours: 7.2, day_week_exercise: 4 },
  { created_at: "2025-05-10", cycle_length_days: 28, period_duration_days: 5, sleep_hours: 7.8, day_week_exercise: 5 },
  { created_at: "2025-05-11", cycle_length_days: 27, period_duration_days: 4, sleep_hours: 6.5, day_week_exercise: 1 },
  { created_at: "2025-05-12", cycle_length_days: 28, period_duration_days: 5, sleep_hours: 8.1, day_week_exercise: 3 },
  { created_at: "2025-05-13", cycle_length_days: 29, period_duration_days: 6, sleep_hours: 7.4, day_week_exercise: 2 },
  { created_at: "2025-05-14", cycle_length_days: 30, period_duration_days: 5, sleep_hours: 6.9, day_week_exercise: 3 },
  { created_at: "2025-05-15", cycle_length_days: 26, period_duration_days: 4, sleep_hours: 7.3, day_week_exercise: 4 },
];


export default function LineGraph() {
  return (
            <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                <defs>
                <linearGradient id="cycleLengthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="periodDurationGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sleepHoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exerciseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(200,10,70,0.7)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="rgba(200,10,70,0.7)" stopOpacity={0} />
                </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="created_at" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                type="monotone"
                dataKey="cycle_length_days"
                stroke="#8884d8"
                fill="url(#cycleLengthGradient)"
                name="Cycle Length (days)"
                />
                <Area
                type="monotone"
                dataKey="period_duration_days"
                stroke="#82ca9d"
                fill="url(#periodDurationGradient)"
                name="Period duration (days)"
                />
                <Area
                type="monotone"
                dataKey="sleep_hours"
                stroke="#ffc658"
                fill="url(#sleepHoursGradient)"
                name="Sleep Hours"
                />
                <Area
                type="monotone"
                dataKey="day_week_exercise"
                stroke="rgba(200,10,70,0.7)"
                fill="url(#exerciseGradient)"
                name="Exercises per (day/week)"
                />
            </AreaChart>
            </ResponsiveContainer>

        //AREACHART WITH DUAL Y-AXIS
//         <ResponsiveContainer width="100%" height={400}>
//   <AreaChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
    
//     {/* Gradient definitions */}
//     <defs>
//       <linearGradient id="cycleLengthGradient" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//         <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//       </linearGradient>
//       <linearGradient id="periodDurationGradient" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
//         <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
//       </linearGradient>
//       <linearGradient id="sleepHoursGradient" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
//         <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
//       </linearGradient>
//       <linearGradient id="exerciseGradient" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="5%" stopColor="rgba(200,10,70,0.7)" stopOpacity={0.8} />
//         <stop offset="95%" stopColor="rgba(200,10,70,0.7)" stopOpacity={0} />
//       </linearGradient>
//     </defs>

//     <CartesianGrid strokeDasharray="3 3" />
//     <XAxis dataKey="created_at" />
    
//     {/* Left Y-axis for low-range data */}
//     <YAxis yAxisId="left" />
    
//     {/* Right Y-axis for high-range data */}
//     <YAxis yAxisId="right" orientation="right" />

//     <Tooltip />
//     <Legend />

//     {/* High-range data on right axis */}
//     <Area
//       type="monotone"
//       dataKey="cycle_length_days"
//       stroke="#8884d8"
//       fill="url(#cycleLengthGradient)"
//       name="Cycle Length (days)"
//       yAxisId="right"
//     />

//     {/* Low-range data on left axis */}
//     <Area
//       type="monotone"
//       dataKey="period_duration_days"
//       stroke="#82ca9d"
//       fill="url(#periodDurationGradient)"
//       name="Period duration (days)"
//       yAxisId="left"
//     />
//     <Area
//       type="monotone"
//       dataKey="sleep_hours"
//       stroke="#ffc658"
//       fill="url(#sleepHoursGradient)"
//       name="Sleep Hours"
//       yAxisId="left"
//     />
//     <Area
//       type="monotone"
//       dataKey="day_week_exercise"
//       stroke="rgba(200,10,70,0.7)"
//       fill="url(#exerciseGradient)"
//       name="Exercises per (day/week)"
//       yAxisId="left"
//     />
//   </AreaChart>
// </ResponsiveContainer>

  );
}
