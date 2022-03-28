import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartOg,
  ArcElement,
  Tooltip,
  Title,
  ChartData,
} from "chart.js";
ChartOg.register([ArcElement, Tooltip, Title, ChartDataLabels]);
const percentage = (partialValue: number, totalValue: number) => {
  return (Math.min(partialValue, totalValue) / totalValue) * 100;
};
//sample-data
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

const HalfDonut = ({
  statement,
  setStatement,
}: {
  statement: string;
  setStatement: (x: string) => void;
}) => {
  function getColor(value: number) {
    //value from 0 to 1
    var hue = ((12 + value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }

  //adamData.day.scoreBreakdown.contributors.points / possiblePoints, name
  const chartData: ChartData<"doughnut"> = {
    // labels: ["Coding Activity", "Working Hours", "Breaks", "Branches"],
    datasets: adamData.day.scoreBreakdown.contributors.map((d: any) => {
      return {
        label: d.displayName,
        data: [d.points, d.possiblePoints - d.points],
        backgroundColor: [
          getColor(percentage(d.points, d.possiblePoints) * 100),
          "#413d3d35",
        ],
      };
    }),
  };

  return (
    <div className="w-64  mx-auto h-full flex items-center justify-center">
      <Doughnut
        data={chartData}
        options={{
          circumference: 180, //if I want a half circle
          rotation: 270,
          cutout: "10%", //size of the middle circle
          onHover: function (_, element) {
            if (!element[0]) return; //if we hover out
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
          },
          plugins: {
            datalabels: {
              color: "black",
              backgroundColor: "white",
              borderRadius: 3,
              padding: 2,
              font: {
                size: 11,
                weight: "bold",
              },
              //if you want to
              //   textAlign: "left",
              //   rotation: function (ctx) {
              //     const valuesBefore = ctx.dataset.data
              //       .slice(0, ctx.dataIndex)
              //       //@ts-ignore
              //       .reduce((a, b) => a + b, 0);
              //     //@ts-ignore
              //     const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              //     const rotation =
              //       //@ts-ignore
              //       ((valuesBefore + ctx.dataset.data[ctx.dataIndex] / 2) / sum) *
              //       360;
              //     return rotation < 180 ? rotation - 90 : rotation + 90;
              //   },
              textAlign: "end",
              formatter: function (value, context) {
                // console.log("value", value);
                // console.log("context", context);
                const current =
                  adamData.day.scoreBreakdown.contributors[
                    context.datasetIndex
                  ];
                // console.log("current", current);
                const percentString = percentage(
                  current.points,
                  current.possiblePoints
                );
                if (context.dataIndex === 1) {
                  return ``;
                }
                return `${Math.round(percentString)}%`;
              },
            },
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
                  // context.dataIndex === 1 is points remaining
                  if (context.dataIndex === 1)
                    return `${
                      current.possiblePoints - points
                    } points remaining.`;
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

export default HalfDonut;
