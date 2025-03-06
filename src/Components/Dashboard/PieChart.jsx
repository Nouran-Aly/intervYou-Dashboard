import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { color } from "chart.js/helpers";

export default function PieChart() {
  const [colors, setcolors] = useState([
    "#3A6FF8",
    "#14CC26",
    "#FFBE17",
    "#FF613E",
  ]);

  const data = {
    labels: ["Easy", "Intermediate", "Hard"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: [
          "#4DA1A9",
          "#2E5077",
          "#79D7BE",
        ],

        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={pieChartOptions} />
    </div>
  );
}
