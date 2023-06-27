import { FunctionComponent } from "react";
import Controls from "@/app/components/controls";
import State from "@/app/components/state";

const MapComponent: FunctionComponent = () => {
  return (
    <div className={"flex flex-col gap-4"}>
      <div id={"map"} className={"w-full h-80 bg-white"}></div>
      <Controls />
      <State />
    </div>
  );
};

export default MapComponent;
