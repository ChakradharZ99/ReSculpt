import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDCardDemo } from "./3d-cardComponent";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

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

export const GetWasteReq = () => {
  const [wasteRequirements, setWasteRequirements] = useState<WasteRequirement[]>([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchWasteRequirements = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/getWasteRequirements`);
        setWasteRequirements(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching waste requirements:", error);
        setLoading(false);
      }
    };
    fetchWasteRequirements();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-60 h-60">
            <Lottie animationData={loadingAnimation} />
          </div>
        </div>
      ) : (
        <div className="sm:w-screen overflow-x-auto">
          <div className="flex flex-row">
            {wasteRequirements.map((requirement) => (
              <div key={requirement.requirementId} className="mx-4">
                <ThreeDCardDemo
                  image={requirement.image}
                  name={requirement.name}
                  description={requirement.description}
                  link={`/requirement/${requirement.requirementId}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};