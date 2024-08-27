import { useMemo } from 'react';
import { BarChart } from "@mui/x-charts/BarChart";
import { calculateMonthlyData, arrayOfMonths } from "./dataUtils";

// eslint-disable-next-line react/prop-types
export default function MyBarChart({ transactions }) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { averageIncome, averageExpense } = useMemo(() => calculateMonthlyData(transactions));

    return (
        <>
            <BarChart
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
                xAxis={[{ scaleType: 'band', data: arrayOfMonths }]}
                series={[
                    { data: averageIncome, label: "Average Monthly Income" },
                    { data: averageExpense, label: "Average Monthly Spending" },
                ]}
                width={650}
                height={350}
            />
            
        </>
    );
}
