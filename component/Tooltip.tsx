import React, { useState } from "react";

const Tooltip = ({
  delay,
  children,
  direction,
  content,
}: {
  delay?: number;
  children: JSX.Element;
  direction?: string;
  content: string;
}) => {
  let timeout: any;
  const [active, setActive] = useState(false);
  const showTip = () => {
    setActive(true);
  };
  const hideTip = () => {
    setActive(false);
  };
  return (
    <div
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      data-tooltip-target="tooltip-default"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}

      {/* <div
        className={`bg-blue-500 p-2 w-10  tooltip ${
          active ? " absolute top-10" : "hidden"
        }`}
        // className={`tooltip absolute left-0 top-0 bg-blue-500  shadow-2xl p-3 ${
        //   active ? "" : "hidden"
        // }  `}
      >
        <p className="">{content}</p>
      </div> */}
      <p className="tooltip bg-red-500">{content}</p>
    </div>
  );
};

export default Tooltip;
