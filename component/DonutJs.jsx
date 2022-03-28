import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartOg, ArcElement, Tooltip, Title } from "chart.js";

ChartOg.register([ArcElement, Tooltip, Title, ChartDataLabels]); // we need to set this in order to get the other functionality working - tooltips, datalabels, arc

//get the completion percentage
const percentage = (partialValue, totalValue) => {
  return (Math.min(partialValue, totalValue) / totalValue) * 100;
};
//transition from red - green based on the percentage of completion
function getColor(value) {
  //value from 0 to 1
  var hue = (value * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
}
const getDatasetsForDonut = (contributors) => {
  //datasets is where the data lives, each "data in here represents one layer"
  //map through scoreBreakdown.contributors here to programatically set the data inside datasets
  // datasets return label - name that can be identified by the tooltip
  // data = [x:points, y:points remaining(possiblePoints - points)]
  //background color: [firstColor, 'pathColor']
  const data = contributors.map((contributor) => {
    return {
      label: contributor.displayName,
      data: [
        contributor.points,
        contributor.possiblePoints - contributor.points,
      ],
      backgroundColor: [
        getColor(
          percentage(contributor.points, contributor.possiblePoints) / 100
        ),
        "#413d3d35",
      ],
    };
  });
  return data; //data = makeup for the dataset
};

const DonutInJs = ({ setStatement, contributors }) => {
  //https://www.chartjs.org/docs/latest/api/
  return (
    <div className="mx-auto " style={{ width: 250, height: 250 }}>
      <Doughnut
        data={{
          datasets: getDatasetsForDonut(contributors),
        }}
        options={{
          //   circumference: 180, //if I want a half circle
          //   rotation: 270, // to correct half circle orientation
          cutout: "10%", //size of the middle circle
          //do stuff on hover - here we can update what we can extract data based on what we are hovering on ex) update state to show score breakdown
          onHover: function (_, element) {
            if (!element[0]) return; //throws error without this, if we hover out throws error because there is nothing in element 0 after hovering away so do nothing when we hover out
            const current = contributors[element[0].datasetIndex];
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
          //https://www.chartjs.org/docs/latest/developers/plugins.html
          plugins: {
            // customimzing the labels that are on the layers itself
            //context.dataIndex = remember above data is an arra of 2 numbers [points, points remaining]
            //context.datasetIndex = index of the data inside the dataset - ex) index 0 = target works hours numbers [points, points remaining]
            datalabels: {
              color: "black",
              backgroundColor: function (context) {
                if (context.dataIndex > 0) {
                  return "";
                } else {
                  return "white";
                }
              },
              borderRadius: 3,
              padding: 2,
              font: {
                size: 10,
                weight: "bold",
              },
              //if you want to try rotating the data labels.
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
              // formats what the datalabel says
              formatter: function (_, context) {
                const completionPercent = percentage(
                  context.dataset.data[0],
                  context.dataset.data[0] + context.dataset.data[1]
                );
                if (context.dataIndex === 1) {
                  return ``;
                }
                return `${Math.round(completionPercent)}%`;
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  //   console.log("context", context); //all info of the doughnut layer lives in context based.
                  // context.dataset.data[0] = points /  context.dataset.data[1] = possiblePoints - points;
                  const current = contributors[context.datasetIndex];
                  //get possible points by adding the two together
                  const points = context.dataset.data[0];
                  const totalPoints =
                    context.dataset.data[0] + context.dataset.data[1];

                  // context.dataIndex === 1 is points remaining
                  if (context.dataIndex === 1)
                    return `${
                      current.possiblePoints - points
                    } points remaining.`;
                  return `${points} / ${totalPoints} of ${context.dataset.label}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DonutInJs;
