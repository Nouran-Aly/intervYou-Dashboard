import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

export default function LineChart() {

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
  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false
        },
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
