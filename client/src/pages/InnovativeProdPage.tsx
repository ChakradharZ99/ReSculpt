import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { InnovativeProdOverview } from "../components/InnovativeProdOverview";
import { Loading } from "../components/Loading";
import { loadStripe } from "@stripe/stripe-js";

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

export const InnovativeProdPage = () => {
  const { id } = useParams<{ id: string }>();
  const [innovativeProd, setInnovativeProd] = useState<InnovativeProd | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchInnovativeProd = async () => {
      try {
        setLoading(true);
        const response = await axios.get<InnovativeProd>(`${BACKEND_URL}/product/${id}`);
        setInnovativeProd(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching innovative product:", error);
        setError("Failed to fetch innovative product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchInnovativeProd();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!innovativeProd) {
    return <div>No product data available</div>;
  }

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51OKk8pSA4aQ6D7MfcNFH6ygysSg8xougwZV4QArep010L9inIqgvU55ColAabtVKZmorhbrkEcq0cVtvGxtUBK8j00cZpKEsaS");
    const body = { products: [innovativeProd] };

    try {
      const response = await axios.post(`${BACKEND_URL}/create-checkout-session`, body);
      const session = response.data;

      if (session.id) {
        const result = await stripe!.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
          console.log(result.error.message);
        }
      } else {
        console.log("Failed to create Stripe checkout session");
      }
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
    }
  };

  return (
    <div>
      <InnovativeProdOverview
        productId={0}
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
        updatedAt={innovativeProd.updatedAt}
        makePayment={makePayment}
      />
    </div>
  );
};