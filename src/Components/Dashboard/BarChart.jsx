import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [10, 50, 80, 20, 90, 55], // Y-axis values
        borderColor: "#4DA1A9",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointRadius: 5, // Large Dots
        pointBackgroundColor: "#2E5077",
        pointBorderColor: "white",
        tension: 0.4, // Smooth line
        fill: true,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    // maintainAspectRatio: false,
    barThickness: 30,
  };

  return (
    <div className="">
      <Bar data={data} options={barChartOptions} />
    </div>
  );
}
