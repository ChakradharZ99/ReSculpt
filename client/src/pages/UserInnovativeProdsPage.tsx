import { useState, useEffect } from "react";
import axios from "axios";
import { InnovativeProdOverview } from "../components/InnovativeProdOverview";
import { Loading } from "../components/Loading";
import { NoData } from "../components/NoData";

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

export const UserInnovativeProdsPage = () => {
  const [innovativeProds, setInnovativeProds] = useState<InnovativeProd[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchInnovativeProds = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ uploadedItems: InnovativeProd[] }>(`${BACKEND_URL}/getUploadedProducts`);
        console.log(response.data.uploadedItems);
        setInnovativeProds(response.data.uploadedItems);
        setError(null);
      } catch (error) {
        console.error("Error fetching innovative products:", error);
        setError("Failed to fetch innovative product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchInnovativeProds();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (innovativeProds.length === 0) {
    return <div><NoData text={"You haven't uploaded any Innovative products in the market place"}/></div>;
  }

  return (
    <div>
      {innovativeProds.map((innovativeProd, index) => (
        <InnovativeProdOverview 
          key={index}
          productId={innovativeProd.productId}
          image={innovativeProd.image}
          name={innovativeProd.name}
          description={innovativeProd.description}
          price={innovativeProd.price}
          quantity={innovativeProd.quantity}
          color={innovativeProd.color}
          material={innovativeProd.material}
          weight={innovativeProd.weight}
          length={innovativeProd.length}
          width={innovativeProd.width}
          height={innovativeProd.height}
          uploaderId={innovativeProd.uploaderId}
          createdAt={innovativeProd.createdAt}
          updatedAt={innovativeProd.updatedAt} makePayment={undefined}        />
      ))}
    </div>
  );
};
