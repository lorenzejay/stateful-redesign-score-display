import React, { useState } from "react";
import Donut from "../component/Donut";

import Progress1 from "../component/Progress1";
import ReChartsPath from "../component/ReChartsPath";

const CircularComp = () => {
  const [statement, setStatement] = useState("default");

  return (
    <div className="h-screen w-full">
      <div className="pt-10">
        <Donut statement={statement} setStatement={setStatement} />
      </div>
      <p className="mt-10 rounded-md bg-gray-300 shadow-md w-1/2 lg:w-1/4 mx-auto p-3 text-center">
        {statement}
      </p>
    </div>
  );
};

export default CircularComp;
