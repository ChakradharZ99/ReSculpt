import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import axios from "axios";
import { TextRevealCardPreview } from "../components/text-reveal-cardComponent";
import { Loading } from "../components/Loading";

export const UploadInnovativeProdsPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    transformFile(file);
  };

  const transformFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/addInnovativeProd`,
        {
          image: uploadedImage,
          name,
          description,
          price,
          quantity,
          color,
          material,
          weight,
          length,
          width,
          height,
        }
      );
      setLoading(false);
      alert(response.data.msg);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <TextRevealCardPreview
            title={"Glad to see you here..."}
            text={"You know the art"}
            revealText={"We provide value for art"}
          />
          <div className="max-w-5xl w-full mx-auto">
            <div className="bg-white text-black p-8 rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <SubHeading text={"Upload Your Innovative Product Details"} />
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/"
                  className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-black file:text-white
          hover:file:bg-black"
                />
                <InputBox
                  label={"Name of the Product"}
                  type={"text"}
                  placeholder={""}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputBox
                  label={"Description of the Product"}
                  type={"text"}
                  placeholder={""}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <InputBox
                  label={"Price"}
                  type={"number"}
                  placeholder={""}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
                <InputBox
                  label={"Quantity"}
                  type={"number"}
                  placeholder={""}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <InputBox
                  label={"Color"}
                  type={"text"}
                  placeholder={""}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                
                <InputBox
                  label={"Material"}
                  type={"text"}
                  placeholder={""}
                  onChange={(e) => setMaterial(e.target.value)}
                />
                <InputBox
                  label={"Weight in grams"}
                  type={"number"}
                  placeholder={""}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                />
                <p className="font-bold mt-6 mb-2">
                  Dimensions of the product
                </p>
                <InputBox
                  label={"Length in centi-meters"}
                  type={"number"}
                  placeholder={""}
                  onChange={(e) => setLength(parseFloat(e.target.value))}
                />
                <InputBox
                  label={"Width in centi-meters"}
                  type={"number"}
                  placeholder={""}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                />
                <InputBox
                  label={"Height in centi-meters"}
                  type={"number"}
                  placeholder={""}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                />
                <Button text={"Submit"} onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
