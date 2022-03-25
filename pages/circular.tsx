import React, { useEffect, useRef, useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import Tooltip from "../component/Tooltip";

const Circular = () => {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  //   const [show]
  const ref = useRef(null);
  useEffect(() => {
    console.log("ref", ref);
  }, [ref]);
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-screen ">
        <div
          className="relative w-64 h-64 z-2 rounded-full "
          //   ref={ref}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          style={{ border: "10px solid transparent" }}
        >
          {/* <Tooltip direction="right" delay={400} content="16"> */}
          <CircularProgressbar
            // onMouseEnter={(e) => console.log(ref.current === e.target)}
            counterClockwise={true}
            className="w-full h-full relative"
            value={16}
            styles={buildStyles({
              pathColor: "orange",
              textColor: "red",
              trailColor: "#413d3d35",
            })}
          />
          {active && <div className="absolute top-0">d</div>}
          {/* </Tooltip> */}
        </div>

        <div
          className=" absolute w-52  top-1/2 left-1/2 p-1 rounded-full"
          style={{
            transform: "translate(-50%, -50%)",
            border: "10px solid transparent",
          }}
          onMouseEnter={() => setActive2(true)}
          onMouseLeave={() => setActive2(false)}
        >
          {/* <Tooltip direction="right" delay={400} content="50"> */}
          <CircularProgressbar
            className="w-full h-full rounded-full "
            value={50}
            styles={buildStyles({
              pathColor: "blue",
              textColor: "red",
              trailColor: "#413d3d35",
            })}
          />
          {active2 && <div className="absolute top-12">50</div>}
          {/* </Tooltip> */}
        </div>

        <div
          className=" absolute w-30 rounded-full top-1/2 p-1 left-1/2 "
          style={{ transform: "translate(-50%, -50%)" }}
          onMouseEnter={() => setActive3(true)}
          onMouseLeave={() => setActive3(false)}
        >
          {/* <Tooltip content="75dd"> */}
          <CircularProgressbar
            counterClockwise={true}
            className="w-full h-full rounded-full "
            value={75}
            styles={buildStyles({
              pathColor: "purple",
              textColor: "red",
              trailColor: "#413d3d35",
              pathTransitionDuration: 200,
              textSize: 22,
            })}
          />
          {active3 && <div className="absolute bottom-12  tooltip">75</div>}
          {/* </Tooltip> */}
        </div>
        <div
          className=" absolute w-32 rounded-full top-1/2 left-1/2 flex items-center justify-center"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <p className="w-full text-center text-3xl">75</p>
        </div>
      </div>

      {/* v2 */}
      <div className="w-full flex items-center justify-center pb-36 ">
        <div
          className="w-80 rounded-full "
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          style={{ border: "10px solid transparent" }}
        >
          <CircularProgressbarWithChildren
            value={75}
            className="rounded-full"
            text={"dsa"}
            strokeWidth={8}
            styles={buildStyles({
              pathColor: "#f00",
              trailColor: "#413d3d35",
            })}
          >
            {active && <div className="absolute top-0">d</div>}
            {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
            <div
              style={{ width: "82%" }}
              onMouseEnter={() => {
                setActive2(true);
                setActive(false);
              }}
              onMouseLeave={() => setActive2(false)}
            >
              <CircularProgressbarWithChildren
                className=""
                counterClockwise={true}
                value={75}
                strokeWidth={8}
                styles={buildStyles({
                  pathColor: "green",
                  trailColor: "#413d3d35",
                })}
              >
                {active2 && <div className="absolute top-0">e</div>}
                <div
                  className="relative"
                  style={{ width: "80%" }}
                  onMouseEnter={() => {
                    setActive3(true);
                    setActive(false);
                    setActive2(false);
                  }}
                  onMouseLeave={() => setActive3(false)}
                >
                  <CircularProgressbar
                    className="relative"
                    value={70}
                    styles={buildStyles({
                      pathColor: "blue",
                      trailColor: "#413d3d35",
                    })}
                  />
                  {active3 && <div className="absolute top-20">3</div>}
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </>
  );
};

export default Circular;
