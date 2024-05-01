import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { ForgotPasswordInput } from "@abhiram2k03/input-validation";

export const ForgotPassword = () => {
  const [forgotPasswordData, setForgotPasswordData] = useState<ForgotPasswordInput>({
    email: ""
  })

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/forgotpassword`, { 
        email: forgotPasswordData.email
      });
      alert(response.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
      <div className="border bg-white p-8 rounded-xl shadow-xl text-center">
        <Heading text={"Forgot Password"} />
        
        <InputBox
          type="email"
          label="Email"
          placeholder="enter registered email"
          onChange={(e) => {
            setForgotPasswordData({
              ...forgotPasswordData,
              email: e.target.value
            })
          }}
        />

        <Button text="Submit" onClick={handleSubmit} />
        
      </div>
    </div>
    </>
  );
};