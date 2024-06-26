import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { TextLink } from "../components/TextLink";
import { useState } from "react";
import axios from "axios";
import { SigninInput } from "@abhiram2k03/input-validation";
import Lottie from "lottie-react";
import signinAnimation from "../assets/signin.json";
import { Loading } from "../components/Loading"; // Import the Loading component

export const Signin = () => {
  const [signinData, setSigninData] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add the loading state

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true before making the API request

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, {
        email: signinData.email,
        password: signinData.password,
      });
      alert(response.data.msg);
      if (response.data.msg === "Signin successful") {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // Set loading state to false after receiving the response
    }
  };

  return (
    <>
      {loading ? ( // Conditionally render the Loading component or the form
        <Loading /> // Render the Loading component when loading is true
      ) : (
        <div className="flex flex-col sm:flex-row justify-center items-center min-h-screen">
          <div className="sm:mr-8">
            <div className="w-96 h-96">
              <Lottie animationData={signinAnimation} />
            </div>
          </div>
          <div className="border bg-white p-8 rounded-xl shadow-xl text-center">
            <Heading text={"Sign In"} />
            <SubHeading text={"Sign in to your account"} />
            <InputBox
              type="email"
              label="Email"
              placeholder="john123@gmail.com"
              onChange={(e) => {
                setSigninData({ ...signinData, email: e.target.value });
              }}
            />
            <InputBox
              type="password"
              label="Password"
              placeholder="password"
              onChange={(e) => {
                setSigninData({ ...signinData, password: e.target.value });
              }}
            />
            <div className="flex justify-end">
              <TextLink text={"Forgot password?"} linkTo={"/forgotpassword"} />
            </div>
            <Button text="Submit" onClick={handleSubmit} />
            <div className="flex justify-end">
              <TextLink text={"Don't have an account?"} linkTo={"/signup"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
