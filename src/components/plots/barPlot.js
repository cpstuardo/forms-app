import { Bar } from "@nivo/bar";
import { BsFillCircleFill } from "react-icons/bs";
import "../../App.css";

const MyBar = ({ data, screenWidth }) => (
  <Bar
    data={data}
    keys={["count"]}
    height={300}
    width={screenWidth > 600 ? 800 : 550}
    indexBy="userName"
    colorBy="indexValue"
    margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
    maxValue={20}
    padding={0.1}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Encuestador",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Encuestas realizadas",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    markers={[
      {
        axis: "y",
        value: 15,
        lineStyle: { stroke: "rgba(0, 0, 0, .35)", strokeWidth: 2 },
        legend: "Objetivo",
        legendOrientation: "horizontal",
      },
    ]}
    tooltip={(d) => {
      return (
        <div className="tooltip">
          <BsFillCircleFill size={10} color={d.color} />
          {d.data.userName}: {d.data.count}{" "}
        </div>
      );
    }}
  />
);

export default MyBar;
