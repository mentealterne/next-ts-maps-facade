import { FunctionComponent } from "react";
import { Button } from "@/app/components/controls";
import Image from "next/image";

interface IProps {
  textContent: string;
}
const InfoWindow: FunctionComponent<IProps> = (props) => {
  return (
    <div className={"flex flex-col "}>
      <p className={"text-gray-700 font-bold"}>{props.textContent}</p>;
      <Image src={"/rick.jpeg"} alt={"Rick"} width={"100"} height={"60"} />
    </div>
  );
};

export default InfoWindow;
