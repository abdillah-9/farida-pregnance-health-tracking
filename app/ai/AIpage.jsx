"use client"
import React, { useEffect, useState } from 'react'
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy'
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner'
import useUser from '@app/authentication/hooks/useUser'
import Icon from '@app/reusables/UI_components/Icon'
import { TbMoodEmptyFilled } from '@node_modules/react-icons/tb'
import { getChildcareData } from '@utils/apiChildcare'
import { getOvulationData } from '@utils/apiOvulation'
import { getPregnanceData } from '@utils/apiPregnance'

export default function AIpage({latestCategory,AI_response, setAI_response}) {
    //Import user, budget and expense data here
    const {user, isLoading: userLoading} = useUser();

    const {isLoading: ChildcareLoading, data: Childcare, error:ChildcareError} =  useQuery({
        queryKey: ['childcareData'],
        queryFn: getChildcareData
    });

    const {isLoading: ovulationLoading, data: ovulation, error: ovulationError} =  useQuery({
        queryKey: ['ovulationData'],
        queryFn: getOvulationData
    });

    const {isLoading: PregnanceLoading, data: Pregnance, error: PregnanceError} =  useQuery({
        queryKey: ['pregnance'],
        queryFn: getPregnanceData
    });

    const [userData, setuserData] = useState("")

    useEffect(() => {
      if (!user || !ovulation || !Pregnance || !Childcare) return;

      const filteredOvulation = ovulation.filter((row) => row.userID === user.id);
      const filteredPregnance = Pregnance.filter((row) => row.userID === user.id);
      const filteredChildcare = Childcare.filter((row) => row.userID === user.id);

      // set userData
      if (latestCategory.category == "ovulation") {
        setuserData({ filteredOvulation });
        console.log("userData has been set OK "+JSON.stringify(userData))
       }
      if (latestCategory.category == "pregnance") {
        setuserData({ filteredPregnance });
      }
      if (latestCategory.category == "childcare") {
        setuserData({ filteredChildcare });
      }
    }, [user, ovulation, Pregnance, Childcare, latestCategory]);


    //fetch AI insights based on this api call

    useEffect(() => {
      if (userData && Object.keys(userData).length > 0) {
        console.log("userData is empty or incomplete.");
        return;
      }

      if(latestCategory.category == "ovulation"){
        const fetchData = async () => {
          try {
            const response = await fetch('https://frank-business-ai.onrender.com/farida-ovulation-api', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            });

            const data = await response.json();
            console.log("AI response:", data);
            setAI_response(data);
          } catch (error) {
            console.error('Error fetching prediction:', error);
          }
        };

        fetchData();
      }

      if(latestCategory.category == "pregnance"){
        const fetchData = async () => {
          try {
            const response = await fetch('https://frank-business-ai.onrender.com/farida-pregnancy-api', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            });

            const data = await response.json();
            console.log("Pregnancy AI response:", data);
            setAI_response(data);
          } catch (error) {
            console.error('Error fetching pregnancy prediction:', error);
          }
        };

        fetchData();
      }

      if(latestCategory.category == "childcare"){
        const fetchData = async () => {
          try {
            const response = await fetch('https://frank-business-ai.onrender.com/farida-childcare-api', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            });

            const data = await response.json();
            console.log("Childcare AI response:", data);
            setAI_response(data);
          } catch (error) {
            console.error('Error fetching pregnancy prediction:', error);
          }
        };

        fetchData();
      }

    }, [userData, latestCategory]);

    useEffect(() => {
  if (userData) {
    console.log("userData has been updated to: ", JSON.stringify(userData));
  }
}, [userData]);


    // if (ovulationLoading || PregnanceLoading || ChildcareLoading) {
    //     return <LoadingSpinner/>;
    // }

  console.log("userData", JSON.stringify(userData));
  return (
    <div>
        {
            // userLoading || ovulationLoading || PregnanceLoading || ChildcareLoading ? 
            // <LoadingSpinner/> : 
            // AI_response === "" ? 
            // <div style={{fontSize:"14px", display:"flex", gap:"10px",
            // width:"100%",height:"100%", alignItems:"center", flexDirection:"column"}}>
            //   <div>It looks like you haven't setup,
            //     please insert new data to receive AI-insights...</div> 
            //   <Icon iconStyle={iconStyle}><LoadingSpinner/></Icon> 
            // </div> 
            // : 
            // <div>
            //     {
                  // JSON.stringify(AI_response)
            //     }
            // </div> 
        }
    </div>
  )
}

//CSS
const iconStyle={
  padding:"0px 5px",
  fontSize:"35px",
  color:"rgba(79, 8, 161, 0.76)",
}
