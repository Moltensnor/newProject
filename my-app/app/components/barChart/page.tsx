"use client";

import { CostGroupPair } from "@/app/lib/types";
import "chart.js/auto";
import dynamic from "next/dynamic";

export default function BarChart(props: {
  costGroups: [CostGroupPair] | [];
  hasBudget: boolean;
}) {
  const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
    ssr: false,
  });

  const data = {
    labels: props.costGroups.map((c) => c.first.name),
    datasets: [
      {
        label: "Cost Bar Chart",
        data: props.costGroups.map((c) => c.second.first),
        backgroundColor: props.costGroups.map((c) => c.first.hexcode),
        borderWidth: 2,
      },
    ],
  };

  let delayed: boolean;
  const options = {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context: {
        type: string;
        mode: string;
        dataIndex: number;
        datasetIndex: number;
      }) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="flex justify-around min-w-[90vh]">
      <Bar data={data} options={options} />
    </div>
  );
}
