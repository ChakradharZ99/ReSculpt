import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TextRevealCardPreview } from "../components/text-reveal-cardComponent";


export const ContributePage = () => {
  const { id } = useParams<{ id: string }>();
  const [mobile, setMobile] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // New state variable for loading

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true before making the API call

    try {
      const response = await axios.post(
        `${BACKEND_URL}/${id}`,
        { mobile, quantity, address }
      );
      alert(response.data.contribution);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // Set loading state to false after the API call is completed
    }
  };

  return (
    <>
      <TextRevealCardPreview
        title={"Glad to see you here..."}
        text={"I have a message for you"}
        revealText={"You are saving Earth"}
      />
      <div className="flex justify-center items-center">
        <div className="inline-block bg-white text-black p-8 rounded-3xl shadow-2xl">
          <SubHeading text={"Contribution Details"} />
          <InputBox
            label={"Contact:"}
            type={"text"}
            placeholder={""}
            onChange={(e) => setMobile(e.target.value)}
          />
          <InputBox
            label={"Quantity:"}
            type={"number"}
            placeholder={""}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <InputBox
            label={"Address:"}
            type={"text"}
            placeholder={""}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex justify-center mt-5">
            <Button text={"Contribute"} onClick={handleSubmit} />
          </div>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </>
  );
};
