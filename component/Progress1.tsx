import React, { useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
const Progress1 = () => {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  useEffect(() => {
    console.log("active", active);
  }, [active]);

  return (
    <div
      className={`w-64 h-64  rounded-full `}
      style={{ border: `3px solid ${active ? "red" : "transparent"}` }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <CircularProgressbarWithChildren value={24} strokeWidth={10}>
        <p
          className="absolute right-0 text-white"
          style={{ writingMode: "vertical-rl" }}
        >
          24%
        </p>
        {/* <CircularProgressbar value={50} className="w-52" tex /> */}
        <div
          style={{
            width: "72%",

            borderRadius: "999px",
            margin: 0,
            padding: 0,
          }}
          onMouseEnter={() => {
            setActive2(true);
            setActive(false);
            setActive3(false);
          }}
          onMouseLeave={() => {
            setActive2(false);
          }}
        >
          <CircularProgressbarWithChildren
            strokeWidth={14}
            value={32}
            styles={buildStyles({
              pathColor: `rgba(62, 152, 199, ${32 / 100})`,
              trailColor: "#413d3d35",
              pathTransitionDuration: 0.5,
            })}
          >
            <p
              className=" absolute text-right w-full text-white"
              style={{ writingMode: "vertical-rl" }}
            >
              32%
            </p>
            <div
              style={{
                width: "64%",
                border: `3px solid ${active2 ? "blue" : "transparent"}`,
              }}
              className="bg-red-500 rounded-full"
              onMouseEnter={() => {
                setActive3(true);
                setActive(false);
                setActive2(false);
              }}
              onMouseLeave={() => setActive2(false)}
            >
              <CircularProgressbarWithChildren
                strokeWidth={18}
                value={48}
                styles={buildStyles({
                  pathColor: "blue",
                  trailColor: "#413d3d35",
                })}
              >
                <p
                  className=" absolute text-xs text-right w-full text-white"
                  style={{ writingMode: "vertical-rl" }}
                >
                  48%
                </p>
                <p className="text-xs">20</p>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Progress1;
