"use client"
import React, { useEffect, useState } from 'react'
import DashboardFilter from './DashboardFilter'
import useUser from '@app/authentication/hooks/useUser';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import { getOvulationData } from '@utils/apiOvulation';
import { getPregnanceData } from '@utils/apiPregnance';
import { getChildcareData } from '@utils/apiChildcare';
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy';
import DashboardBody from './DashboardBody';
import AIpage from '@app/ai/AIpage';

export default function page() {
  const [AI_response, setAI_response] = useState("")
  const [latestCategory, setLatestCategory] = useState(false);

  const { user } = useUser();

  const { isLoading: ovulationLoading, data: ovulation } = useQuery({
    queryKey: ["ovulationData"],
    queryFn: getOvulationData,
  });

  const { isLoading: PregnanceLoading, data: Pregnance } = useQuery({
    queryKey: ["pregnance"],
    queryFn: getPregnanceData,
  });

  const { isLoading: ChildcareLoading, data: Childcare } = useQuery({
    queryKey: ["childcareData"],
    queryFn: getChildcareData,
  });

  const [statsDuration, setStatsDuration] = useState("current year");
  const [statsValues, setStatsValues] = useState([]);

  const currentYear = new Date().getFullYear();

  // Your existing filtering for yearly data — moved above useEffect
  const ovulationYearly = ovulation?.filter(
    (row) => row.userID === user?.id && row.created_at.slice(0, 4) == currentYear
  ) || [];

  const pregnanceYearly = Pregnance?.filter(
    (row) => row.userID === user?.id && row.created_at.slice(0, 4) == currentYear
  ) || [];

  const childcareYearly = Childcare?.filter(
    (row) => row.userID === user?.id && row.created_at.slice(0, 4) == currentYear
  ) || [];

  const yearlyData = { ovulationYearly, pregnanceYearly, childcareYearly };

  useEffect(() => {
    if (!user || !ovulation || !Pregnance || !Childcare) {
      return;
    }
    setStatsValues(yearlyData);
  }, [user, ovulation, Pregnance, Childcare]); // <-- Removed statsValues from dependencies here!

  if (ovulationLoading || PregnanceLoading || ChildcareLoading || !user) {
    return <LoadingSpinner />;
  }

  if (statsValues.length === 0) {
    return <LoadingSpinner />;
  }

  // FILTER THOSE DATA BASED ON FILTER COMPONENT (current year, current month, current week)
  const currentMonth = new Date().getMonth();

  // This is hot it needs several lines of codes //
  const dateOfToday = new Date().getDate(); // eg 21, 09, 01 e.t.c
  const currentday = new Date().getDay();
  let diffToMonday = 0;
  if (currentday === 0) {
    diffToMonday = 6;
  } else if (currentday === 1) {
    diffToMonday = 0;
  } else {
    diffToMonday = currentday - 1;
  }
  const startOfWeek = new Date();
  const endOfWeek = new Date();
  startOfWeek.setDate(dateOfToday - diffToMonday);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  console.log("startOfWeek " + startOfWeek);
  console.log("endOfWeek " + endOfWeek);
  console.log("diffToMonday " + diffToMonday);
  console.log("dateOfToday " + dateOfToday);
  console.log("current year " + currentYear);
  console.log("current month " + currentMonth);

  /* Filter based on current week */
  console.log(ovulation);
  console.log(Pregnance);
  console.log(Childcare);
  console.log(user);
  // OVULATION
  const ovulationWeekly = ovulation
    .filter((row) => row.userID == user.id)
    .filter(
      (row) =>
        new Date(row.created_at) >= startOfWeek &&
        new Date(row.created_at) <= endOfWeek
    );
  // PREGNANCE
  const pregnanceWeekly = Pregnance
    .filter((row) => row.userID == user.id)
    .filter(
      (row) =>
        new Date(row.created_at) >= startOfWeek &&
        new Date(row.created_at) <= endOfWeek
    );
  // CHILDCARE
  const childcareWeekly = Childcare
    .filter((row) => row.userID == user.id)
    .filter(
      (row) =>
        new Date(row.created_at) >= startOfWeek &&
        new Date(row.created_at) <= endOfWeek
    );
  // SET OBJ CONTAINING ALL OF THEM
  const weeklyData = { ovulationWeekly, pregnanceWeekly, childcareWeekly };

  console.log("ovulation Weekly " + JSON.stringify(ovulationWeekly));
  console.log("preg Weekly " + JSON.stringify(pregnanceWeekly));
  console.log("Childcare Weekly " + JSON.stringify(childcareWeekly));

  /* Filter based on current month */
  // OVULATION
  const ovulationMonthly = ovulation
    .filter((row) => row.userID === user.id)
    .filter((row) => row.created_at.slice(5, 7) == currentMonth + 1);
  // PREGNANCE
  const pregnanceMonthly = Pregnance
    .filter((row) => row.userID === user.id)
    .filter((row) => row.created_at.slice(5, 7) == currentMonth + 1);
  // CHILDCARE
  const childcareMonthly = Childcare
    .filter((row) => row.userID === user.id)
    .filter((row) => row.created_at.slice(5, 7) == currentMonth + 1);

  // SET OBJ CONTAINING ALL OF THEM
  const monthlyData = { ovulationMonthly, pregnanceMonthly, childcareMonthly };

  console.log("ovulation monthly " + JSON.stringify(ovulationMonthly));
  console.log("preg monthly " + JSON.stringify(pregnanceMonthly));
  console.log("Childcare monthly " + JSON.stringify(childcareMonthly));

  /* Filter based on current year */
  // OVULATION
  // Already done earlier and used in useEffect:
  // const ovulationYearly = ...
  // PREGNANCE
  // const pregnanceYearly = ...
  // CHILDCARE
  // const childcareYearly = ...

  if (statsValues.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <AIpage 
        AI_response={AI_response} 
        setAI_response={setAI_response}
        latestCategory={latestCategory}
      />
      {/* DASHBOARD HEADING */}
      <div style={header}>
        <div style={heading}>Dashboard</div>
        <DashboardFilter
          setStatsDuration={setStatsDuration}
          statsDuration={statsDuration}
          statsValues={statsValues}
          setStatsValues={setStatsValues}
          weeklyData={weeklyData}
          monthlyData={monthlyData}
          yearlyData={yearlyData}
        />
      </div>

      {/* DASHBOARD BODY */}
      <div>
        {
          statsValues.length === 0 ? "" :
          <div>
            <DashboardBody setLatestCategory={setLatestCategory} statsValues={statsValues} userData={AI_response}/>
          </div>
        }
      </div>
    </div>
  );
}

//CSS
const header = {
  display: "flex",
  justifyContent: "space-between",
  gap:"20px",
  flexWrap:"wrap",
  width: "100%",
};
const heading = {
  fontSize: "20px",
  fontWeight: 500,
};
const iconStyle = {
  padding: "0px 5px",
  fontSize: "35px",
  color: "rgba(8, 161, 28, 0.76)",
};
