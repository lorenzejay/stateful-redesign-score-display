Setup
`npm install`
`npm run dev`

In your browser go to http://localhost:3000/ or http://localhost:3000/circularComp

To access Donut Component go to `component/Donut.tsx`
Page lives on - `/pages/circularComp.tsx` and on `/pages/index.tsx`

### If used externally - import the packages

`npm i react-chartjs-2 chart chart.js chartjs-plugin-datalabels`

## How to use

import DonutInJs - you can rename on your component
`statement` is the text you want it to display on the parent component -> this will be modified in the hover effect of the Donut.
`contributors` is the data with the scoreBreakdown
`adamData` is used as a placeholder for the queried data

```
  `parent component`
  <DonutInJs
            setStatement={setStatement}
            contributors={adamData.day.scoreBreakdown.contributors}
          />
```

DonutInJs

```
//function used to fill data inside dataseta - can be imported in if written elsewhere
const getDatasetsForDonut = (contributors) => {
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
```

<Donut>
## Notes

Edit labels on Donut Comp plugins - label

```
<Doughnut
...
 plugins: {
            datalabels: {
              color: "black",
              backgroundColor: "white",
              borderRadius: 3,
              padding: 2,
              font: {
                size: 11,
                weight: "bold",
              },...
            }
```

## Tech Used

1. React
2. React-chartjs-2 - https://www.npmjs.com/package/react-chartjs-2
3. Chart.js - https://www.chartjs.org/
4. chartjs-plugin-datalabels - https://www.npmjs.com/package/chartjs-plugin-datalabels (to create the labels)

## Chart.JS Resources

https://www.chartjs.org/docs/latest/api/
https://www.chartjs.org/docs/latest/charts/doughnut.html
https://quickchart.io/documentation/chart-js/custom-pie-doughnut-chart-labels/
https://www.chartjs.org/docs/latest/developers/plugins.html
