Setup
`npm install`
`npm run dev`

In your browser go to http://localhost:3000/ or http://localhost:3000/circularComp

To edit Donut Component go to `component/Donut.tsx`
Page lives on - `/pages/circularComp.tsx` and on `/pages/index.tsx`

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
