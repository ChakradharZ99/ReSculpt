import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { WasteReqOverview } from "../components/WasteReqOverview";
import { Loading } from "../components/Loading";

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

export const WasteReqPage = () => {
  const { id } = useParams<{ id: string }>();
  const [wasteRequirement, setWasteRequirement] = useState<WasteRequirement | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    const fetchWasteRequirement = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/requirement/${id}`);
        setWasteRequirement(response.data);
      } catch (error) {
        console.error("Error fetching waste requirement:", error);
      }
    };
    fetchWasteRequirement();
  }, [id]);

  if (!wasteRequirement) {
    return <Loading/>;
  }

  return (
    <div>
      <WasteReqOverview 
      requirementId={wasteRequirement.requirementId} 
      image={wasteRequirement.image} 
      name={wasteRequirement.name} 
      description={wasteRequirement.description} 
      price={wasteRequirement.price} 
      initialQuantity={wasteRequirement.initialQuantity} 
      requiredQuantity={wasteRequirement.requiredQuantity} 
      color={wasteRequirement.color} 
      material={wasteRequirement.material} 
      weight={wasteRequirement.weight} 
      length={wasteRequirement.length} 
      width={wasteRequirement.width} 
      height={wasteRequirement.height} 
      uploaderId={wasteRequirement.uploaderId} 
      createdAt={""} 
      updatedAt={""}/>
      
    </div>
  );
};