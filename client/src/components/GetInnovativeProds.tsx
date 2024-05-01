import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDCardDemo } from "./3d-cardComponent";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

interface InnovativeProd {
  productId: number;
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
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

export const GetInnovativeProds = () => {
  const [innovativeProd, setInnovativeProd] = useState<InnovativeProd[]>([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchInnovativeProds = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/getAllInnovativeProds`);
        setInnovativeProd(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching innovative products:", error);
        setLoading(false);
      }
    };
    fetchInnovativeProds();
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
        <div className="w-screen overflow-x-auto">
          <div className="flex flex-row">
            {innovativeProd.map((product) => (
              <div key={product.productId} className="mx-4">
                <ThreeDCardDemo
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  link={`/product/${product.productId}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};