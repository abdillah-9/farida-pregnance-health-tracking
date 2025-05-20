"use client"
import React, { useEffect, useState } from 'react'
import Insights from './Insights'
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy'
import { getBudgetData } from '@utils/apiBudget'
import { getExpenseData } from '@utils/apiExpense'
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner'
import useUser from '@app/authentication/hooks/useUser'

export default function page() {
    //Import user, budget and expense data here
    const {user, isLoading: userLoading} = useUser();

    const {data: budget, isLoading: budgetLoading} = useQuery({
        queryKey:["budgetData"],
        queryFn: getBudgetData,
    })

    const {data: expense, isLoading: expenseLoading} = useQuery({
        queryKey:["expenseData"],
        queryFn: getExpenseData,
    })

    const [budgetStats, setBudgetStats] = useState([])

    // create array containing budgets with sum of its expenses 
    // structure should be as const combinedData = [budgetID,budgetName,budgetAmount,expenseTotal]
    useEffect(()=>{

        if(!user || !budget || !expense){
            return 
        }

        // *** First calculate total for each expense sumOfEachExpense = [{expenseID,expenseTotal}] *** //
        const sumOfEachExpense = expense.filter((exp)=> exp.userID == user.id)
            .reduce((acc, item)=>{
            const exists = acc.find((row)=>row.expBudgetID == item.budgetID);
        
        if (exists) {
            exists.expenseTotal += item.amount;
        } 
        else {
            acc.push({ expBudgetID: item.budgetID, expenseTotal: item.amount });
        }
        return acc
    },[])
    
    // ******* Finally create combinedData based on given structure above ****** //
    const combinedData = budget.reduce((acc, item)=>{
        const exists = sumOfEachExpense.find((row)=>row.expBudgetID == item.id)

        if(exists){
            acc.push({ 
                budgetID:item.id, 
                budgetName:item.name, 
                budgetAmount:item.amount, 
                expenseTotal: exists.expenseTotal
            })
        }

        return acc
    },[])

    console.log("combined data for backend is "+JSON.stringify(combinedData))
    setBudgetStats(combinedData)

    },[user, budget, expense])

    //fetch AI insights based on this api call
    useEffect(()=>{
        if (!budgetStats || budgetStats.length === 0) {
            console.log("budgetStats is empty, not sending to backend yet.");
            return;
        }
    
        console.log("budgetStats", JSON.stringify(budgetStats));
        
        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(budgetStats)
              });
      
              const data = await response.json();
              console.log(data.tip); // e.g., "You're over budget..."
            } catch (error) {
              console.error('Error fetching prediction:', error);
            }
          };
      
          fetchData();
    }
    ,[budgetStats])

  return (
    <div>
        {
        userLoading || expenseLoading || budgetLoading ? <LoadingSpinner/> : <Insights/> 
        }
    </div>
  )
}
