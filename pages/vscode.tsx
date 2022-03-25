import React, { useState } from "react";
import GaugeChart from "react-gauge-chart";
import Modal from "../component/Modal";
import Stats from "../component/stats";

const Vscode = () => {
  const [addNewObjective, setAddNewObjective] = useState(false);
  const [newObjective, setNewObjective] = useState("");
  return (
    <div className=" flex flex-col items-center justify-center w-full">
      <div className="my-10 flex flex-row justify-around items-center w-1/2 h-44 p-4 border rounded-xl shadow-xl">
        <div className=" flex items-center  shrink-0 w-20 h-20 mr-2">
          <img
            src="./ljaph-4.jpg"
            className="  rounded-full object-cover object-top w-full h-full "
            alt="Profile Pic"
          />
        </div>

        <div className="space-y-1 px-4 flex flex-col flex-grow">
          <h2 className="text-3xl text-left">lorenzejay</h2>
          <p className="flex flex-row  text-md  font-light">
            🔥 Coding TypeScript React on <br /> profile-score-redesign # main
            in index.tsx
          </p>
        </div>
      </div>

      <div className="flex flex-col border px-10 pb-8 pt-5 w-1/2 bg-white shadow-2xl my-5 rounded-xl">
        <h2 className="text-3xl mb-5 tracking-wide">Perfomance</h2>

        <div className="text-white p-3 rounded-lg shadow-xl bg-blue-400 mt-2 mb-5">
          <p className="text-2xl">You're just getting started! 🔥</p>
          <p className="text-gray-200">1 / 5 objectives complete</p>
        </div>

        <div className=" relative">
          <GaugeChart
            style={{ width: 400, position: "relative" }}
            id="gauge-chart2"
            nrOfLevels={10}
            colors={["#F5CAD3", "#E98A9E", "#F62359"]}
            arcWidth={0.2}
            marginInPercent={0}
            percent={0.16}
            arcPadding={0}
            cornerRadius={0}
            textColor={"black"}
            hideText={true}
            className=" mx-auto relative"
            // animate={false}
          />
          <div className="z-10  absolute -bottom-7 w-full mx-auto flex items-center justify-center">
            <h2 className=" text-3xl bg-white    w-16 h-16 p-3 rounded-full mx-auto text-black shadow-2xl  border left-0 right-0     flex items-center justify-center">
              16
            </h2>
          </div>
        </div>

        <section className="mt-10">
          <div className="flex justify-between mb-3">
            <h2 className="text-3xl">Breakdown</h2>
            <button>
              <img
                src="/adjust.png"
                className="w-6 h-6"
                alt="Adjust personal objectives"
              />
            </button>
          </div>
          <ul className="w-full overflow-y-auto h-80 ">
            <li className="border-2 p-3 mb-3 h-20 border-green-400 rounded-lg bg-white shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xl">Push to Github.</p>
                <p className="text-gray-500">Completed</p>
              </div>
              <p className="text-xl text-green-400">+5</p>
            </li>
            <li className="border-2 p-3 mb-3 h-20 border-orange-400 rounded-lg bg-white shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xl">Coding activity: 11 of 45 pts</p>
                <p className="text-gray-500">
                  &#62; Duration 40m of 2h 30m goal.
                </p>
              </div>
              <p className="text-xl text-orange-400">+ 11</p>
            </li>
            <li className="border-2 p-3 mb-3 h-20 border-red-400 rounded-lg bg-white shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xl">Code on Java</p>
                <p className="text-gray-500">Not Started</p>
              </div>
              <p className="text-xl text-red-400">+0</p>
            </li>
            <li className="border-2 p-3 mb-3 h-20 border-red-400 rounded-lg bg-white shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xl">Write Tests</p>
                <p className="text-gray-500">Not Started</p>
              </div>
              <p className="text-xl text-red-400">+0</p>
            </li>
          </ul>

          <div className="w-full flex justify-center mt-3">
            <Modal bgColor="#0a36f8d9" modalName={"Add New Objective"}>
              dasdsa
            </Modal>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Vscode;
