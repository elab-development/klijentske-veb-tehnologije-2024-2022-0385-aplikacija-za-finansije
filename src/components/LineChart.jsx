import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { calculateDailyData } from "./dataUtils"; // Import the new daily calculation function

// eslint-disable-next-line react/prop-types
export default function MyChart({ transactions, selectedMonth }) {

    const [daysArray, setDaysArray] = useState([]);

    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        if (!selectedMonth) return;

        const daysInMonth = new Date(2024, selectedMonth, 0).getDate(); // Get days in selected month
        const newDaysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        setDaysArray(newDaysArray);

        const { dailyIncomeAmount, dailyExpenseAmount } = calculateDailyData(transactions, selectedMonth);
        setIncomeData(dailyIncomeAmount);
        setExpenseData(dailyExpenseAmount);
    }, [transactions, selectedMonth]);

    if (!daysArray.length) {
        return null; // or a loading spinner, or placeholder component
    }

    return (
        <>
            <LineChart
                sx={{
                    "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                        strokeWidth: 2,
                        fill: "white"
                    },
                    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                        fontFamily: "Roboto",
                    },
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                        strokeWidth: 2,
                        fill: "white"
                    },
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                        stroke: "white",
                        strokeWidth: 2
                    },
                    "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                        stroke: "white",
                        strokeWidth: 2
                    }
                }}
                xAxis={[
                    {
                        data: daysArray,
                        label: "Days",
                        tickNumber: daysArray.length,
                    },
                ]}
                series={[
                    {
                        data: incomeData,
                        label: "Income",
                        area: true,
                    },
                    {
                        data: expenseData,
                        label: "Expenses",
                        area: true,
                    },
                ]}
                width={900}
                height={369}
                grid={{ vertical: true, horizontal: true }}
            />
        </>
    );
}
