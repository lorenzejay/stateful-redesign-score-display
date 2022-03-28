import React, { useState } from "react";
import Donut from "../component/Donut";

import Progress1 from "../component/Progress1";
import ReChartsPath from "../component/ReChartsPath";

const CircularComp = () => {
  const [statement, setStatement] = useState("default");

  return (
    <div className="h-screen w-full">
      {/* das */}
      {/* <ReChartsPath
        data={data}
        width={200}
        height={200}
        innerRadius={60}
        outerRadius={100}
      /> */}
      {/* <Progress1 /> */}
      <div className="pt-10">
        <Donut statement={statement} setStatement={setStatement} />
      </div>
      <p className="mx-auto w-full text-center">{statement}</p>
      {/* <DonutChart
        legend={false}
        data={[
          { label: "Completed", value: 50 },
          // {
          //   label: "",
          //   value: 50,
          //   isEmpty: true,
          // },
        ]}
      /> */}
    </div>
  );
};

export default CircularComp;
