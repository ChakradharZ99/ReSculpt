import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { TextLink } from "../components/TextLink";
import { useState } from "react";
import axios from "axios";
import { SignupInput } from "@abhiram2k03/input-validation";
import Lottie from "lottie-react";
import signupAnimation from "../assets/signup.json";
import { Loading } from "../components/Loading";

export const Signup = () => {
  const [signupData, setSignupData] = useState<SignupInput>({
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true before making the API request

    try {
      console.log(signupData);
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        cPassword: signupData.cPassword,
      });
      
      // toast(response.data.msg);
      if (response.data.msg === "User created Successfully") {
        alert(response.data.msg)
        // toast.success(response.data.msg, {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: Slide,
        //   });
        //   await new Promise((resolve) => setTimeout(resolve, 2000));
        // console.log(response.data.msg)
        navigate("/");
      }
      alert(response.data.msg)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // Set loading state to false after receiving the response
    
    }
  };

  return (
    <>
      {loading ? ( // Conditionally render the Loading component or the form
      <>
        <Loading />
      </>
      ) : (
        <>
        <div className="flex justify-center items-center min-h-screen">
        {/* <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        /> */}
          <div className="flex justify-center items-center">
            <div className="w-96 h-96">
              <Lottie animationData={signupAnimation} />
            </div>
          </div>
          <div className="mx-16 border bg-white p-8 rounded-xl shadow-xl text-center">
            <Heading text={"Signup"} />
            <SubHeading text={"Enter your details to create an account"} />
            <InputBox
              type="text"
              label="Username"
              placeholder="John"
              onChange={(e) => {
                setSignupData({ ...signupData, username: e.target.value });
              }}
            />
            <InputBox
              type="email"
              label="Email"
              placeholder="john123@gmail.com"
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
              }}
            />
            <InputBox
              type="password"
              label="Password"
              placeholder="password"
              onChange={(e) => {
                setSignupData({ ...signupData, password: e.target.value });
              }}
            />
            <InputBox
              type="password"
              label="Confirm Password"
              placeholder="re-enter same password"
              onChange={(e) => {
                setSignupData({ ...signupData, cPassword: e.target.value });
              }}
            />
            <Button text="Submit" onClick={handleSubmit} />
            <div className="flex justify-end">
              <TextLink text="Already have an account?" linkTo="/signin" />
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};