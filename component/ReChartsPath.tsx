// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// // const Slice = ({ pie }: { pie: any }) => {
// //   // let arc = d3.arc().innerRadius(0).outerRadius(100);
// //   let interpolateInner = d3.interpolateRgb("#eaaf79", "#bc3358");
// //   return pie.map((slice: any, index: number) => {
// //     let sliceColor = interpolateInner(index / pie.length - 1);
// //     return (
// //       <Path radius={130} slice={slice} sliceColor={sliceColor} key={index} />
// //     );
// //   });
// // };

// // const Path = ({
// //   radius,
// //   slice,
// //   sliceColor,
// // }: {
// //   radius: any;
// //   slice: any;
// //   sliceColor: any;
// // }) => {
// //   const [isHovering, setIsHovering] = useState(false);
// //   const [outerRadius, setOuterRadius] = useState(0);
// //   const [innerRadius, setInnerRadius] = useState(0);
// //   const dataset2 = [2, 4];
// //   const interpolateOutter = d3.interpolateRgb("#36384b", "#4992ab");
// //   const arc = d3
// //     .arc()
// //     .innerRadius(innerRadius)
// //     .outerRadius(outerRadius)
// //     .padAngle(0.01)
// //     .cornerRadius(2);
// //   let outterPie = d3
// //     .pie()
// //     .startAngle(slice.startAngle)
// //     .endAngle(slice.endAngle);

// //   const arc2 = d3
// //     .arc()
// //     .innerRadius(outerRadius * 1.01)
// //     .outerRadius(outerRadius * 1.3)
// //     .padAngle(0.005)
// //     .cornerRadius(0);

// //   useEffect(() => {
// //     const outerRadius = isHovering ? radius * 1.1 : radius;
// //     const innerRadius = radius * 0.7;
// //     setOuterRadius(outerRadius);
// //     setInnerRadius(innerRadius);
// //   }, [isHovering, radius, outerRadius]);
// //   return (
// //     <g>
// //       <path
// //         d={arc(slice) as any}
// //         fill={sliceColor}
// //         onMouseOver={() => setIsHovering(true)}
// //         onMouseOut={() => setIsHovering(false)}
// //       />
// //       {outterPie(dataset2).map((outterSlice, index) => {
// //         let sliceColorOutter = interpolateOutter(
// //           index / (outterPie(dataset2).length - 1)
// //         );

// //         return (
// //           <path
// //             d={arc2(outterSlice as any) as any}
// //             fill={sliceColorOutter}
// //             key={index}
// //           />
// //         );
// //       })}
// //       {isHovering && <circle r={innerRadius * 0.95} fill={sliceColor} />}
// //     </g>
// //   );
// // };

// const ReChartsPath = ({
//   dataProps,
//   width,
//   height,
//   innerRadius,
//   outerRadius,
// }: {
//   dataProps: any[];
//   width: number;
//   height: number;
//   innerRadius: number;
//   outerRadius: number;
// }) => {
//   const ref = useRef(null);
//   const cache = useRef(dataProps);
//   const createPie = d3
//     .pie()
//     .value((d) => d.valueOf())
//     .sort(null);
//   const createArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
//   const colors = d3.scaleOrdinal(d3.schemeCategory10);
//   const format = d3.format(".2f");

//   useEffect(() => {
//     console.log(cache);
//     if (!dataProps || !cache) return;
//     const data = createPie(dataProps);
//     const prevData = createPie(cache.current);
//     const group = d3.select(ref.current);
//     const groupWithData = group.selectAll("g.arc").data(data);

//     groupWithData.exit().remove();

//     const groupWithUpdate = groupWithData
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     const path = groupWithUpdate
//       .append("path")
//       .merge(groupWithData.select("path.arc"));

//     const arcTween = (d: any, i: number) => {
//       const interpolator = d3.interpolate(prevData[i], d);

//       return (t) => createArc(interpolator(t));
//     };

//     path
//       .attr("class", "arc")
//       .attr("fill", (d, i) => colors(i))
//       .transition()
//       .attrTween("d", arcTween);

//     const text = groupWithUpdate
//       .append("text")
//       .merge(groupWithData.select("text"));

//     text
//       .attr("text-anchor", "middle")
//       .attr("alignment-baseline", "middle")
//       .style("fill", "white")
//       .style("font-size", 10)
//       .transition()
//       .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
//       .tween("text", (d, i, nodes) => {
//         const interpolator = d3.interpolate(prevData[i], d);

//         return (t) => d3.select(nodes[i]).text(format(interpolator(t).value));
//       });

//     cache.current = dataProps;
//   }, [dataProps]);

//   return (
//     <svg width={width} height={height}>
//       <g ref={ref} transform={`translate(${outerRadius} ${outerRadius})`} />
//     </svg>
//   );
// };
// export default ReChartsPath;

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
const ReChartsPath = (props: any) => {
  const ref = useRef(null);
  const createPie = d3.pie().sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

  useEffect(() => {
    console.log("ref", ref.current);
    if (!props.data) return;
    const data = createPie(props.data);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors(i));

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text((d) => format(d.value));
  }, [props.data]);

  return (
    <svg width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
  );
};

export default ReChartsPath;
