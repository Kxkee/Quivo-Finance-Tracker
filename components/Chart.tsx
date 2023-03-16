"use client";
import { Chart as ChartJS, LineElement, Tooltip, Legend,  CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";

export default function Chart() {
    ChartJS.register(LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

    const data = {
        labels: ["Red", "Blue", "Green"],
        datasets: [
            {
                label: "Compte en banque",
                data: [0, 15, 22],
                borderColor: "#00A54C"
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
    };
    return (
        <div className="w-3/4 h-full rounded-lg bg-[#202123] p-5 mr-[10px]">
            <Line data={data} />
        </div>
    );
}