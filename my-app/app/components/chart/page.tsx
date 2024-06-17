"use client";

import {
  CostGroupPair,
  CostItemPair,
  FullBudgetCostPair,
} from "@/app/lib/types";
import "chart.js/auto";
import dynamic from "next/dynamic";
import _ from 'underscore';

export default function Chart(props: {
  costGroups: [CostGroupPair] | [];
  costItems: [CostItemPair] | [];
  fullCostGroups: [FullBudgetCostPair] | [];
  hasBudget: boolean;
  isGroup: boolean;
  type: string;
  totalLeft: number;
}) {
  const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
    ssr: false,
  });
  const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), {
    ssr: false,
  });
  const PolarArea = dynamic(
    () => import("react-chartjs-2").then((mod) => mod.PolarArea),
    {
      ssr: false,
    }
  );
  const Doughnut = dynamic(
    () => import("react-chartjs-2").then((mod) => mod.Doughnut),
    {
      ssr: false,
    }
  );

  function randomHexCodeConverter(code: string) {
    let hexcode = code.replace("#", "");
    let r = parseInt(hexcode.substring(0, 2), 16);
    let g = parseInt(hexcode.substring(2, 4), 16);
    let b = parseInt(hexcode.substring(4, 6), 16);
    let randomR = Math.abs(_.random(0,1) * 80 + (r - 40));
    let randomG = Math.abs(_.random(0,1)  * 80 + (g - 40));
    let randomB = Math.abs(_.random(0,1)  * 80 + (b - 40));
    return (
      "#" + ((1 << 24) + (randomR << 16) + (randomG << 8) + randomB).toString(16).slice(1)
    );
  }

  function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  const COLORS = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f",
    "#00a950",
    "#58595b",
    "#8549ba",
  ];

  let data;
  if (props.isGroup) {
    if (props.hasBudget) {
      const leftOver: CostGroupPair = {
        first: {
          id: -1,
          name: "over",
          hexcode: "#00FF00",
          budget: 0,
          costList: {
            id: -1,
            name: "",
            date: "",
            desription: "",
            userEmail: "",
            budget: -1,
          },
        },
        second: {
          first: props.totalLeft,
          second: 0,
        },
      };
      const temp: [CostGroupPair] = [leftOver];
      props.costGroups.every((c) => temp.push(c));

      data = {
        labels: temp.map((c) => c.first.name),
        datasets: [
          {
            label: "Amount",
            data: temp.map((c) => c.second.first),
            backgroundColor: temp.map((c) => c.first.hexcode),
            borderWidth: 2,
          },
        ],
      };
    } else {
      data = {
        labels: props.costGroups.map((c) => c.first.name),
        datasets: [
          {
            label: "Amount",
            data: props.costGroups.map((c) => c.second.first),
            backgroundColor: props.costGroups.map((c) => c.first.hexcode),
            borderWidth: 2,
          },
        ],
      };
    }
  } else {
    if (props.hasBudget) {
      const leftOver: CostItemPair = {
        first: {
          id: -1,
          name: "over",
          description: "",
          amount: props.totalLeft,
          costGroup: {
            id: -1,
            name: "over",
            hexcode: "#00FF00",
            budget: 0,
            costList: {
              id: -1,
              name: "",
              date: "",
              desription: "",
              userEmail: "",
              budget: -1,
            },
          },
          costList: {
            id: -1,
            name: "",
            date: "",
            desription: "",
            userEmail: "",
            budget: -1,
          },
        },
        second: 0,
      };

      const temp: [CostItemPair] = [leftOver];
      props.costItems.every((c) => temp.push(c));

      data = {
        labels: temp.map((c) => c.first.name),
        datasets: [
          {
            label: "Amount",
            data: temp.map((c) => c.first.amount),
            backgroundColor: temp.map((c) => randomHexCodeConverter(c.first.costGroup.hexcode)),
            borderWidth: 2,
          },
        ],
      };
    } else {
      data = {
        labels: props.costItems.map((c) => c.first.name),
        datasets: [
          {
            label: "Amount",
            data: props.costItems.map((c) => c.first.amount),
            backgroundColor: props.costItems.map((c) => randomHexCodeConverter(c.first.costGroup.hexcode)),
            borderWidth: 2,
          },
        ],
      };
    }
  }

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
  };

  switch (props.type) {
    case "Bar":
      return (
        <div className="flex justify-around min-w-[80vh] max-w-[80vh]">
          <Bar data={data} options={options} />
        </div>
      );
    case "Pie":
      return (
        <div className="flex justify-around min-w-[80vh] max-w-[80vh]">
          <Pie data={data} options={options} />
        </div>
      );
    case "Doughnut":
      return (
        <div className="flex justify-around min-w-[80vh] max-w-[80vh]">
          <Doughnut data={data} options={options} />
        </div>
      );
    case "PolarArea":
      return (
        <div className="flex justify-around min-w-[80vh] max-w-[80vh]">
          <PolarArea data={data} options={options} />
        </div>
      );
  }
}
