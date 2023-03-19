"use client";
import { Chart as ChartJS, LineElement, Tooltip, Legend,  CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";
import {useEffect, useRef, useState} from "react";

type PropsChart = {
    balance: number,
    report: [number, string, string, string | undefined] | undefined,
}

export default function Chart(props: PropsChart) {
    ChartJS.register(LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);
    const [chartData, setChartData] = useState<any>()
    const [currentBalance, setCurrentBalance] = useState<number>()
    useEffect(() => {

        if(props.report) {
            const {current} = props.report[0];
            setCurrentBalance(current)
            setChartData({
                labels: props.report.map((result: any) => result.date).reverse(),
                datasets: [
                    {
                        label: "Compte en banque",
                        data: props.report.map((result: any) => result.current).reverse(),
                        borderColor: "#00A54C",
                        borderJoinStyle: "round",
                        tension: 0.4,
                        backgroundColor: "#00A54C",
                        fill: true,
                    }
                ],
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            },
                            type: 'linear'
                        }
                    ]
                }
            });
        }
    }, [props.report])


    return (
        <div className="w-3/4 h-full rounded-lg bg-[#202123] p-5 mr-[10px]">
            {chartData && (
                <div className="w-full h-full flex flex-col justify-around">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-500">Balance</p>
                        <p className="text-3xl font-bold">{currentBalance} $</p>
                    </div>
                <Line data={chartData} />
                </div>
            )}
        </div>
    );
}