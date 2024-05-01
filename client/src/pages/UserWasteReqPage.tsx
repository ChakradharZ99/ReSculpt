import  { useState, useEffect} from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { NoData } from "../components/NoData";

interface WasteRequirement {
  requirementId: number;
  image: string;
  name: string;
  description: string;
  price: number;
  initialQuantity: number;
  requiredQuantity: number;
  color: string | null;
  material: string | null;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  uploaderId: number;
  createdAt: string;
  updatedAt: string;
}

export const UserWasteReqPage = () => {
  const [wasteRequirement, setWasteRequirement] = useState<
    WasteRequirement[] | null
  >(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchWasteRequirement = async () => {
      try {
        const response = await axios.get<{ requirements: WasteRequirement[] }>(
          `${BACKEND_URL}/getUploadedWasteRequirements`
        );
        setWasteRequirement(response.data.requirements);
      } catch (error) {
        console.error("Error fetching waste requirement:", error);
      }
    };
    fetchWasteRequirement();
  }, []);

  if (!wasteRequirement) {
    return <Loading />;
  }

  if(wasteRequirement.length === 0){
    return <div>
      <NoData text={"You haven't uploaded any waste requirements"}/>
    </div>
  }



  return (
    <div>
      {wasteRequirement.map((requirement) => (
        <div
          key={requirement.requirementId}
          className="m-10 block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20"
        >
          <div className="col-span-5 grid grid-cols">
            <img src={requirement.image} className="w-screen" alt={requirement.name} />
          </div>

          <div className="col-span-4 pt-8 lg:pt-0">
            <div className="mb-7 border-b border-gray-300 pb-7">
              <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                {requirement.name}
              </h2>
              <p className="text-body text-sm leading-6 lg:text-base lg:leading-8">
                {requirement.description}
              </p>
              <div className="mt-5 flex items-center ">
                <span className="text-heading inline-block pr-2 font-semibold">
                  Required quantity:
                </span>
                <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                  {requirement.requiredQuantity}
                </div>
                <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                  {requirement.initialQuantity}
                </span>
              </div>
            </div>

            <div className="">
              <ul className="space-y-5 pb-1 text-sm">
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Price per each contribution:
                  </span>
                  {requirement.price}
                </li>
                {/* <button
                  type="button"
                  onClick={onclickHandler}
                  className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Pay to receive raw materials
                </button> */}
              </ul>
            </div>
            <div className="border-b border-gray-300 pb-3  "></div>

            <div className="py-6 ">
              <ul className="space-y-5 pb-1 text-sm">
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Weight:
                  </span>
                  {requirement.weight} gms
                </li>
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Color:
                  </span>
                  {requirement.color}
                </li>
              </ul>
            </div>

            <div className="border-b border-gray-300 pb-3  "></div>
            <div className="mb-4 mt-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                Dimensions
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                <li
                  key="length"
                  className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                >
                  {requirement.length}
                </li>
                <li
                  className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                >
                  X
                </li>

                <li
                  key="width"
                  className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                >
                  {requirement.width}
                </li>
                <li
                  className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                >
                  X
                </li>
                <li
                  key="height"
                  className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                >
                  {requirement.height}
                </li>
                <li
                  className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                >
                  cm
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
