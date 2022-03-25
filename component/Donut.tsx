import { ChartData } from "chart.js";
import React, { useMemo, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartOg,
  ArcElement,
  ChartConfiguration,
  Tooltip,
  Title,
} from "chart.js";
ChartOg.register([ArcElement, Tooltip, Title]);
const percentage = (partialValue: number, totalValue: number) => {
  return (Math.min(partialValue, totalValue) / totalValue) * 100;
};
const adamData: any = {
  day: {
    __typename: "Day",
    date: "2022-03-25",
    score: 69,
    scoreBreakdown: {
      __typename: "DayScore",
      points: 69,
      contributors: [
        {
          __typename: "DayScoreContributor",
          name: "target_work_hours",
          displayName: "Target work hours",
          points: 28,
          possiblePoints: 45,
          hints: [
            {
              __typename: "DayScoreContributorHint",
              name: "duration",
              unit: "hours",
              targetValue: 8,
              currentValue: 5,
            },
          ],
        },
        {
          __typename: "DayScoreContributor",
          name: "target_activity_duration",
          displayName: "Target activity duration",
          points: 31,
          possiblePoints: 45,
          hints: [
            {
              __typename: "DayScoreContributorHint",
              name: "duration",
              unit: "ms",
              targetValue: 14400000,
              currentValue: 12265867,
            },
            {
              __typename: "DayScoreContributorHint",
              name: "average_sessions",
              unit: "sessions_per_hour",
              targetValue: 3,
              currentValue: 3.4,
            },
          ],
        },
        {
          __typename: "DayScoreContributor",
          name: "target_rest",
          displayName: "Target rest",
          points: 5,
          possiblePoints: 5,
          hints: [],
        },
        {
          __typename: "DayScoreContributor",
          name: "penalize_default_branch_usage",
          displayName: "Penalize default branch usage",
          points: 5,
          possiblePoints: 5,
          hints: [],
        },
      ],
    },
  },
};
const backgroundColors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
];
const Donut = ({
  statement,
  setStatement,
}: {
  statement: string;
  setStatement: (x: string) => void;
}) => {
  //   console.log()

  //adamData.day.scoreBreakdown.contributors.points / possiblePoints, name
  const chartData: ChartData = {
    // labels: ["Coding Activity", "Working Hours", "Breaks", "Branches"],
    datasets: adamData.day.scoreBreakdown.contributors.map((d: any) => {
      //   console.log("d", d);
      const color1 =
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

      const color2 =
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
      console.log("color1", color1);
      let secondNum = d.points * (percentage(d.points, d.possiblePoints) / 100);
      console.log("secondNum", secondNum);
      //ratio based so we need to do some conversions
      let data;
      if (d.points / d.possiblePoints === 1) {
        data = [d.points];
      } else {
        data = [d.points, secondNum];
      }
      //   console.log("d", d);
      return {
        label: d.displayName,
        data: data,
        backgroundColor: [color1, "#413d3d35"],
      };
    }),
    // datasets: [
    //   {
    //     label: "Coding Activity",
    //     data: [14, 45],
    //     backgroundColor: [
    //       "rgb(255, 99, 132)",
    //       "rgb(54, 162, 235)",
    //       "rgb(255, 205, 86)",
    //     ],
    //   },
    //   {
    //     label: "Working Hours",
    //     data: [10, 45],
    //     backgroundColor: ["orange", "green"],
    //   },
    // ],
  };
  //   const options: ChartConfiguration = {
  //     options: {
  //       backgroundColor: "green",
  //     },
  //   };
  const [hoverableData, setHoverableData] = useState<any>();
  const [data3, setData3] = useState();
  //   console.log(hoverableData);

  //   console.log("chartData", chartData);
  return (
    <div className="w-1/2 mx-auto h-full flex items-center justify-center">
      <Chart
        // onMouseEnter={(e) => console.log(e.target)}
        data={chartData}
        type="doughnut"
        options={{
          onHover: function (evt, element) {
            // console.log("evt", evt);
            if (!element[0]) return;
            // console.log("element", element[0].datasetIndex);
            // console.log(
            //   adamData.day.scoreBreakdown.contributors[element[0].datasetIndex]
            // );
            const current =
              adamData.day.scoreBreakdown.contributors[element[0].datasetIndex];
            const percentString = percentage(
              current.points,
              current.possiblePoints
            );
            setStatement(
              `${current.points} / ${current.possiblePoints} of ${
                current.displayName
              } (${Math.round(percentString)}%)`
            );
            // adamData.day.scoreBreakdown.contributors.forEach(
            //   (d: any, i: number) => {
            //   }
            // );
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  //   console.log("context", context.dataset.label);
                  //   console.log("context", context);
                  const current =
                    adamData.day.scoreBreakdown.contributors[
                      context.datasetIndex
                    ];

                  const points = context.dataset.data[0];
                  const possiblePoints = context.dataset.data[1];

                  return `${points} / ${current.possiblePoints} of ${context.dataset.label}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Donut;
